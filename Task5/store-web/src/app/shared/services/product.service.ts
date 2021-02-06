import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

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

    getProductsByIds(ids: Array<string>): Observable<Array<Product>> {
        return this.http.post<Array<Product>>(`${this.path}/find`, ids);
    }
}
