import * as functions from 'firebase-functions';
import { map } from 'rxjs';
import { Match } from '../../interfaces/matchlist.interface';
import { PlayCricketMatchListAPICall } from '../../services/PlayCricketAPICall';
import { MatchListImport } from "../services/matchImportDB.service";



export const getPlayCricketMatchDetailPubSub = functions.pubsub
  .topic('Match_Detail_Import')
  .onPublish((msgPayload) => {
    try {
        const MLI= new MatchListImport();
        const matchID = msgPayload.json;
        const PCAPICall = new PlayCricketMatchListAPICall();
 
        PCAPICall.getPlayCricketApiMatch_Detail(matchID.toString()).pipe(
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
          )
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