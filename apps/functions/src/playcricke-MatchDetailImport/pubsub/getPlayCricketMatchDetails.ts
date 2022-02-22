import { strictEqual } from 'assert';
import * as functions from 'firebase-functions';
import { map } from 'rxjs';
import {  stripHtml} from "string-strip-html";

import { Match } from '../../interfaces/matchlist.interface';
import { MatchInterfaceServices } from "../services/match.interface.services";
import { PlayCricketMatchListAPICall } from '../../services/PlayCricketAPICall';
import { MatchListImport } from "../services/matchImportDB.service";



export const getPlayCricketMatchDetailPubSub = functions.pubsub
  .topic('Match_Detail_Import')
  .onPublish((msgPayload) => {
    try {
        const MLI= new MatchListImport();
        const matchID = msgPayload.json;
        const PCAPICall = new PlayCricketMatchListAPICall();
        const matchInterfaceServices = new MatchInterfaceServices();
 
        PCAPICall.getPlayCricketApiMatch_Detail(matchID.toString()).pipe(
          // Map API response to Match interface
          map((APIResp) => 
              { const md = APIResp.data.match_details[0];
                const mdo = {};
                for (const [k, v] of Object.entries(md)) {
                  if(typeof v != 'object'){
                    if( v != undefined && v != ''){
                      mdo[k] = v;
                    }
                  }               
                }
                return mdo as Match}
          ),
          // Remove all HTM tags from match_notes
          map(mtchData => {

            if(mtchData.match_notes != undefined){
              mtchData.match_notes = stripHtml(mtchData.match_notes).result;
            }
            return mtchData as Match;
          }
          ),
          //Set Navestock and Opposition team attributes
          map(mtchData => {
            return matchInterfaceServices.setNavestockAndOppositionAttributes(mtchData)
          } ),
          //Set datefields to Firebase Timestamps
          map(mtchData => {
            if(mtchData.last_updated != undefined){
              mtchData.last_updated_timestamp = matchInterfaceServices.updateStringDateToFirebaseTimestamp(mtchData.last_updated);
            }
            if(mtchData.match_date != undefined){
              mtchData.match_date_timestamp = matchInterfaceServices.updateStringDateToFirebaseTimestamp(mtchData.match_date, mtchData.match_time);
            }
              return mtchData;
          } )          
        ).subscribe(
          mData => {
            MLI.updateMatchDetails(mData);
          }
        );

        return {function: 'getPlayCricketMatchDetailPubSub', status: 'success'}
    } catch (error) {
        functions.logger.warn(error)
        return {function: 'getPlayCricketMatchDetailPubSub', status: 'error'}
    }

    
  });