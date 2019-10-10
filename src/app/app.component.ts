import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
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
  isLoading: boolean = true;
  darkModeActive: boolean;
  sub1;

  // styling
  color = 'accent';

  public constructor(
    public ui: UiService
  ) {
    setTimeout(() => {
      this.isLoading = false;
    }, 0);
  }

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }
}
