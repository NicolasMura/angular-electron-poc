import { Injectable, ErrorHandler } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { CustomSnackbarComponent } from 'src/app/shared/components/custom-snackbar/custom-snackbar.component';
import { NGXLogger } from 'ngx-logger';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Service de gestion des erreurs
 *
 * Service basique pour afficher les erreurs en frontend et les logguer (Voir un exemple d'utilisation sur {@link CaptureComponent})
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  /**
   * Référence locale au Snackbar qui affiche les erreurs
   */
  public snackBarRef: MatSnackBarRef<CustomSnackbarComponent>;

  constructor(
    private snackBar: MatSnackBar,
    private logger: NGXLogger
  ) { }

  /**
   * Gestion globale custom des erreurs non catchées, basée sur l'implémentation de la classe ErrorHandler
   *
   * @param {Error | HttpErrorResponse} error L'erreur catchée
   */
  handleError(error: Error | HttpErrorResponse) {
    this.logger.error('*** handleError ***');
    this.logError('Erreur inconnue', error.message ? error.message : error.toString(), error);
    this.logger.error('*******************');
  }

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
    this.logger.debug('*** logError ***');
    this.logger.debug(customErrorName + ' : ' + customErrorMessage);
    if (error) {
      this.logger.debug(error);
      if (error.name && error.message) {
        this.logger.debug(error.name + ' : ' + error.message);
      }
    }
    this.logger.debug('****************');
  }
}
