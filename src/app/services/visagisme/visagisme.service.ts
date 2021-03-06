import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { captureTest } from 'src/app/mocks/picture';

@Injectable({
  providedIn: 'root'
})
export class VisagismeService {
  /**
   * Le serveur est-il local ou distant ?
   */
  localServer = false;
  /**
   * La photo utilisateur au format String (Base 64)
   */
  capture = captureTest; // on peut utiliser captureTest comme mock
  /**
   * Les attributs du visage détectés par l'API Igloo
   */
  faceAttributes: any;

  constructor(private http: HttpClient) {}

  /**
   * Service GET HTTP sur l'API Igloo
   *
   * @param {string} base64picture photo au format base64
   * @returns {Promise}
   */
  public sendToIglooService(base64picture: string) {
    const host = this.localServer ? 'http://localhost' : 'https://artlunettev2-dev.zento.fr';
    const url = host + '/getAttributesFromPicture';
    return this.http.post(url, {base64picture}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  /**
   * Service de test de disponibilité de l'API Igloo
   * @TODO : intégrer la double authentification d’API via JWT et les Cookies
   * (https://website.simplx.fr/blog/2016/09/27/authentification-api-via-jwt-et-cookies/)
   *
   * @param {void}
   * @returns {Promise}
   */
  public testIglooService() {
    const host = this.localServer ? 'http://localhost' : 'https://artlunettev2-dev.zento.fr';
    const url: string = host + '/testConnexion';
    return this.http.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  /**
   * Capture des erreurs
   *
   * @param {any} error
   * @returns {Promise<void>|Promise<T>}
   */
  private handleError(error: any): Promise<any> {
    // this._logger.error(error);
    return Promise.reject(error.message || error);
  }

}
