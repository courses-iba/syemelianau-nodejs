import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { SharedService } from '../../../../shared/services/shared.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent {
    productForm: FormGroup;
    error: any;

    constructor(
        private sharedService: SharedService,
        private productService: ProductService,
        private snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<EditorComponent>,
        @Inject(MAT_DIALOG_DATA) private product?: Product
    ) {
        this.productForm = new FormGroup({
            name: new FormControl(this.product ? this.product.name : '', [
                Validators.required,
                Validators.pattern(/[A-Z][a-z]+\b/),
                Validators.maxLength(10)
            ]),
            cost: new FormControl(this.product ? this.product.cost : '', [
                Validators.required,
                Validators.pattern(/^\d?(\.\d{1,2})?$/),
                Validators.min(0.01),
                Validators.max(9.99)
            ])
        });
    }

    isValidName = (): boolean => this.productForm.controls.name.invalid && this.productForm.controls.name.touched;
    isValidCost = (): boolean => this.productForm.controls.cost.invalid && this.productForm.controls.cost.touched;

    nameErrorMessages = (): string => this.productForm.controls.name.hasError('required')
        ? 'Name can`t be empty'
        : this.productForm.controls.name.hasError('pattern')
            ? 'Please enter a valid name'
            : !this.productForm.controls.name.hasError('maxLength')
                ? 'Too long name'
                : '';

    costErrorMessages = (): string => this.productForm.controls.cost.hasError('required')
        ? 'Cost can`t be empty'
        : this.productForm.controls.cost.hasError('pattern')
            ? 'Please enter a valid cost'
            : this.productForm.controls.cost.hasError('min')
                ? 'Minimum value is 0.01'
                : this.productForm.controls.cost.hasError('max')
                    ? 'Maximum value is 9.99'
                    : '';

    updateProduct(): void {
        const product: Product = {
            name: this.productForm.controls.name.value,
            cost: this.productForm.controls.cost.value,
            img: this.product!.img
        };
        this.productService.updateProduct(this.product!._id!, product)
            .pipe(catchError(error => {
                this.error = error;
                this.snackBar.open('Sorry, something went wrong', 'Ok', this.sharedService.snackBarConfig);
                return of();
            }))
            .subscribe((product: Product | any) => {
                if (!this.error) {
                    this.snackBar.open(`${product.name} successfully updated`, 'Ok', this.sharedService.snackBarConfig);
                    this.dialogRef.close();
                }
                this.error = null;
            });
    }

    createProduct(): void {
        const product: Product = {
            name: this.productForm.controls.name.value,
            cost: this.productForm.controls.cost.value,
            img: 'images/products/food.jpg'
        };
        this.productService.createProduct(product)
            .pipe(catchError(error => {
                this.error = error;
                this.snackBar.open('Sorry, something went wrong', 'Ok', this.sharedService.snackBarConfig);
                return of();
            }))
            .subscribe((product: Product | any) => {
                if (!this.error) {
                    this.snackBar.open(`${product.name} successfully created`, 'Ok', this.sharedService.snackBarConfig);
                    this.dialogRef.close();
                }
                this.error = null;
            });
    }

    onSubmit(): void {
        this.product ? this.updateProduct() : this.createProduct();
    }
}
