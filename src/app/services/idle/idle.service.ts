import { Injectable, Component, Inject, Input } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

export interface DialogData {
  countdown: number;
}

// sets an idle timeout of x seconds
const dueIdle = 120;
// sets a timeout period of y seconds. after y seconds of inactivity, the user will be considered timed out.
const dueTimeout = 10;

@Component({
  selector: 'app-dialog-timeout',
  templateUrl: 'dialog-timeout.html'
})
export class DialogTimeoutComponent {
  public countdown: number;

  constructor(
    public dialogRef: MatDialogRef<DialogTimeoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

  cancel(): void {
    this.dialogRef.close();
  }

}

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  public idle: Idle;
  public dialogRef: MatDialogRef<DialogTimeoutComponent>; // référence vers la modale
  public countdown$ = new BehaviorSubject<number>(dueTimeout);

  handlers: (() => void)[] = [];
​
  constructor(
    idle: Idle,
    public dialog: MatDialog,
    private router: Router,
  ) {
​
    this.idle = idle;
​
    this.idle.setIdle(dueIdle);
    this.idle.setTimeout(dueTimeout);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
​
    this.idle.onIdleStart.subscribe(() => {
      // console.log('Idle Start.');
    });

    this.idle.onIdleEnd.subscribe(() => {
      // console.log('onIdleEnd :');
    });

    this.idle.onTimeoutWarning.subscribe((countdown: number) => {
      console.log('You will time out in ' + countdown + ' seconds!');
      this.countdown$.next(countdown);
      if (countdown === dueTimeout) {
        this.idle.clearInterrupts();
        this.openDialog(dueTimeout);
      } else {
        this.dialogRef.componentInstance.data = {countdown};
      }
    });

    this.idle.onTimeout.subscribe(() => {
      console.log('Timed out!');
      this.dialogRef.close('timeout');
      this.router.navigateByUrl('/screen-saver');
    });
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
    // console.log('Idle watch()');
    this.stop();
    this.idle.setIdle(dueIdle);
    this.idle.watch();
  }

  openDialog(countdown: number): void {
    this.dialogRef = this.dialog.open(DialogTimeoutComponent, {
      width: '250px',
      data: {countdown}
    });

    this.dialogRef.afterClosed().subscribe((reason: string) => {
      // console.log('The dialog was closed, reason : ');
      // console.log(reason);
      // on ne relance le watcher que si on reste sur la page (= action utilisateur)
      if (reason !== 'timeout') {
        this.watch();
      }
    });
  }
}

