/**
 * Navestock Firebase Function
 * @author Lefras Coetzee
 * @description Function to pull Match Details from the PlayCricket Match Details API.
 * @description The function is triggered from the 'Match_Detail_Import_PubSub' PubSup topic
 *
 */

import * as functions from 'firebase-functions';

import { PlayCricketMatchListAPICall } from '../service/MatchListAPICall';
import { MatchListDB } from '../service/MatchList_DB_service';

import { map,} from 'rxjs/operators'

const matchListDB = new MatchListDB();

export const getPlayCricketMatchListPubSub = functions.pubsub
  .topic('Match_List_Import')
  .onPublish((msgPayload) => {
    try {

      // Retrieve Season from PubSub: Match_List_Import
      let seasonToImport: string;
      if (msgPayload.json.season === undefined){
        seasonToImport = new Date().getFullYear().toString();
      } else {
        seasonToImport = msgPayload.json.season;
      }
     
     
      const PCAPICall = new PlayCricketMatchListAPICall();

      PCAPICall.get_PlayCricketApiMatchList(seasonToImport).pipe(
        map((APIResp) => ({
          status: APIResp.status,
          statusText: APIResp.statusText,
          data: { season: seasonToImport, matches: APIResp.data.matches },
        }))
      ).subscribe(
        mlData => matchListDB.addMatchlist(mlData.data)
      );
      return null;
      }
      catch (error) {
        functions.logger.error(error);
        return null;
      }
    }
  )
