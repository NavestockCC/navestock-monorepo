import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubHistoryComponent } from './club-history/club-history.component';
import { FindUsComponent } from './find-us/find-us.component';
import { ContactUsComponent } from './contact-us/contact-us/contact-us.component';
import {  ContactUsAdminComponent } from './contact-us/contact-us-admin/contact-us-admin.component';
import { NavestockPrivacyStatementComponent } from './navestock-privacy-statement/navestock-privacy-statement.component';
import { PlayersWantedComponent } from './players-wanted/players-wanted.component';

const clubRroutes: Routes = [
  { path: '', redirectTo: 'clubhistory', pathMatch: 'full' },
  { path: 'clubhistory', component: ClubHistoryComponent},
  { path: 'findus', component: FindUsComponent},
  { path: 'contactus', component: ContactUsComponent },
  { path: 'contactus-admin', component: ContactUsAdminComponent },
  { path: 'privacystatement', component: NavestockPrivacyStatementComponent },
  { path: 'playerswanted', component: PlayersWantedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(clubRroutes)],
  exports: [RouterModule]
})
export class ClubInfoRoutingModule { }
