import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** 
 * Honoursboard Componenets 
 * */
import { HonoursboardComponent } from './honoursboard/honoursboard.component';
const honoursboardRoutes: Routes = [
  {path: '',  redirectTo: 'honoursboard', pathMatch: 'full' },
  {path: 'honoursboard',  component: HonoursboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(honoursboardRoutes)],
  exports: [RouterModule]
})
export class HonoursboardRoutingModule { }
