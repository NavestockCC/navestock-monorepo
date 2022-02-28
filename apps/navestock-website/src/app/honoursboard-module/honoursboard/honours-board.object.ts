import { Timestamp } from "firebase/firestore";


export class HonoursBoard {

    match_date!: Timestamp;
    playerid!: string;
    playername!: string;
    navestock_club_id!: string;
    navestock_club_name!: string;
    navestock_team_id!: string;
    navestock_team_name!: string;
    opposition_club_id!: string;
    opposition_club_name!: string;
    opposition_team_id!: string;
    opposition_team_name!: string;
    home_club_name!: string;
    competition_name!: string;
    ground_name!: string;
    bowler_wickets?: number;
    bowler_overs?: number;
    bowler_runs?: number;
    batsman_runs?: number;
    batsman_fours?: number;
    batsman_sixes?: number;
    batsman_position?: number;
    batsman_notout?: boolean;
    id!: string;

public setHonoursBoardArray(hbArry: any[]): HonoursBoard[] {
        const hbReturn: HonoursBoard[] = [];
        hbArry.forEach( hbItem => {
            const tempHB: HonoursBoard = new HonoursBoard();
            tempHB.id = hbItem.id;
            tempHB.match_date = hbItem.match_date;
            tempHB.navestock_club_id = hbItem.navestock_club_id;
            tempHB.navestock_club_name = hbItem.navestock_club_name;
            tempHB.navestock_team_id = hbItem.navestock_team_id;
            tempHB.navestock_team_name = hbItem.navestock_team_name;
            tempHB.opposition_club_id = hbItem.opposition_club_id;
            tempHB.opposition_club_name = hbItem.opposition_club_name;
            tempHB.opposition_team_id = hbItem.opposition_team_id;
            tempHB.opposition_team_name = hbItem.opposition_team_name;
            tempHB.playerid = hbItem.playerid;
            tempHB.playername = hbItem.playername;
            // Add Batsman properties if HB for batting
            if (hbItem.batsman_runs !== undefined && hbItem.batsman_runs >= 100) {
                tempHB.batsman_fours = hbItem.batsman_fours;
                tempHB.batsman_position = hbItem.batsman_position;
                tempHB.batsman_runs = hbItem.batsman_runs;
                tempHB.batsman_sixes = hbItem.batsman_sixes;
                if (hbItem.batsman_how_out !== undefined && hbItem.batsman_how_out === 'not out') {
                    tempHB.batsman_notout = true;
                } else {
                    tempHB.batsman_notout = false;
                }
            }
            // Add Bowler properties if HB for bowling
            if (hbItem.bowler_wickets !== undefined && hbItem.bowler_wickets >= 5) {
                tempHB.bowler_overs = hbItem.bowler_overs;
                tempHB.bowler_runs = hbItem.bowler_runs;
                tempHB.bowler_wickets = hbItem.bowler_wickets;
            }
            hbReturn.push(tempHB);
        });

        return hbReturn;
    }


}

export class HonoursBoardPerYear {

    year!: number;
    honoursBoard: HonoursBoard[] = [];


}
