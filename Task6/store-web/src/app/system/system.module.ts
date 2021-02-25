import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { ProductsComponent } from './products/products.component';
import { BasketComponent } from './basket/basket.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { BasketCardComponent } from './shared/components/basket-card/basket-card.component';
import { TotalComponent } from './shared/components/total/total.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderTableComponent } from './shared/components/order-table/order-table.component';
import { ConfirmComponent } from './shared/components/confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditorComponent } from './shared/components/editor/editor.component';

@NgModule({
    declarations: [
        SystemComponent,
        ProductsComponent,
        BasketComponent,
        ProductCardComponent,
        BasketCardComponent,
        TotalComponent,
        UserComponent,
        AdminComponent,
        OrderTableComponent,
        ConfirmComponent,
        EditorComponent
    ],
    exports: [SystemComponent],
    imports: [
        CommonModule,
        SystemRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxWebstorageModule.forRoot(),
        MatTabsModule,
        MatDividerModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatSnackBarModule,
        MatBadgeModule,
        MatSliderModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatTableModule,
        MatSortModule,
        MatInputModule,
        MatDialogModule,
        MatTooltipModule
    ]
})
export class SystemModule {}
