import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';

import { ProductService } from '../shared/services/product.service';
import { OrderService } from '../shared/services/order.service';
import { ProductView } from '../shared/models/view.model';
import { Product } from '../shared/models/product.model';
import { Order } from '../shared/models/order.model';
import { OrderedProduct } from '../shared/models/orderedProduct.model';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
    products: Array<ProductView>;
    displayProducts?: Array<ProductView>;
    removedProduct?: ProductView;
    pageEvent?: PageEvent;
    total: number;
    pageSizeOptions: Array<number>;
    loaded: boolean;
    error: any;
    orderError: any;

    constructor(
        private sharedService: SharedService,
        private productService: ProductService,
        private orderService: OrderService,
        private snackBar: MatSnackBar,
        private storage: SessionStorageService
    ) {
        this.products = new Array<ProductView>();
        this.total = 0;
        this.pageSizeOptions = [1, 2, 5, 10];
        this.loaded = false;
    }

    ngOnInit() {
        this.getProducts();
    }

    getProducts(): void {
        const ids = Object.keys(sessionStorage).map(key => key.replace(this.sharedService.sessionKeyPrefix, ''));
        this.productService.getProductsByIds(ids)
            .pipe(catchError(error => {
                this.error = error;
                return of(new Array<Product>());
            }))
            .subscribe(products => {
                if (!this.error) {
                    this.calculate(products);
                    this.countTotal();
                    this.setPage();
                    this.products.map(product => this.observeProduct(product));
                }
                this.loaded = true;
            });
    }

    private calculate(products: Product[]): void {
        this.products = Object.entries(sessionStorage).reduce((array, [id, count]) => {
            const product = products.find(({ _id }) => _id === id.replace(this.sharedService.sessionKeyPrefix, ''));
            array.push({ ...product!, count: +count });
            return array;
        }, new Array<ProductView>());
    }

    private countTotal(): void {
        this.total = +this.products.reduce(
            (sum, product) => sum + product.cost * product.count, 0
        ).toFixed(2);
    }

    private observeProduct(product: ProductView): void {
        this.storage.observe(product._id!).subscribe(count => {
            if (count) {
                product.count = +count;
            } else {
                this.removedProduct = this.products
                    .splice(this.products.findIndex(
                        ({ _id }) => _id === product._id), 1
                    ).pop();
                this.setPage();
            }
            this.countTotal();
        });
    }

    setPage(event?: PageEvent): void {
        if (event) {
            this.pageEvent = event;
        }
        const { from, to } = this.pageEvent
            ? { from: this.pageEvent.pageIndex * this.pageEvent.pageSize, to: this.pageEvent.pageSize }
            : { from: 0, to: this.pageSizeOptions[2] };
        this.displayProducts = this.products.slice(from, from + to);
    }

    decrease(product: ProductView): void {
        if (product.count > 1) {
            this.storage.store(product._id!, --product.count);

            this.snackBar.open(
                `${product.name} decreased`,
                'Cancel',
                this.sharedService.snackBarConfig
            ).onAction().subscribe(() => this.storage.store(product._id!, ++product.count));
        } else {
            this.remove(product);
        }
    }

    remove(product: ProductView): void {
        this.storage.clear(product._id);

        this.snackBar.open(
            `${product.name} removed`,
            'Cancel',
            this.sharedService.snackBarConfig
        ).onAction().subscribe(() => {
            this.products.push(this.removedProduct!);
            this.storage.store(this.removedProduct!._id!, this.removedProduct!.count);
            this.setPage();
        });
    }

    clear(): void {
        if (this.products.length) {
            const products: Array<ProductView> = [...this.products];
            this.storage.clear();

            this.snackBar.open(
                'Basket cleared',
                'Cancel',
                this.sharedService.snackBarConfig
            ).onAction().subscribe(() => {
                this.products = [...products];
                this.products.map(product => this.storage.store(product._id!, product.count));
                this.setPage();
            });
        } else {
            this.snackBar.open('Basket is empty, nothing to clear!', 'Ok', this.sharedService.snackBarConfig);
        }
    }

    order(): void {
        if (this.products.length) {
            const products: Array<OrderedProduct> = Object.entries(sessionStorage).reduce((array, [id, count]) => {
                const productId = id.replace(this.sharedService.sessionKeyPrefix, '');
                array.push({ productId, count: +count });
                return array;
            }, new Array<OrderedProduct>());
            const order: Order = { products, total: this.total };

            this.orderService.createOrder(order)
                .pipe(catchError(error => {
                    this.orderError = error;
                    this.snackBar.open('Sorry, something went wrong, try again', 'Ok', this.sharedService.snackBarConfig);
                    return of();
                }))
                .subscribe(() => {
                    if (this.orderError) {
                        this.orderError = null;
                    } else {
                        this.snackBar.open('Order successfully submitted!', 'Ok', this.sharedService.snackBarConfig);
                        this.storage.clear();
                    }
                });
        } else {
            this.snackBar.open('Basket is empty, nothing to order!', 'Ok', this.sharedService.snackBarConfig);
        }
    }
}
