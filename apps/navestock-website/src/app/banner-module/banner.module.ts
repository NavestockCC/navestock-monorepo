import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** 
 * External Modules 
 */
import { FlexLayoutModule } from '@angular/flex-layout';

/* Navestock Moddule Import */
import { NavestockMaterialModule } from '../app-root-module/match.material.module';
import { UserAuthenticationModule } from '../user-authentication-module/user-authentication.module';


/* Banner Moddule Import */
import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner/banner.component';
import { MenuComponent } from "./menu/menu.component";


@NgModule({
  declarations: [
    BannerComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    BannerRoutingModule,
    NavestockMaterialModule,
    UserAuthenticationModule
  ],
  exports: [
    BannerComponent,
    MenuComponent
  ]
})
export class BannerModule { }
