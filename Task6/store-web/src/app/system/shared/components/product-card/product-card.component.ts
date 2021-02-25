import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';

import { SharedService } from '../../../../shared/services/shared.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { ProductService } from '../../services/product.service';
import { ProductView } from '../../models/view.model';
import { User } from '../../../../shared/models/user.model';
import { EditorComponent } from '../editor/editor.component';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {
    @Input() product!: ProductView;

    user?: User;
    position: FormControl;
    error: any;

    constructor(
        private authService: AuthService,
        private sharedService: SharedService,
        private productService: ProductService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private storage: SessionStorageService
    ) {
        this.position = new FormControl('right');
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.user = this.authService.getLoggedUser();
        }
    }

    add(product: ProductView): void {
        const count = product.count;
        const lastProductCount = this.storage.retrieve(product._id!);
        lastProductCount
            ? this.storage.store(product._id!, lastProductCount + product.count)
            : this.storage.store(product._id!, product.count);
        product.count = 1;

        this.snackBar.open(
            `${product.count} ${product.name} added to basket`,
            'Cancel',
            this.sharedService.snackBarConfig
        ).onAction().subscribe(() => {
            lastProductCount
                ? this.storage.store(product._id!, lastProductCount)
                : this.storage.clear(product._id!);
            product.count = count;
        });
    }

    deleteProduct(product: ProductView): void {
        this.dialog.open(ConfirmComponent).afterClosed().subscribe(confirm => {
            if (confirm) {
                this.productService.deleteProduct(product._id!)
                    .pipe(catchError(error => {
                        this.error = error;
                        this.snackBar.open('Product are in use or does not exist', 'Ok', this.sharedService.snackBarConfig);
                        return of();
                    }))
                    .subscribe(() => {
                        if (!this.error) {
                            this.sharedService.emitProductChange();
                            this.snackBar.open('Successfully deleted', 'Ok', this.sharedService.snackBarConfig);
                        }
                        this.error = null;
                    });
            }
        });
    }

    updateProduct(product: ProductView): void {
        this.dialog.open(EditorComponent, { data: product }).afterClosed().subscribe(
            cancel => !cancel ? this.sharedService.emitProductChange() : null
        );
    }
}
