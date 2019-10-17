import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VisagismeService } from 'src/app/services/visagisme/visagisme.service';

/**
 * Ce Guard s'assure que des attributs d'un visage sont déjà enregistrés dans le service {@link VisagismeService}
 * avant de permettre l'accès à la page Advice. Dans le cas contraire, l'utilisateur est redirigé vers la page Capture
 */
@Injectable({
  providedIn: 'root'
})
export class HasUserFaceAttributesGuard implements CanActivate {

  constructor(
    private router: Router,
    private visagismeService: VisagismeService
  ) {}

  /**
   * Implémentation de la méthode canActivate pour ce Guard : si aucun attributs de visage,
   * l'utilisateur est redirigé vers la page Capture
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.visagismeService.faceAttributes) {
      return true;
    }
    // navigate to capture page
    this.router.navigate(['/capture']);
    return false;
  }

}
