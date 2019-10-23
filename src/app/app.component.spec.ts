import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatSlideToggleModule, MatDialogModule } from '@angular/material';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NGXLogger, LoggerModule, NgxLoggerLevel, NGXLoggerHttpService } from 'ngx-logger';
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';
import { Idle } from '@ng-idle/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSlideToggleModule,
        MatDialogModule,
        NgIdleKeepaliveModule.forRoot(),
        LoggerModule.forRoot({
          serverLoggingUrl: '/api/logs',
          level: NgxLoggerLevel.DEBUG,
          serverLogLevel: NgxLoggerLevel.ERROR
        })
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        // Idle,
        NGXLogger,
        HttpClient,
        HttpHandler,
        HttpBackend
      ]
      // schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent<AppComponent>(AppComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }

  it('should create the app', () => {
    const { app } = setup();
    expect(app).toBeTruthy();
  });

  xit(`should have as title 'angular-electron-poc'`, () => {
    const { app } = setup();
    expect(app.title).toEqual('angular-electron-poc');
  });

  xit('should render title in a h1 tag', () => {
    const { app, fixture } = setup();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Poc Visagisme');
  });
});
