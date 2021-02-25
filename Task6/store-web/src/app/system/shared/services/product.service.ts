import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private path = `${environment.apiUrl}/products`;

    constructor(private http: HttpClient) {}

    getProductsFromTo(from: number, to: number): Observable<Response> {
        return this.http.get<Response>(`${this.path}/${from}/${to}`);
    }

    getProductsByIds(ids: string[]): Observable<Array<Product>> {
        return this.http.post<Array<Product>>(`${this.path}/find`, ids);
    }

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.path}`, product, { withCredentials: true });
    }

    updateProduct(productId: string, product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.path}/${productId}`, product, { withCredentials: true });
    }

    deleteProduct(productId: string): Observable<Product> {
        return this.http.delete<Product>(`${this.path}/${productId}`, { withCredentials: true });
    }
}
