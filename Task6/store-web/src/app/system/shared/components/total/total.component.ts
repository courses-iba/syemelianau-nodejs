import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AuthService } from '../../../../shared/services/auth.service';

@Component({
    selector: 'app-total',
    templateUrl: './total.component.html'
})
export class TotalComponent {
    @Input() total!: number;
    @Output() clear: EventEmitter<void>;
    @Output() order: EventEmitter<void>;

    constructor(private authService: AuthService) {
        this.clear = new EventEmitter<void>();
        this.order = new EventEmitter<void>();
    }

    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }
}
