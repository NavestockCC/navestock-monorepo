import * as admin from 'firebase-admin';
import { Match } from '../../interfaces/matchlist.interface';

export class MatchInterfaceServices {
  /**
 * setNavestockAndOppositionAttributes
match:Match */
  public setNavestockAndOppositionAttributes(match: Match) {
    const home_team_isNavestock = this.isNavestockHomeTeam(match.home_club_id);

    //PlayCricket sets away_club_id to undefined when home and away club are the same club
    if(match.away_club_id === undefined){
        match.away_club_id = match.home_club_id;
        match.away_club_name = match.home_club_name;
    }


    // set the oposition and navestock team info
    if (home_team_isNavestock === true) {
      match.navestock_club_id = match.home_club_id;
      match.navestock_club_name = match.home_club_name;
      match.navestock_team_id = match.home_team_id;
      match.navestock_team_name = match.home_team_name;

      match.opposition_club_id = match.away_club_id;
      match.opposition_club_name = match.away_club_name;
      match.opposition_team_id = match.away_team_id;
      match.opposition_team_name = match.away_team_name;
    } else {
      match.navestock_club_id = match.away_club_id;
      match.navestock_club_name = match.away_club_name;
      match.navestock_team_id = match.away_team_id;
      match.navestock_team_name = match.away_team_name;

      match.opposition_club_id = match.home_club_id;
      match.opposition_club_name = match.home_club_name;
      match.opposition_team_id = match.home_team_id;
      match.opposition_team_name = match.home_team_name;
    }

    return match;
  }

  /** Evaluates the 'home_club_id' to see if it equal to 4513 Which is the Navestock Playcrick club id. */
  private isNavestockHomeTeam(home_club_id: string): boolean {
    let returnVal: boolean;
    if (home_club_id === '4513') {
      returnVal = true;
    } else {
      returnVal = false;
    }
    return returnVal;
  }

  /**
   * Updates string date to firebase timestamp
   * @param dateString 
   * @param [timeString] 
   * @returns string date to firebase timestamp 
   */
  public updateStringDateToFirebaseTimestamp(dateString: string, timeString?: string): admin.firestore.Timestamp {
    //Convert string t date
      const splitDate:string[] = dateString.split("/");
    
      //If timeString is not defined
      if(timeString === undefined || timeString === "" ){
        timeString = '12:00';
      }

    // Create JS Date
    const dateObject = new Date(splitDate[2] + '-' + splitDate[1]  + '-' + splitDate[0] + 'T' + timeString + ':00+01:00');
    
    //Convert JS Date to Firestore Timestamp
    return admin.firestore.Timestamp.fromDate(dateObject);

  }
}
