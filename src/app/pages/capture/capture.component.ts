import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { VisagismeService } from 'src/app/services/visagisme/visagisme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss'],
  animations: [
    // fadeAnimation,
    // slideInAnimation,
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
export class CaptureComponent implements OnInit, AfterViewInit {
  @ViewChild('video', {static: true}) public video: ElementRef;
  @ViewChild('canvas', {static: true}) public canvas: ElementRef;

  public devices: any = [];
  public selectedDevice: any = null;
  public errorMessages: any[] = [];
  public displayedToast: any = null;
  public isCameraLoading = true;

  local = false;
  canSendForAnalyse = false;
  toggleDisabled = false;
  workInProgress = false;

  subscription: Subscription;

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public visagismeService: VisagismeService
  ) {}

  public ngOnInit() {
    let errName       = '';
    let errMessage    = '';
    let errNameForLog = '';

    // test de disponibilité de l'API Igloo
    this.testIglooService()
      .then(response => {
        // console.log(response);
      }, err => {
        errName = 'Erreur';
        errNameForLog = errName + ' (testIglooService err)';
        errMessage = this.local ? 'serveur (local) non disponible' : 'serveur non disponible';
        this.displayFrontError(errName, errMessage, 5000);
        this.logError(errNameForLog, errMessage, err);
      })
      .catch((err) => {
        errName = 'Erreur';
        errNameForLog = errName + ' (testIglooService catch())';
        errMessage = this.local ? 'serveur (local) non disponible' : 'serveur non disponible';
        this.displayFrontError(errName, errMessage, 5000);
        this.logError(errNameForLog, errMessage, err);
      });

    // récupération photo si dispo
    this.subscription = this.visagismeService.getFaceAttributes().subscribe(capture => {
      if ( capture ) {
        this.canSendForAnalyse = true;
      }
    });
  }

  public ngAfterViewInit() {
    this.showCamera();
  }

  public showCamera(device?: any) {
    console.log('device : ', device);

    let errName       = '';
    let errMessage    = '';
    let errNameForLog = '';

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      if (device) {
        this.selectedDevice = device;
        navigator.mediaDevices.getUserMedia({
          video: {
            // facingMode: { exact: "environment" },
            // deviceId: device.deviceId
            deviceId: {exact: device.deviceId}
          }
        }).then(stream => {
          // this.video.nativeElement.src = window.URL.createObjectURL(stream);
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.isCameraLoading = false;
        }, err => {
          switch (err.name) {
            case 'NotAllowedError':
              errName = 'Accès à la caméra refusée';
              errNameForLog = errName + ' (getUserMedia err)';
              errMessage = 'il semble que votre système refuse l\'accès à votre caméra. Si vous êtes sur Mac OS X (à variabiliser), veuillez modifier vos préférences système (Security & Privacy > Privacy)';
              break;
            case 'NotReadableError' || 'DOMException':
              errName = 'Accès à la caméra impossible';
              errNameForLog = errName + ' (getUserMedia err)';
              errMessage = 'il semble que votre système refuse l\'accès à votre caméra. Si vous êtes sur Mac OS X (à variabiliser), veuillez modifier vos préférences système (Security & Privacy > Privacy)';
              break;
            default:
              errName = 'Erreur inconnue';
              errMessage = 'veuillez contacter le service après-vente Zen\'To.';
          }
          this.displayFrontError(errName, errMessage);
          this.logError(errNameForLog, errMessage, err);
        }).catch((err) => {
          errName = 'Erreur inconnue';
          errNameForLog = errName + ' (getUserMedia catch())';
          errMessage = '';
          this.logError(errNameForLog, errMessage, err);
        });
      } else {
        navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          devices.forEach((deviceItem) => {
            if (deviceItem.kind === 'videoinput') {
              // console.log(deviceItem.kind + ": " + deviceItem.label + ", id = " + deviceItem.deviceId);
              this.devices.push(deviceItem);
            }
          });
          if (this.devices[0]) {
            this.selectedDevice = this.devices[0];
            this.showCamera(this.selectedDevice);
          } else {
            errName = 'Aucune caméra détectée';
            errNameForLog = errName + ' (enumerateDevices this.devices[0] == undefined)';
            errMessage = 'veuillez connecter une caméra à votre machine et redémarrer l\'application.';
            this.displayFrontError(errName, errMessage);
            this.logError(errNameForLog, errMessage);
          }
        }, err => {
          errName = 'Erreur dans la récupération du flux vidéo';
          errNameForLog = errName + ' (enumerateDevices err)';
          errMessage = '';
          this.displayFrontError(errName, errMessage);
          this.logError(errNameForLog, errMessage, err);
        })
        .catch((err) => {
          errName = 'Aucune caméra détectée';
          errNameForLog = errName + ' (enumerateDevices err)';
          errMessage = 'veuillez connecter une caméra à votre machine et redémarrer l\'application.';
          this.displayFrontError(errName, errMessage);
          this.logError(errNameForLog, errMessage, err);
        });
      }
    }
  }

  public changeDevice(device: any) {
    console.log('SelectedDevice : ', this.selectedDevice);
    this.showCamera(this.selectedDevice);
  }

  public takePicture() {
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
    // this.capture = this.canvas.nativeElement.toDataURL('image/jpg');
    this.visagismeService.capture = this.canvas.nativeElement.toDataURL('image/jpg');
    this.canSendForAnalyse = true;
  }

  public sendToIgloo() {
    let errName       = '';
    let errMessage    = '';
    let errNameForLog = '';

    if (this.visagismeService.capture !== '') {
      this.workInProgress = true;

      this.sendToIglooService(this.visagismeService.capture).then((response) => {
        console.log(response);
        if (response.faceAttributes) {
          console.log(JSON.parse(response.faceAttributes));
          this.visagismeService.faceAttributes = JSON.parse(response.faceAttributes);
          this.router.navigateByUrl('/advice');
        } else {
          errName = 'Erreur';
          errNameForLog = errName + ' (sendToIglooService response)';
          errMessage = 'la détection du visage n\'a pas pu aboutir.';
          this.displayFrontError(errName, errMessage, 5000);
          this.logError(errName, errMessage);
        }
        this.workInProgress = false;
      },
      (err) => {
        errName = 'Erreur';
        errNameForLog = errName + ' (sendToIglooService err)';
        errMessage = this.local ? 'serveur (local) non disponible' : 'serveur non disponible';
        this.displayFrontError(errName, errMessage, 5000);
        this.logError(errName, errMessage, err);
        this.workInProgress = false;
      });
    }
  }

  /**
   * Affiche une erreur en front
   *
   * @param {string} customErrorName Le nom de l'erreur
   * @param {string} customErrorMessage Le message de l'erreur
   * @param {any} timeout Un éventuel timeout en ms pour cacher l'erreur
   */
  public displayFrontError(customErrorName: string, customErrorMessage: string, timeout?: number) {
    const message = customErrorName + ' : ' + customErrorMessage;
    this.displayedToast = this.snackBar.open(message, timeout ? '' : 'OK', {
      duration: timeout ? timeout : 0,
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

  /**
   * Service GET HTTP sur l'API Igloo
   * @TODO : à placer dans un service
   *
   * @param {string} base64picture photo au format base64
   * @returns {Promise}
   */
  public sendToIglooService(base64picture: string) {
    // console.log(window.location.href);
    // console.log(window.location.host);
    // console.log(window.location.hostname);
    const host = this.local ? 'http://localhost' : 'https://artlunettev2-dev.zento.fr';
    const url = host + '/getAttributesFromPicture';
    return this.http.post(url, {base64picture}, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  /**
   * Service de test de disponibilité de l'API Igloo
   * @TODO : à déplacer dans un service
   * @TODO : intégrer la double authentification d’API via JWT et les Cookies
   * (https://website.simplx.fr/blog/2016/09/27/authentification-api-via-jwt-et-cookies/)
   *
   * @param {void}
   * @returns {Promise}
   */
  public testIglooService() {
    const host = this.local ? 'http://localhost' : 'https://artlunettev2-dev.zento.fr';
    const url: string = host + '/testConnexion';
    return this.http.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  /**
   *
   * @param {any} error
   * @returns {Promise<void>|Promise<T>}
   */
  private handleError(error: any): Promise<any> {
    // this._logger.error(error);
    return Promise.reject(error.message || error);
  }

}
