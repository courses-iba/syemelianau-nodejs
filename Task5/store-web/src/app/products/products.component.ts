import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';

import { ProductService } from '../shared/services/product.service';
import { displayedProduct } from '../shared/models/displayedProduct.model';
import { ProductsResponse } from '../shared/models/productsResponse.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    private snackBarConfig: any = {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
    };

    products?: Array<displayedProduct>;
    count?: number;
    pageSizeOptions: Array<number>;
    loaded: boolean;
    error: any;

    constructor(
        private productService: ProductService,
        private snackBar: MatSnackBar,
        private storage: SessionStorageService
    ) {
        this.pageSizeOptions = [1, 2, 5, 10];
        this.loaded = false;
    }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts(event?: PageEvent): void {
        const { from, to } = event
            ? { from: event.pageIndex * event.pageSize, to: event.pageSize }
            : { from: 0, to: this.pageSizeOptions[2] };
        this.productService.getProductsFromTo(from, to)
            .pipe(catchError(error => {
                this.error = error;
                return of(error);
            }))
            .subscribe((res: ProductsResponse) => {
                this.products = new Array<displayedProduct>();
                res.products.forEach(product => this.products!.push({ ...product, count: 1 }));
                this.count = res.count;
                this.loaded = true;
            });
    }

    add(product: displayedProduct): void {
        const count = product.count;
        const lastProductCount = this.storage.retrieve(product._id!);
        lastProductCount
            ? this.storage.store(product._id!, lastProductCount + product.count)
            : this.storage.store(product._id!, product.count);
        product.count = 1;

        this.snackBar.open(
            `${count} ${product.name} added to basket`,
            'Cancel',
            this.snackBarConfig
        ).onAction().subscribe(() => {
            lastProductCount
                ? this.storage.store(product._id!, lastProductCount)
                : this.storage.clear(product._id!);
            product.count = count;
        });
    }
}
