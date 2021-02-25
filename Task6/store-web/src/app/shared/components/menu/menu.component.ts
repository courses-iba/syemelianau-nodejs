import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';
import { EditorComponent } from '../../../system/shared/components/editor/editor.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent {
    @Input() user?: User;

    constructor(
        private authService: AuthService,
        private sharedService: SharedService,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    add(): void {
        this.dialog.open(EditorComponent).afterClosed().subscribe(
            cancel => !cancel ? this.sharedService.emitProductChange() : null
        );
    }

    logout(): void {
        this.authService.logout(this.user!, user => {
            this.sharedService.emitAuthChange();
            this.snackBar.open(`${user.email}, see you later!`, 'Bye', this.sharedService.snackBarConfig);
            this.router.navigate(['/login']).then();
        });
    }
}
