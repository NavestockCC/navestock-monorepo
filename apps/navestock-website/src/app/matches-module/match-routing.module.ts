import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchListMonthComponent } from "./match-list-month/match-list-month.component";

const matchRoutes: Routes = [
  { path: 'matchlist', component: MatchListMonthComponent },
];

@NgModule({
  imports: [RouterModule.forChild(matchRoutes)],
  exports: [RouterModule]
})
export class MatchRoutingModule { }
