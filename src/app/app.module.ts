import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule, MatDialogModule, MatButtonModule, MatSnackBarModule, MatSelectModule } from '@angular/material';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { HttpClientModule } from '@angular/common/http';
import { DialogTimeoutComponent } from './services/idle/idle.service';
import { CustomSnackbarComponent } from './shared/components/custom-snackbar/custom-snackbar.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DialogTimeoutComponent,
    CustomSnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    NgIdleKeepaliveModule.forRoot(),
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: environment.production ? NgxLoggerLevel.OFF : NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
  ],
  entryComponents: [DialogTimeoutComponent, CustomSnackbarComponent],
  providers: [
    {provide: ErrorHandler, useClass: ErrorHandlerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
