import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Order } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private path = `${environment.apiUrl}/orders`;

    constructor(private http: HttpClient) {}

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.path}`, order);
    }
}
