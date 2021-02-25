import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../shared/services/auth.service';
import { CreateUserDto } from '../../shared/models/userDto.model';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    hidePassword: boolean;

    constructor(
        private authService: AuthService,
        private sharedService: SharedService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });
        this.hidePassword = true;
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/products']).then();
        }
        this.route.queryParamMap.subscribe(params => {
            if (params.get('canLogin')) {
                this.snackBar.open(params.get('message') as string, 'Ok', this.sharedService.snackBarConfig);
            }
        });
    }

    onSubmit(): void {
        const userData: CreateUserDto = {
            email: this.loginForm.controls.email.value,
            password: this.loginForm.controls.password.value
        };
        this.authService.login(userData, (message: string) => {
            if (message) {
                this.snackBar.open(message, 'Ok', this.sharedService.snackBarConfig);
            } else {
                this.sharedService.emitAuthChange();
                this.router.navigate(['/products']).then();

            }
        });
    }

    isValidEmail = (): boolean => this.loginForm.controls.email.invalid && this.loginForm.controls.email.touched;
    isValidPassword = (): boolean => this.loginForm.controls.password.invalid && this.loginForm.controls.password.touched;

    emailErrorMessages = (): string => this.loginForm.controls.email.hasError('email')
        ? 'Please enter a valid email'
        : this.loginForm.controls.email.hasError('required')
            ? 'Email can`t be empty'
            : '';

    passwordErrorMessages = (): string => this.loginForm.controls.password.hasError('minlength')
        ? `Password must be more than 6 characters. Now ${this.loginForm.controls.password.value.length}`
        : this.loginForm.controls.password.hasError('required')
            ? 'Password can`t be empty'
            : '';
}
