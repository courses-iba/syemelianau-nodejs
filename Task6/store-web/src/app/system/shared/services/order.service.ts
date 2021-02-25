import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Order } from '../models/order.model';
import { OrderView } from '../models/view.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private path = `${environment.apiUrl}/orders`;

    constructor(private http: HttpClient) {}

    getOrdersByUserId(userId: string): Observable<Array<OrderView>> {
        return this.http.get<Array<OrderView>>(`${this.path}/user/${userId}`, { withCredentials: true });
    }

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.path}`, order, { withCredentials: true });
    }

    deleteOrder(orderId: string): Observable<Order> {
        return this.http.delete<Order>(`${this.path}/${orderId}`, { withCredentials: true });
    }
}
