import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  darkModeState$: BehaviorSubject<boolean>;
  isAppLoaded$: BehaviorSubject<boolean>;

  constructor() {
    // TODO: get the default value from local storage
    this.darkModeState$ = new BehaviorSubject<boolean>(false);

    this.isAppLoaded$ = new BehaviorSubject<boolean>(false);
  }
}
