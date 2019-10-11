
import { Injectable } from '@angular/core';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';

import { Router } from '@angular/router';

const dueTimeout = 10;

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  public idle: Idle;

  handlers: (() => void)[] = [];
​
  constructor(
    idle: Idle,
    private router: Router
  ) {
​
    this.idle = idle;
​
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setIdle(dueTimeout);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
​
    this.idle.onIdleStart.subscribe(() => {
      console.log('Idle Start.');
    });

    this.idle.onTimeoutWarning.subscribe((countdown: any) => {
      console.log('You will time out in ' + countdown + ' seconds!');
    });

    this.idle.onTimeout.subscribe(() => {
      console.log('Timed out!');
      this.router.navigateByUrl('/screen-saver');
      this.watch();
    });

    this.watch();
  }

  registerResumeHandler(handler: () => void) {
    this.handlers.push(handler);
  }

  removeResumeHandler(handler: () => void) {
    this.handlers = this.handlers.filter(h => h !== handler);
  }
​
  setIdle(seconds: number) {
    this.idle.setIdle(seconds);
    this.idle.stop();
    this.idle.watch();
  }
​
  stop() {
    this.idle.stop();
  }
​
  watch() {
    this.stop();
    this.idle.setIdle(dueTimeout);
    this.idle.watch();
  }
}
