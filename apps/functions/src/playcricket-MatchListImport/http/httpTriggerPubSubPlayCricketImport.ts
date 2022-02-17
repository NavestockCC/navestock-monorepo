/**
 * Navestock Firebase Function
 * @author Lefras Coetzee
 * @description Function to trigger Import of Play Crricket Data.
 * @description The function publishes {season: ??} to Match_List_Import PubSup topic
 * @description matchListImport Function subscribes to Match_List_Import. Will use the season data to start import of PlayCricket Data.
 *
 */

import * as functions from 'firebase-functions';
import { PubSub } from '@google-cloud/pubsub';


export const httpPublishPlayCricetSeasonToImport = functions
.runWith({ memory: '128MB', timeoutSeconds: 120 })
.https
.onRequest(
  async (req, res) => {
    try {
      // Retrieve data from season Param, then package to {JSON} message and push to buffer.
      if (req.query.season === undefined){
        const d = new Date();
        req.query.season = d.getFullYear().toString();
      }
      const seasonToImport = req.query.season;
      const data = JSON.stringify({ season: seasonToImport });
      const dataBuffer = Buffer.from(data);

      // Publish {season: ??} to PubSub Topic
      const topicName = 'Match_List_Import';
     // await createTopic(topicName);
      const pubSubClient = new PubSub();
      const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
      console.log(`Message ${messageId} published: ${data} to ${topicName}`);
      res.send(`Message ${messageId} published: ${data} to ${topicName}`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
      res.send(`Received error while publishing: ${error.message}`);
    }
  }
);