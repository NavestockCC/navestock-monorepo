
import * as functions from 'firebase-functions';
import { PubSub } from '@google-cloud/pubsub';

export const getPlayCricketMatchDetailPubSub = functions.pubsub
  .topic('PlayCricket_Match_List_Data')
  .onPublish((msgPayload) => {
    try {
      msgPayload.json
      functions.logger.info('getPlayCricketMatchDetailsPubSub: excution completed sucsesfully');
      functions.logger.info(msgPayload.json);
      return null;
    } catch (error) {
      functions.logger.error(`getPlayCricketMatchDetailsPubSub: excution error: ${error}`);   
      return null;
    }  
    
  });