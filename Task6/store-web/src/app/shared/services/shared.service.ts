import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    public sessionKeyPrefix = 'ngx-webstorage|';
    public snackBarConfig: any = {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
    };

    private authChange = new Subject<any>();
    private productChange = new Subject<any>();

    authChangeEmitted$: Observable<any>;
    productChangeEmitted$: Observable<any>;

    constructor() {
        this.authChangeEmitted$ = this.authChange.asObservable();
        this.productChangeEmitted$ = this.productChange.asObservable();
    }

    emitAuthChange(): void {
        this.authChange.next();
    }

    emitProductChange(): void {
        this.productChange.next();
    }
}
