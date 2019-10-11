import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { UiService } from './services/ui/ui.service';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './shared/animations/route-animation';
import { Keepalive } from '@ng-idle/keepalive';
import { IdleService } from './services/idle/idle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // fadeAnimation,
    slideInAnimation,
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter', // when a DOM element is being added
          [
            style({ opacity: 0 }),
            animate('1s ease-out',
            style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', // when a DOM element is being removed
          [
            style({ opacity: 1 }),
            animate('1s ease-in',
            style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AppComponent implements OnInit {
  title = 'angular-electron-poc';
  isHeaderVisible = false;
  darkModeActive: boolean;
  sub1;

  // styling
  color = 'accent';

  // idle
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  public constructor(
    private router: Router,
    public ui: UiService,
    private idle: IdleService,
    private keepalive: Keepalive
  ) {
    // on récupère l'URL courante pour savoir si peut afficher le menu
    router.events.subscribe((event: Event) => {
      // console.log(event);
      if (event instanceof NavigationEnd) {
        console.log(router.url);
        this.isHeaderVisible =  router.url === '/screen-saver' ? false : true;
      }
    });
  }

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  // }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
