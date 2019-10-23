import { Injectable, Component, Inject, Input } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

/**
 * Interface définissant le décompte en secondes de la période d'avertissement au bout de laquelle l'utilisateur est considéré comme inactif
 */
export interface DialogData {
  countdown: number;
}

/**
 * Durée d'inactivité (idle timeout) de x seconds
 */
const dueIdle = 120;
/**
 * Durée d'avertissement (timeout period) de y seconds. Après cette durée, l'utilisateur est considéré comme inactif
 */
const dueTimeout = 10;

/**
 * Composant gérant l'affichage de la modale d'avertissement avant redirection à l'accueil
 */
@Component({
  selector: 'app-dialog-timeout',
  templateUrl: 'dialog-timeout.html'
})
export class DialogTimeoutComponent {
  /**
   * Décompte en secondes de la période d'avertissement au bout de laquelle l'utilisateur est considéré comme inactif
   */
  public countdown: number;

  constructor(
    public dialogRef: MatDialogRef<DialogTimeoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

}

/**
 * Service de gestion de l'inactivité de l'utilisateur
 *
 * Sur toutes les pages exceptées la page screen-saver (cf. {@link AppComponent}), un timer compte dueIdle secondes d'inactivité avant
 * d'enclencher un décompte au bout duquel l'utilisateur est considéré comme inactif est redirigé vers l'accueil
 */
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
    private logger: NGXLogger
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
      // this.logger.debug('Idle Start.');
    });

    this.idle.onIdleEnd.subscribe(() => {
      // this.logger.debug('onIdleEnd :');
    });

    this.idle.onTimeoutWarning.subscribe((countdown: number) => {
      this.logger.debug('You will time out in ' + countdown + ' seconds!');
      this.countdown$.next(countdown);
      if (countdown === dueTimeout) {
        this.idle.clearInterrupts();
        this.openDialog(dueTimeout);
      } else {
        this.dialogRef.componentInstance.data = {countdown};
      }
    });

    this.idle.onTimeout.subscribe(() => {
      this.logger.debug('Timed out!');
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
    // this.logger.debug('Idle watch()');
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
      // this.logger.debug('The dialog was closed, reason : ');
      // this.logger.debug(reason);
      // on ne relance le watcher que si on reste sur la page (= action utilisateur)
      if (reason !== 'timeout') {
        this.watch();
      }
    });
  }
}

