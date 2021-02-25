import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { User } from '../models/user.model';
import { CreateUserDto } from '../models/userDto.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private path = environment.apiUrl;

    constructor(private http: HttpClient) {}

    login(userData: CreateUserDto): Observable<User> {
        return this.http.post<User>(`${this.path}/login`, userData, { withCredentials: true });
    }

    registration(userData: CreateUserDto): Observable<User> {
        return this.http.post<User>(`${this.path}/signup`, userData);
    }

    logout(user: User): Observable<User> {
        return this.http.post<User>(`${this.path}/logout`, user, { withCredentials: true });
    }

    getUserByEmail(email: string): Observable<User> {
        return this.http.get<User>(`${this.path}/users/email/${email}`);
    }
}
