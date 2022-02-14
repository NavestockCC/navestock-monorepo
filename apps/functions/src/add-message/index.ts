import * as functions from 'firebase-functions';
import {AddMessage} from './add-message';
import { AddMessagePubSub } from './add-message-pubsub';

export const helloNavestock = functions.https.onRequest(async (req, res) => {
    const msgToPublish = req.query.m;
    const addMsg = new AddMessage();
    const addMsgPubsub = new AddMessagePubSub();
    addMsgPubsub.publishMessageData(msgToPublish.toString());
    res.send("Hello Navestock: " + msgToPublish);
})