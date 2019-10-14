import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { fadeAnimation } from 'src/app/shared/animations/fade-in-out';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-screen-saver',
  templateUrl: './screen-saver.component.html',
  styleUrls: ['./screen-saver.component.scss'],
  animations: [
    // fadeAnimation
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
export class ScreenSaverComponent implements OnInit {
  isAppLoading = true;
  isAppLoaded = false;
  sub1;

  public constructor(
    private router: Router,
    public ui: UiService
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
      // console.log('ngOnInit - ScreenSaverComponent : isAppLoaded$ = ');
      // console.log(value);
      this.isAppLoaded = value;
    });
  }

  goToHome() {
    this.router.navigateByUrl('home');
  }

}
