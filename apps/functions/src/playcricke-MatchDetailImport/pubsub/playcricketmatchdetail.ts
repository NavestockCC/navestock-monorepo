
import * as functions from 'firebase-functions';
import { PubSub } from '@google-cloud/pubsub';

export const getPlayCricketMatchDetailPubSub = functions.pubsub
  .topic('PlayCricket_Match_List_Data')
  .onPublish((msgPayload) => {
    try {
        return 'getPlayCricketMatchDetailsPubSub: excution completed sucsesfully'; 
    } catch (error) {
        return `getPlayCricketMatchDetailsPubSub: excution error: ${error}`; 
    }  
    
  });