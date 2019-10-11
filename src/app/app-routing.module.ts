import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ScreenSaverComponent } from './pages/screen-saver/screen-saver.component';
import { HomeComponent } from './pages/home/home.component';
import { AdviceComponent } from './pages/advice/advice.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'screen-saver',
    pathMatch: 'full'
  },
  {
    path: 'screen-saver',
    loadChildren: './pages/screen-saver/screen-saver.module#ScreenSaverModule',
    // data: { animation: 'ScreenSaver' },
    // component: ScreenSaverComponent
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomeModule',
    // data: { animation: 'Home' },
    // component: HomeComponent
  },
  {
    path: 'advice',
    loadChildren: './pages/advice/advice.module#AdviceModule',
    // data: { animation: 'Advice' },
    // component: AdviceComponent
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
