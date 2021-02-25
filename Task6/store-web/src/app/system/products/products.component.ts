import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProductService } from '../shared/services/product.service';
import { ProductView } from '../shared/models/view.model';
import { SharedService } from '../../shared/services/shared.service';
import { ProductsResponse } from '../shared/models/productsResponse.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
    products!: Array<ProductView>;
    pageSizeOptions: Array<number>;
    count!: number;
    loaded!: boolean;
    error: any;

    constructor(private productService: ProductService, private sharedService: SharedService) {
        sharedService.productChangeEmitted$.subscribe(() => this.ngOnInit());
        this.pageSizeOptions = [1, 2, 5, 10];
    }

    ngOnInit(): void {
        this.loaded = false;
        this.getProducts();
    }

    getProducts(event?: PageEvent): void {
        const { from, to } = event
            ? { from: event.pageIndex * event.pageSize, to: event.pageSize }
            : { from: 0, to: this.pageSizeOptions[1] };
        this.productService.getProductsFromTo(from, to)
            .pipe(catchError(error => {
                this.error = error;
                return of(error);
            }))
            .subscribe((res: ProductsResponse) => {
                this.products = new Array<ProductView>();
                res.products.forEach(product => this.products!.push({ ...product, count: 1 }));
                this.count = res.count;
                this.loaded = true;
            });
    }
}
