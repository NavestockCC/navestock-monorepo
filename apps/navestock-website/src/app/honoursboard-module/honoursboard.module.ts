import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavestockMaterialModule } from '../app-root-module/match.material.module';
import { HonoursboardRoutingModule } from './honoursboard-routing.module';
import { HonoursboardComponent } from './honoursboard/honoursboard.component';


@NgModule({
  declarations: [
    HonoursboardComponent
  ],
  imports: [
    CommonModule,
    HonoursboardRoutingModule,
    NavestockMaterialModule
  ],
  exports: [
    HonoursboardComponent
  ]
})
export class HonoursboardModule { }
