import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

export function AsyncEmailValidator(usersService: UsersService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return usersService.getUserByEmail(control.value).pipe(map((user: User) => {
            return user ? { taken: true } : null;
        }));
    };
}
