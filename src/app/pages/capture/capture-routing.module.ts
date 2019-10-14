import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaptureComponent } from './capture.component';

const routes: Routes = [
  {
    path: '',
    component: CaptureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptureRoutingModule { }
