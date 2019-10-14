import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenSaverRoutingModule } from './screen-saver-routing.module';
import { ScreenSaverComponent } from './screen-saver.component';

@NgModule({
  declarations: [ScreenSaverComponent],
  imports: [
    CommonModule,
    ScreenSaverRoutingModule
  ]
})
export class ScreenSaverModule { }
