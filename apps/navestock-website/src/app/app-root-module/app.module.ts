import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app-root-component/app.component';

/** 
 * Import environment variables 
 */
import { environment } from '../../environments/environment';

/** 
 * External Modules 
 */
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

/**
 * Navestock Modules
 */
import { NavestockMaterialModule } from './match.material.module';
import { AppRoutingModule } from '../app-routing-module/app-routing.module';
import { BannerModule } from '../banner-module/banner.module';
import { ClubInfoModule } from '../club-info-module/club-info.module';
import { HomePageModule } from '../home-page-module/home-page.module';
import { Navestock250Module } from '../navestock250-module/navestock250.module';
import { HonoursboardModule } from '../honoursboard-module/honoursboard.module';
import { MatchesModule } from '../matches-module/matches.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NavestockMaterialModule,
  // ******* Navestock Modules *********
    AppRoutingModule,
    BannerModule,
    ClubInfoModule,
    HomePageModule,
    Navestock250Module,
    HonoursboardModule,
    MatchesModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
