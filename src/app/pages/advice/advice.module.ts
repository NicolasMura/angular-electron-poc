import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdviceRoutingModule } from './advice-routing.module';
import { AdviceComponent } from './advice.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [AdviceComponent],
  imports: [
    CommonModule,
    AdviceRoutingModule,
    MatButtonModule
  ]
})
export class AdviceModule { }
