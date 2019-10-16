import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { CustomSnackbarComponent } from 'src/app/shared/components/custom-snackbar/custom-snackbar.component';

/**
 * Service de gestion des erreurs
 *
 * Service basique pour afficher les erreurs en frontend et les logguer (Voir un exemple d'utilisation sur {@link CaptureComponent})
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  /**
   * Référence locale au Snackbar qui affiche les erreurs
   */
  public snackBarRef: MatSnackBarRef<CustomSnackbarComponent>;

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Affiche une erreur en front
   *
   * @param {string} customErrorName Le nom de l'erreur
   * @param {string} customErrorMessage Le message de l'erreur
   * @param {any} timeout Un éventuel timeout en ms pour cacher l'erreur
   */
  public displayFrontError(customErrorName: string, customErrorMessage: string) {
    const message = customErrorName + ' : ' + customErrorMessage;
    // si une alerte est déjà instanciée, on la met à jour avec la nouvelle erreur
    if ( !this.snackBarRef ) {
      this.snackBarRef = this.snackBar.openFromComponent(CustomSnackbarComponent);
      this.snackBarRef.instance.customErrorsMessages = [message];
    } else {
      this.snackBarRef.instance.customErrorsMessages.push(message);
    }

    this.snackBarRef.afterDismissed().subscribe(() => {
      this.snackBarRef = null;
    });
  }

  /**
   * Loggue une erreur
   *
   * @param {string} customErrorName Le nom de l'erreur
   * @param {string} customErrorMessage Le message de l'erreur
   * @param {any} error L'erreur catchée si disponible
   */
  public logError(customErrorName: string, customErrorMessage: string, error?: any) {
    // @TODO : console.log à passer en _logger
    console.log('*** logError ***');
    console.log(customErrorName + ' : ' + customErrorMessage);
    if (error) {
      console.log(error);
      if (error.name && error.message) {
        console.log(error.name + ' : ' + error.message);
      }
    }
    console.log('****************');
  }
}
