import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

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
export class AppComponent {
  title = 'angular-electron-poc';
  isLoading: boolean = true;

  public constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
