import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { VisagismeService } from 'src/app/services/visagisme/visagisme.service';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { fadeInOutAnimation } from 'src/app/shared/animations/fade-in-out';

/**
 * Page affichant la capture vidéo et permettant la prise de photo et l'envoi de la photo au serveur
 */
@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss'],
  animations: [fadeInOutAnimation]
})
export class CaptureComponent implements OnInit, AfterViewInit {
  /**
   * Référence DOM vers l'élément HTML video
   */
  @ViewChild('video', {static: true}) public video: ElementRef;
  /**
   * Référence DOM vers l'élément HTML canvas
   */
  @ViewChild('canvas', {static: true}) public canvas: ElementRef;
  /**
   * Tableau des webcams disponibles
   */
  public devices: any = [];
  /**
   * Webcam sélectionnée
   */
  public selectedDevice: any = null;
  /**
   * La caméra est-elle en train de s'initialiser ?
   */
  public isCameraLoading = true;
  /**
   * En attente du retour serveur ?
   */
  workInProgress = false;
  /**
   * Souscription (peut mieux faire)
   */
  subscription: Subscription;

  constructor(
    private router: Router,
    public visagismeService: VisagismeService,
    public errorHandlerService: ErrorHandlerService
  ) {}

  /**
   * Initialisation : test de disponibilité du serveur
   */
  public ngOnInit() {
    let errName       = '';
    let errMessage    = '';
    let errNameForLog = '';

    // test de disponibilité de l'API Igloo
    this.visagismeService.testIglooService()
      .then(response => {
        // console.log(response);
      }, err => {
        errName = 'Erreur';
        errNameForLog = errName + ' (testIglooService err)';
        errMessage = this.visagismeService.localServer ? 'serveur (local) non disponible' : 'serveur non disponible';
        this.errorHandlerService.displayFrontError(errName, errMessage);
        this.errorHandlerService.logError(errNameForLog, errMessage, err);
      })
      .catch((err) => {
        errName = 'Erreur';
        errNameForLog = errName + ' (testIglooService catch())';
        errMessage = this.visagismeService.localServer ? 'serveur (local) non disponible' : 'serveur non disponible';
        this.errorHandlerService.displayFrontError(errName, errMessage);
        this.errorHandlerService.logError(errNameForLog, errMessage, err);
      });
  }

  /**
   * Initialisation et affichage du flux vidéo
   */
  public ngAfterViewInit() {
    this.showCamera();
  }

  /**
   * Affiche le flux vidéo de la webcam sélectionnée
   *
   * @param {any} device La webcam sélectionnée
   */
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
              errMessage = 'il semble que votre système refuse l\'accès à votre caméra. Si vous êtes sur Mac OS X (à variabiliser), \
                veuillez modifier vos préférences système (Security & Privacy > Privacy)';
              break;
            case 'NotReadableError' || 'DOMException':
              errName = 'Accès à la caméra impossible';
              errNameForLog = errName + ' (getUserMedia err)';
              errMessage = 'il semble que votre système refuse l\'accès à votre caméra. Si vous êtes sur Mac OS X (à variabiliser), \
                veuillez modifier vos préférences système (Security & Privacy > Privacy)';
              break;
            default:
              errName = 'Erreur inconnue';
              errMessage = 'veuillez contacter le service après-vente Zen\'To.';
          }
          this.errorHandlerService.displayFrontError(errName, errMessage);
          this.errorHandlerService.logError(errNameForLog, errMessage, err);
        }).catch((err) => {
          errName = 'Erreur inconnue';
          errNameForLog = errName + ' (getUserMedia catch())';
          errMessage = '';
          this.errorHandlerService.logError(errNameForLog, errMessage, err);
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
            this.errorHandlerService.displayFrontError(errName, errMessage);
            this.errorHandlerService.logError(errNameForLog, errMessage);
          }
        }, err => {
          errName = 'Erreur dans la récupération du flux vidéo';
          errNameForLog = errName + ' (enumerateDevices err)';
          errMessage = '';
          this.errorHandlerService.displayFrontError(errName, errMessage);
          this.errorHandlerService.logError(errNameForLog, errMessage, err);
        })
        .catch((err) => {
          errName = 'Aucune caméra détectée';
          errNameForLog = errName + ' (enumerateDevices err)';
          errMessage = 'veuillez connecter une caméra à votre machine et redémarrer l\'application.';
          this.errorHandlerService.displayFrontError(errName, errMessage);
          this.errorHandlerService.logError(errNameForLog, errMessage, err);
        });
      }
    }
  }

  /**
   * Change la webcam sélectionnée et affiche le flux vidéo correspondant
   *
   * @param {any} device La webcam sélectionnée
   */
  public changeDevice() {
    console.log('SelectedDevice : ', this.selectedDevice);
    this.showCamera(this.selectedDevice);
  }

  /**
   * Prend la photo, l'affiche dans le canvas au format base 64 et l'enregistre dans le service {@link VisagismeService}
   */
  public takePicture() {
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
    // this.capture = this.canvas.nativeElement.toDataURL('image/jpg');
    this.visagismeService.capture = this.canvas.nativeElement.toDataURL('image/jpg');
  }

  /**
   * Envoie la photo au serveur pour analyse par l'API Igloo
   */
  public sendToIgloo() {
    let errName       = '';
    let errMessage    = '';
    let errNameForLog = '';

    if (this.visagismeService.capture !== '') {
      this.workInProgress = true;

      this.visagismeService.sendToIglooService(this.visagismeService.capture).then((response: any) => {
        console.log(response);
        if (response.faceAttributes) {
          console.log(JSON.parse(response.faceAttributes));
          this.visagismeService.faceAttributes = JSON.parse(response.faceAttributes);
          this.router.navigateByUrl('/advice');
        } else {
          errName = 'Erreur';
          errNameForLog = errName + ' (sendToIglooService response)';
          errMessage = 'la détection du visage n\'a pas pu aboutir.';
          this.errorHandlerService.displayFrontError(errName, errMessage);
          this.errorHandlerService.logError(errName, errMessage);
        }
        this.workInProgress = false;
      },
      (err) => {
        errName = 'Erreur';
        errNameForLog = errName + ' (sendToIglooService err)';
        errMessage = this.visagismeService.localServer ? 'serveur (local) non disponible' : 'serveur non disponible';
        this.errorHandlerService.displayFrontError(errName, errMessage);
        this.errorHandlerService.logError(errName, errMessage, err);
        this.workInProgress = false;
      });
    }
  }

}
