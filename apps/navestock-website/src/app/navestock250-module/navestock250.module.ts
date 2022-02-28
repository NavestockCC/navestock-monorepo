import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Navestock Module Imports
 */
import { Navestock250RoutingModule } from './navestock250-routing.module';
import {ImgModule} from '../imgModule/imgModule';

/**
 * Navestock component Imports
 */

 import {GalaDinnerComponent} from './gala-dinner/gala-dinner.component';
 import {Veterans7asideComponent} from './veterans7aside/veterans7aside.component';
 import {ColinBridgeVillageCupComponent} from './colin-bridge-village-cup/colin-bridge-village-cup.component';
 import {HomeComponent250} from './home-page/home250.component';

@NgModule({
    declarations: [
        GalaDinnerComponent,
        Veterans7asideComponent,
        ColinBridgeVillageCupComponent,
        HomeComponent250
    ],
    imports: [ 
        CommonModule,
        ImgModule,
        Navestock250RoutingModule
    ],
    exports: [
        GalaDinnerComponent,
        Veterans7asideComponent,
        ColinBridgeVillageCupComponent,
        HomeComponent250
    ],
    providers: [],
})
export class Navestock250Module {}