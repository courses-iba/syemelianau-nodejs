import { Component } from '@angular/core';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html'
})
export class SystemComponent {
    paths: Array<{ label: string, value: string }>;

    constructor() {
        this.paths = [{
            label: 'Products',
            value: '/products'
        }, {
            label: 'Basket',
            value: '/basket'
        }];
    }
}
