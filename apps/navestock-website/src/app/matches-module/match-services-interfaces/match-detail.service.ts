import { Injectable } from '@angular/core';
import { MatchDetail, PlayCricketMatchDetail } from './match.interface';
import {MatchDateService} from './match-date.service';


@Injectable({
  providedIn: 'root',
})
export class MatchDetailService {
  constructor(private mds: MatchDateService) {}

  getMatchDetailFromPlayCricket(md: PlayCricketMatchDetail): MatchDetail {
    let matchdetail:MatchDetail|undefined = undefined;
    const teams = this.getTeams(md);

    matchdetail = {
      id: md.id,
      season: md.season,
      navestock_club_id: teams.navestock_club_id,
      navestock_club_name: teams.navestock_club_name,
      navestock_team_id: teams.navestock_team_id,
      navestock_team_name: teams.navestock_team_name,
      opposition_club_id: teams.opposition_club_id,
      opposition_club_name: teams.opposition_club_name,
      opposition_team_id: teams.opposition_team_id,
      opposition_team_name: teams.opposition_team_name,
      match_date: this.mds.toTimeStamp(md.match_date, md.match_time),
      last_updated: this.mds.toTimeStamp(md.last_updated),
    };

    return matchdetail;
  }

  private getTeams(md: PlayCricketMatchDetail): {
    navestock_team_id: string;
    navestock_team_name: string;
    navestock_club_id: string;
    navestock_club_name: string;
    opposition_team_id: string;
    opposition_team_name: string;
    opposition_club_id: string;
    opposition_club_name: string;
  } {
    let NavTeamId = null;
    let NavTeamName = null;
    let NavClubId = null;
    let NavClubName = null;
    let OppTeamId = null;
    let OppTeamName = null;
    let OppClubId = null;
    let OppClubName = null;

    if (md.away_club_id === '4513') {
      NavTeamId = md.away_team_id;
      NavTeamName = md.away_team_name;
      NavClubId = md.away_club_id;
      NavClubName = md.away_club_name;
      OppTeamId = md.home_team_id;
      OppTeamName = md.home_team_name;
      OppClubId = md.home_club_id;
      OppClubName = md.home_club_name;
    } else {
      OppTeamId = md.away_team_id;
      OppTeamName = md.away_team_name;
      OppClubId = md.away_club_id;
      OppClubName = md.away_club_name;
      NavTeamId = md.home_team_id;
      NavTeamName = md.home_team_name;
      NavClubId = md.home_club_id;
      NavClubName = md.home_club_name;
    }

    return {
      navestock_team_id: NavTeamId,
      navestock_team_name: NavTeamName,
      navestock_club_id: NavClubId,
      navestock_club_name: NavClubName,
      opposition_team_id: OppTeamId,
      opposition_team_name: OppTeamName,
      opposition_club_id: OppClubId,
      opposition_club_name: OppClubName,
    };
  }


}