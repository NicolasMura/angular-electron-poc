import { Component, OnInit } from '@angular/core';
import { UiService } from './services/ui/ui.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { IdleService } from './services/idle/idle.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-electron-poc';
  isHeaderVisible = false;
  darkModeActive: boolean;
  sub1;

  // styling
  color = 'accent';

  public constructor(
    private router: Router,
    public ui: UiService,
    private idle: IdleService,
    private logger: NGXLogger
  ) {
    // on récupère l'URL courante pour savoir si le menu doit être affiché et si le timeout d'inactivité doit être relancé
    this.router.events.subscribe((event: Event) => {
      // console.log(event);
      if (event instanceof NavigationEnd) {
        this.logger.debug(router.url);
        if (router.url === '/screen-saver') {
          this.isHeaderVisible = false;
        } else {
          this.isHeaderVisible = true;
          this.idle.watch();
        }
      }
    });
  }

  ngOnInit() {
    // récupération du thème
    this.sub1 = this.ui.darkModeState$.subscribe((value) => {
      this.darkModeActive = value;
    });
  }

  modeToggleSwitch() {
    this.ui.darkModeState$.next(!this.darkModeActive);
  }

}
