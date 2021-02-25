import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { SystemModule } from './system/system.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LogoComponent } from './shared/components/logo/logo.component';
import { MenuComponent } from './shared/components/menu/menu.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LogoComponent,
        MenuComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        AuthModule,
        SystemModule,
        NgxWebstorageModule.forRoot(),
        MatToolbarModule,
        MatDividerModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
