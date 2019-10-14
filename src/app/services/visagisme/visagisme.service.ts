import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisagismeService {
  capture = '';        // la photo prise au format base64
  faceAttributes: any; // les attributs du visage détectés par l'API Igloo

  constructor() {}

  getCapture() {
    return of(this.capture).pipe();
  }

  getFaceAttributes() {
    return of(this.faceAttributes).pipe();
  }
}
