import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchListMonthComponent } from './match-list-month/match-list-month.component';
import { MatchListWeekComponent } from './match-list-week/match-list-week.component';



@NgModule({
  declarations: [
      MatchListMonthComponent,
      MatchListWeekComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatchListMonthComponent,
    MatchListWeekComponent
  ]
})
export class MatchesModule { }
