import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenSaverComponent } from './screen-saver.component';

const routes: Routes = [
  {
    path: '',
    component: ScreenSaverComponent,
    // data: {animation: 'ScreenSaver'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenSaverRoutingModule { }
