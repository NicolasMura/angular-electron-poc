import { Component, Input } from '@angular/core';
import { MatSnackBarRef } from '@angular/material';

/** Component opened inside a snackbar. */
@Component({
  selector: 'app-custom-snackbar',
  template: `
    <div *ngFor="let customErrorMessage of customErrorsMessages; let last=last">
      <div class="width" [ngClass]="{'marginBottom': !last}">{{ customErrorMessage }}</div>
    </div>
    <button mat-raised-button class="btn" (click)="snackBarRef.dismiss()">
      OK
    </button>
  `,
  styles: ['.width {width: 80%;} .marginBottom {margin-bottom: 10px;} .btn {position: absolute; right: 10px; bottom: 10px;}']
})
export class CustomSnackbarComponent {

  @Input() customErrorsMessages: any[];

  constructor(public snackBarRef: MatSnackBarRef<CustomSnackbarComponent>) {}
}
