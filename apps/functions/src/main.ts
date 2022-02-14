import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**  
 * Import:Test message functions 
 * */
import * as AddMessage from './add-message';
import * as ListenMessagePubSub from './add-message/listen-message-pubsub';

/**  
 * Import: PlayCricket Match List Import Functions
 * */
import * as HttpTriggerPlayCricetImport from './playcricket-MatchListImport/http/httpTriggerPubSubPlayCricketImport'
import * as GetPlayCricketMatchListPubSub from './playcricket-MatchListImport/pubsub/getPlayCricketMatchList';

/**  
 * Import: PlayCricket Match Detail Import Functions
 * */
import * as GetPlayCricketMatchDetailPubSub from './playcricke-MatchDetailImport/pubsub/playcricketmatchdetail';

//  Start writing Firebase Functions
//  https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  });

/** 
 *  Test message functions 
 * */
export const addMessage = AddMessage.helloNavestock;
export const addMessagePubSub = ListenMessagePubSub.listenHelloNavestock;

/** 
 * PlayCricket MatchList Import Functions : Import matchlist from PlayCricket API 
 * */
export const httpTriggerPlayCricetImport = HttpTriggerPlayCricetImport.httpPublishPlayCricetSeasonToImport;
export const getPlayCricketMatchListPubSub = GetPlayCricketMatchListPubSub.getPlayCricketMatchListPubSub;

/** 
 * PlayCricket Match Detail Import Functions 
 * */
export const getPlayCricketMatchDetailPubSub = GetPlayCricketMatchDetailPubSub.getPlayCricketMatchDetailPubSub;