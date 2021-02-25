import { AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderService } from '../../services/order.service';
import { OrderView } from '../../models/view.model';
import { OrderedProductView } from '../../models/view.model';
import { ConfirmComponent } from '../confirm/confirm.component';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
    selector: 'app-order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            state('collapsed, void', style({ height: '0px' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class OrderTableComponent implements OnInit, AfterViewInit {
    @Input() order!: OrderView;
    @Input() admin!: boolean;
    @Output() close = new EventEmitter<void>();
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    dataSource!: MatTableDataSource<OrderedProductView>;
    displayedColumns: Array<string>;
    pageSizeOptions: Array<number>;
    expandedElement!: OrderedProductView | null;
    error: any;

    constructor(
        private sharedService: SharedService,
        private orderService: OrderService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        this.displayedColumns = ['name', 'count', 'cost', 'total'];
        this.pageSizeOptions = [1, 2, 5, 10];
    }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.order.products);
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    deleteOrder(orderId: string): void {
        this.dialog.open(ConfirmComponent).afterClosed().subscribe(confirm => {
            if (confirm) {
                this.orderService.deleteOrder(orderId)
                    .pipe(catchError(error => {
                        this.error = error;
                        return of();
                    }))
                    .subscribe(() => {
                        if (this.error) {
                            this.snackBar.open('Something went wrong, please try again!', 'Ok', this.sharedService.snackBarConfig);
                        } else {
                            this.snackBar.open('Successfully closed!', 'Ok', this.sharedService.snackBarConfig);
                            this.close.emit();
                        }
                    });
            }
        });
    }
}
