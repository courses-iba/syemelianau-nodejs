import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from '../shared/services/user.service';
import { OrderService } from '../shared/services/order.service';
import { ConfirmComponent } from '../shared/components/confirm/confirm.component';
import { User } from '../../shared/models/user.model';
import { OrderView, UserOrdersView } from '../shared/models/view.model';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    users!: Array<UserOrdersView>;
    loaded: boolean;
    error: any;
    expandedUserId: string;
    allExpanded: boolean;

    @ViewChild(MatAccordion) accordion!: MatAccordion;

    constructor(
        private sharedService: SharedService,
        private userService: UserService,
        private orderService: OrderService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        this.loaded = false;
        this.expandedUserId = '';
        this.allExpanded = false;
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers()
            .pipe(catchError(error => {
                this.error = error;
                return of();
            }))
            .subscribe((users: Array<User> | any) => {
                if (!this.error) {
                    this.users = users;
                }
                this.loaded = true;
            });
    }

    getUserOrders(userId: string): void {
        this.expandedUserId = userId;
        this.orderService.getOrdersByUserId(userId)
            .pipe(catchError(() => {
                this.snackBar.open('Failed to load user orders', 'Ok', this.sharedService.snackBarConfig);
                return of();
            }))
            .subscribe((orders: Array<OrderView> | any) => {
                this.users.find(({ _id }) => _id === userId)!.orders = orders;
            });
    }

    setUndefined(userId: string): void {
        this.users.find(({ _id }) => _id === userId)!.orders = undefined;
    }

    refreshUserOrders(userId: string): void {
        this.setUndefined(userId);
        this.getUserOrders(userId);
    }

    deleteUser(userId: string): void {
        this.dialog.open(ConfirmComponent).afterClosed().subscribe(confirm => {
            if (confirm) {
                this.userService.deleteUser(userId)
                    .pipe(catchError(error => {
                        error.status === 403
                            ? this.snackBar.open('Permission denied', 'Ok', this.sharedService.snackBarConfig)
                            : this.error = error;
                        return of(error);
                    }))
                    .subscribe(error => {
                        if (!error.status) {
                            this.loaded = false;
                            this.getUsers();
                            this.snackBar.open('Successfully deleted!', 'Ok', this.sharedService.snackBarConfig);
                        }
                    });
            }
        });
    }

    prevStep(userId: string): void {
        if (this.isPrev()) {
            const currentIndex = this.users.findIndex(({ _id }) => _id === userId);
            this.expandedUserId = this.users[currentIndex - 1]._id!;
        }
    }

    nextStep(userId: string): void {
        if (this.isNext()) {
            const currentIndex = this.users.findIndex(({ _id }) => _id === userId);
            this.expandedUserId = this.users[currentIndex + 1]._id!;
        }
    }

    isPrev = (): boolean => this.expandedUserId !== this.users[0]._id && !this.allExpanded;
    isNext = (): boolean => this.expandedUserId !== this.users[this.users.length - 1]._id && !this.allExpanded;

    openAll(): void {
        this.allExpanded = true;
        this.accordion.openAll();
    }

    closeAll(): void {
        this.allExpanded = false;
        this.accordion.closeAll();
    }
}
