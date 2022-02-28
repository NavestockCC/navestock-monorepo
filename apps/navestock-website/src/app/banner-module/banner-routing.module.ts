import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const bannerRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(bannerRoutes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
