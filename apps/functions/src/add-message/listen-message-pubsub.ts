/**
 * Navestock Firebase Function
 * @author Lefras Coetzee
 * @description Test_Message.
 * 
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

import { PubSub } from "@google-cloud/pubsub";

export const listenHelloNavestock = functions.pubsub
    .topic('Test_Message')
    .onPublish(msgPayload => {
        if (msgPayload.json.msg === undefined) {
            console.error(new Error('E_getPCML_1: msg param not found'));
            return 'listenHelloNavestock_PubSub: excution ERROR!!!';
        } else {
                    // Crearte an instanse of Firestore
                    const afs = admin.firestore();
                    afs.collection('TEST').add(msgPayload.json);

        return 'listenHelloNavestock_PubSub: excution completed sucsesfully';
        }
    }
    )