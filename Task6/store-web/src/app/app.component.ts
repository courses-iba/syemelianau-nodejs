import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/services/auth.service';
import { SharedService } from './shared/services/shared.service';
import { User } from './shared/models/user.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    user?: User;

    setUser = () => this.authService.isLoggedIn()
        ? this.user = this.authService.getLoggedUser()
        : this.user = undefined;

    constructor(private authService: AuthService, private sharedService: SharedService) {
        sharedService.authChangeEmitted$.subscribe(this.setUser);
    }

    ngOnInit(): void {
        this.setUser();
    }
}
