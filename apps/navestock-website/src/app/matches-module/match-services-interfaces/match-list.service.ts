import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

/* RXJS */
import { from, Observable, of } from 'rxjs';
import { map, filter, mergeMap, groupBy, toArray } from 'rxjs/operators';

/* Match */
import {ListOfMatches_Month, PlayCricketMatchList, ListOfMatches_Week, MatchDetail} from './match.interface';
import {MatchDateService} from './match-date.service';
import { MatchDetailService } from "./match-detail.service";

@Injectable({
  providedIn: 'root',
})
export class MarchListService {
  

  constructor(private matchDetailService: MatchDetailService, private mds: MatchDateService, private afs: AngularFirestore){};

  navTeamId = "50485"
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  getMatchList(teamId_navestock:number|undefined = undefined, clubId_opposition:number|undefined = undefined, matchlistdata: Observable<PlayCricketMatchList|undefined>): Observable<MatchDetail[]>{
      return matchlistdata.pipe(
        map(ml => ml!.matches),
        map(ml => ml.map( mld => this.matchDetailService.getMatchDetailFromPlayCricket(mld))),
        map(ml => ml.sort((a, b) => (a.match_date > b.match_date) ? 1 : 1)),
        mergeMap( matchDetailArry => from(matchDetailArry).pipe(
          filter((matchDetailData)=>{
            if(clubId_opposition === undefined){
              return matchDetailData.opposition_club_id != undefined;
            }else{
              return matchDetailData.opposition_club_id === clubId_opposition.toString();
            }
        }),
        filter((matchDetailData)=>{
          if(teamId_navestock === undefined){
            return matchDetailData.navestock_team_id != undefined;
          }else{
            return matchDetailData.navestock_team_id === teamId_navestock.toString();
          }
      })
        )),
        toArray()
      )};
  
     
    

public getMatchList_Month(teamId_navestock:number|undefined = undefined, clubId_opposition:number|undefined = undefined, matchlistdata: Observable<PlayCricketMatchList|undefined> ): Observable<ListOfMatches_Month[]>{
  const ListOfMatches = this.getMatchList(teamId_navestock, clubId_opposition, matchlistdata);

  return ListOfMatches.pipe(
    mergeMap( ml => from(ml).pipe(
      groupBy(match => match.match_date.MonthYear),
      mergeMap(group => group.pipe(
                toArray(),
                map( arr => ({"month" : arr[0].match_date.MonthYear, "matches": arr}))
                ))
                )),
      toArray()
  )};


/**
 * 
 */
public   getMatchList_Week(teamId_navestock:number|undefined = undefined, clubId_opposition:number|undefined = undefined, weeksToDisplay:number|undefined = undefined, matchlistdata: Observable<PlayCricketMatchList|undefined> ): Observable<ListOfMatches_Week[]>{
    const ListOfMatches = this.getMatchList(teamId_navestock, clubId_opposition, matchlistdata);
  
    return ListOfMatches.pipe(
      mergeMap( ml => from(ml).pipe(
        filter((matchDetail)=>{
          if(weeksToDisplay === undefined){
            return matchDetail.match_date.WeekYear != undefined;
          } else {
              const weekNow = this.mds.getWeek(new Date(Date.now()));
            return matchDetail.match_date.WeekYear >= weekNow && matchDetail.match_date.WeekYear <= weekNow + weeksToDisplay;
          }
      }),
        groupBy(match => match.match_date.WeekYear),
        mergeMap(group => group.pipe(
                  toArray(),
                  map( arr => ({"week" : arr[0].match_date.WeekYear, "weekdate": arr[0].match_date.WeekDate ,"matches": arr}))
                  ))
                  )),
        toArray()
    )};  



getPlayCricketMatchList(season:string|undefined): Observable<PlayCricketMatchList|undefined> {
  return this.afs.collection('MatchList').doc<PlayCricketMatchList>(season).valueChanges();
};
  


}