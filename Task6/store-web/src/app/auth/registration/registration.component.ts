import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { CreateUserDto } from '../../shared/models/userDto.model';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    registrationForm: FormGroup;
    hidePassword: boolean;

    constructor(private authService: AuthService, private router: Router) {
        this.registrationForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email], this.authService.isEmailTaken()),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            agree: new FormControl('', [Validators.required, Validators.requiredTrue])
        });
        this.hidePassword = true;
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/products']).then();
        }
    }

    onSubmit(): void {
        const userData: CreateUserDto = {
            email: this.registrationForm.controls.email.value,
            password: this.registrationForm.controls.password.value
        };
        this.authService.registration(userData, (message, ok) =>
            this.router.navigate(['/login'], { queryParams: { message, canLogin: ok } })
        );
    }

    emailErrorMessages = (): string => this.registrationForm.controls.email.hasError('email')
        ? 'Please enter a valid email'
        : this.registrationForm.controls.email.hasError('required')
            ? 'Email can`t be empty'
            : this.registrationForm.controls.email.hasError('taken')
                ? 'Email already taken'
                : '';

    passwordErrorMessages = (): string => this.registrationForm.controls.password.hasError('minlength')
        ? `Password must be more than 6 characters. Now ${this.registrationForm.controls.password.value.length}`
        : this.registrationForm.controls.password.hasError('required')
            ? 'Password can`t be empty'
            : '';
}
