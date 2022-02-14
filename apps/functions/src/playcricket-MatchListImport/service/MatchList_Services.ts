import * as admin from 'firebase-admin'

export class MatchListImport {

/**
 * Matchs list transform
 * @param matchList 
 * @param season 
 * @returns list transform 
 */
public matchListTransform(matchList: any, season: string): object {
    const ML = JSON.parse(matchList);
    const transformedMatchList = {"season": season, "matches": []};

    try {
        ML.matches.forEach(element => {
            transformedMatchList.matches.push(this.updateDbFields(element));
        });
    } catch (error) {
        
    }

    return transformedMatchList;
}

/**
 * Updates matchlist fields
 * @param element 
 * @returns db fields 
 */
private updateDbFields(element: any): object {
        // set the oposition and navestock team info
        let navestock_club_id = ""
        let navestock_club_name = ""
        let navestock_team_id = ""
        let navestock_team_name = ""
        let opposition_club_id = ""
        let opposition_club_name = ""
        let opposition_team_id = ""
        let opposition_team_name = ""
        const home_team_isNavestock: boolean = this.isNavestockHomeTeam(element.home_club_id)


        if (home_team_isNavestock === true) {
            navestock_club_id = element.home_club_id;
            navestock_club_name = element.home_club_name;
            navestock_team_id = element.home_team_id;
            navestock_team_name = element.home_team_name;

            opposition_club_id = element.away_club_id;
            opposition_club_name = element.away_club_name;
            opposition_team_id = element.away_team_id;
            opposition_team_name = element.away_team_name;
        } else {
            navestock_club_id = element.away_club_id;
            navestock_club_name = element.away_club_name;
            navestock_team_id = element.away_team_id;
            navestock_team_name = element.away_team_name;

            opposition_club_id = element.home_club_id;
            opposition_club_name = element.home_club_name;
            opposition_team_id = element.home_team_id;
            opposition_team_name = element.home_team_name;
        }


        const updateFields: object = {
            'last_updated': this.toDate(element.last_updated),
            'match_date': this.toDate(element.match_date, element.match_time),
            'season': +element.season,
            'id': element.id.toString(),
            'navestock_club_id': navestock_club_id,
            'navestock_club_name': navestock_club_name,
            'navestock_team_id': navestock_team_id,
            'navestock_team_name': navestock_team_name,
            'opposition_club_id': opposition_club_id,
            'opposition_club_name': opposition_club_name,
            'opposition_team_id': opposition_team_id,
            'opposition_team_name': opposition_team_name,
        }


        return updateFields;
    }

    /** Takes a string dd/mm/yyy and converts it to an ISO date */
    private toDate(dateStr: string, timeStr?: string): admin.firestore.Timestamp {
        const tmpDate: string[] = dateStr.split("/");
        let matchTime: string;

        if (timeStr) {
            matchTime = timeStr;
        } else {
            matchTime = '12:00';
        }

        return admin.firestore.Timestamp.fromDate(
            new Date(tmpDate[2] + '-' + tmpDate[1] + '-' + tmpDate[0] + 'T' + matchTime + ':00+01:00')
        );
    }

    private isNavestockHomeTeam(home_club_id: string): boolean {
        let returnVal: boolean;
        if (home_club_id === '4513') {
            returnVal = true;
        } else {
            returnVal = false;
        }
        return returnVal;
    }

}
