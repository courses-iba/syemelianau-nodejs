import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ProductView } from '../../models/view.model';

@Component({
    selector: 'app-basket-card',
    templateUrl: './basket-card.component.html'
})
export class BasketCardComponent {
    @Input() product!: ProductView;
    @Output() decrease: EventEmitter<ProductView>;
    @Output() remove: EventEmitter<ProductView>;

    constructor() {
        this.decrease = new EventEmitter<ProductView>();
        this.remove = new EventEmitter<ProductView>();
    }
}
