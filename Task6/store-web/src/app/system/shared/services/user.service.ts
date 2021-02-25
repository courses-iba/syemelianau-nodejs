import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { User } from '../../../shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private path = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) {}

    getUsers(): Observable<Array<User>> {
        return this.http.get<Array<User>>(`${this.path}`, { withCredentials: true });
    }

    deleteUser(userId: string): Observable<User> {
        return this.http.delete<User>(`${this.path}/${userId}`, { withCredentials: true });
    }
}
