import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { HttpClientModule } from '@angular/common/http';
import { DialogTimeoutComponent } from './services/idle/idle.service';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DialogTimeoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatButtonModule,
    NgIdleKeepaliveModule.forRoot()

  ],
  entryComponents: [DialogTimeoutComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
