import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** 
 * Navestock Component Imports 
 * */
import { HomeComponent250 } from './home-page/home250.component';
import { ColinBridgeVillageCupComponent } from './colin-bridge-village-cup/colin-bridge-village-cup.component';
import { GalaDinnerComponent } from './gala-dinner/gala-dinner.component';
import { Veterans7asideComponent } from './veterans7aside/veterans7aside.component';



const ncc250routes: Routes = [
  {path: '',  redirectTo: '250home', pathMatch: 'full' },
  {path: '250home',  component: HomeComponent250 },
  {path: 'galadinner',  component: GalaDinnerComponent },
  {path: 'veterans7aside',  component: Veterans7asideComponent },
  {path: 'colinbridgevillagecup',  component: ColinBridgeVillageCupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ncc250routes)],
  exports: [RouterModule]
})
export class Navestock250RoutingModule { }

