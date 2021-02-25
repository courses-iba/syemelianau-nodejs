import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemComponent } from './system.component';
import { ProductsComponent } from './products/products.component';
import { BasketComponent } from './basket/basket.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [{
    path: '', component: SystemComponent, children: [
        { path: 'products', component: ProductsComponent },
        { path: 'basket', component: BasketComponent },
        { path: 'user', component: UserComponent, pathMatch: 'full' },
        { path: 'admin', component: AdminComponent, pathMatch: 'full' },
        { path: '**', redirectTo: '/products', pathMatch: 'full' }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule {}
