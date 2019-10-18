import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { fadeInOutAnimation } from 'src/app/shared/animations/fade-in-out';
import { UiService } from 'src/app/services/ui/ui.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-screen-saver',
  templateUrl: './screen-saver.component.html',
  styleUrls: ['./screen-saver.component.scss'],
  animations: [fadeInOutAnimation]
})
export class ScreenSaverComponent implements OnInit {
  isAppLoading = true;
  isAppLoaded = false;
  sub1;

  public constructor(
    private router: Router,
    public ui: UiService,
    private logger: NGXLogger
  ) {
    if ( !this.ui.isAppLoaded$.getValue() ) {
      setTimeout(() => {
        this.isAppLoading = false;
        this.ui.isAppLoaded$.next(true);
      }, 1000);
    }
  }

  ngOnInit() {
    // on n'affiche qu'une seule fois le loader
    this.sub1 = this.ui.isAppLoaded$.subscribe((value) => {
      // this.logger.debug('ngOnInit - ScreenSaverComponent : isAppLoaded$ = ');
      // this.logger.debug(value);
      this.isAppLoaded = value;
    });
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

}
