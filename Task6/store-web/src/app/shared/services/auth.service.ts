import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

import { AsyncEmailValidator } from '../validators/async-email.validator';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
import { CreateUserDto } from '../models/userDto.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private message = '';

    constructor(private usersService: UsersService, private storage: LocalStorageService) {}

    private error = catchError(error => {
        this.message = 'Sorry, something went wrong, please try again';
        return of(error);
    });

    login(userData: CreateUserDto, callback: (message: string) => void): void {
        this.message = '';
        this.usersService.login(userData)
            .pipe(this.error)
            .subscribe((user: User | any) => {
                user && user.password
                    ? this.storage.store('user', user)
                    : this.message = 'This user does not exist';
                callback(this.message);
            });
    }

    registration(userData: CreateUserDto, callback: (message: string, ok: boolean) => void): void {
        this.message = '';
        this.usersService.registration(userData)
            .pipe(this.error)
            .subscribe((user: User | any) => {
                this.message = user && user.password ? 'Now you can log in' : 'Registration error';
                callback(this.message, !!user);
            });
    }

    logout(user: User, callback: (user: User) => void): void {
        this.usersService.logout(user)
            .pipe(this.error)
            .subscribe((user: User) => {
                this.storage.clear('user');
                callback(user);
            });
    }

    isLoggedIn(): boolean {
        return !!this.storage.retrieve('user');
    }

    isEmailTaken(): AsyncValidatorFn {
        return AsyncEmailValidator(this.usersService);
    }

    getLoggedUser(): User {
        return this.storage.retrieve('user');
    }
}
