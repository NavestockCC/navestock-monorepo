import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Navestock  modules
 */
import { NavestockMaterialModule } from '../app-root-module/match.material.module';

/**
 * Navestock authentication modules
 */
  import {UserAuthenticationComponent} from './user-authentication/user-authentication.component';

@NgModule({
  declarations: [
    UserAuthenticationComponent
  ],
  exports:[
    UserAuthenticationComponent
  ],
  imports: [
    CommonModule,
    NavestockMaterialModule,
  ]
})
export class UserAuthenticationModule { }
