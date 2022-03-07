import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** 
 * Import environment variables 
 */
import { environment } from '../../environments/environment';

/** 
 * External Modules 
 */
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleMapsModule } from '@angular/google-maps';

/** 
 * Angular Modules 
 */
import { ReactiveFormsModule } from '@angular/forms';

/* Navestock Moddule Import */
import { NavestockMaterialModule } from '../app-root-module/match.material.module';

import { ClubInfoRoutingModule } from './club-info-routing.module';
import { ClubHistoryComponent } from './club-history/club-history.component';
import { FindUsComponent } from './find-us/find-us.component';
import { ContactUsComponent } from './contact-us/contact-us/contact-us.component';
import { ContactUsAdminComponent } from './contact-us/contact-us-admin/contact-us-admin.component';
import { PlayersWantedComponent } from './players-wanted/players-wanted.component';
import { NavestockPrivacyStatementComponent } from './navestock-privacy-statement/navestock-privacy-statement.component';



@NgModule({
  declarations: [
    ClubHistoryComponent,
    FindUsComponent,
    ContactUsComponent,
    ContactUsAdminComponent,
    PlayersWantedComponent,
    NavestockPrivacyStatementComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NavestockMaterialModule,
    ClubInfoRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ],
  exports:[
    ClubHistoryComponent,
    FindUsComponent,
    ContactUsComponent,
    ContactUsAdminComponent,
    PlayersWantedComponent,
    NavestockPrivacyStatementComponent
  ]
})
export class ClubInfoModule { }
