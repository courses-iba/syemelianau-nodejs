import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string;
    position: FormControl;
    navLinks: any[];

    constructor() {
        this.title = 'Store';
        this.position = new FormControl('above');
        this.navLinks = [
            {
                label: 'Products',
                link: '/products',
                index: 0
            }, {
                label: 'Basket',
                link: '/basket',
                index: 1
            }
        ];
    }
}
