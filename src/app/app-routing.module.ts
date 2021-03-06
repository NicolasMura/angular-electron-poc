import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HasUserFaceAttributesGuard } from './guards/has-user-face-attributes/has-user-face-attributes.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'screen-saver',
    pathMatch: 'full'
  },
  {
    path: 'screen-saver',
    loadChildren: './pages/screen-saver/screen-saver.module#ScreenSaverModule'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: 'capture',
    loadChildren: './pages/capture/capture.module#CaptureModule'
  },
  {
    path: 'advice',
    loadChildren: './pages/advice/advice.module#AdviceModule',
    canActivate: [
      HasUserFaceAttributesGuard
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
