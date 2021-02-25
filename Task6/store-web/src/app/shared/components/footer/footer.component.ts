import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    position: FormControl;

    constructor() {
        this.position = new FormControl('above');
    }
}
