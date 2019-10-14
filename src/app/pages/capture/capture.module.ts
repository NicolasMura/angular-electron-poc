import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaptureRoutingModule } from './capture-routing.module';
import { CaptureComponent } from './capture.component';
import { MatSlideToggleModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CaptureComponent],
  imports: [
    CommonModule,
    CaptureRoutingModule,
    FormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class CaptureModule { }
