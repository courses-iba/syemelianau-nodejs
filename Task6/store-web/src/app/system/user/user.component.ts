import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { OrderView } from '../shared/models/view.model';
import { User } from '../../shared/models/user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
    user!: User;
    orders!: Array<OrderView>;
    loaded: boolean;
    error: any;

    constructor(private authService: AuthService, private orderService: OrderService) {
        this.loaded = false;
    }

    ngOnInit(): void {
        this.user = this.authService.getLoggedUser();
        this.getOrders(this.user._id!);
    }

    getOrders(userId: string): void {
        this.orderService.getOrdersByUserId(userId)
            .pipe(catchError(error => {
                this.error = error;
                return of();
            }))
            .subscribe((orders: Array<OrderView> | any) => {
                if (!this.error) {
                    this.orders = orders;
                }
                this.loaded = true;
            });
    }
}
