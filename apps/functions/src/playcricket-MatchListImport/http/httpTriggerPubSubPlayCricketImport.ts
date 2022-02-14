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

/* FIXME: cert for authentication in Pubsub
import * as navestockCert from '../../environments/navestock-website-04b2617e4f2a';

const credentialsData = {
  projectId: navestockCert.firebaseAuthData.project_id,
  credentials: {
    private_key: navestockCert.firebaseAuthData.private_key,
    client_email: navestockCert.firebaseAuthData.client_email,
  },
};
*/
export const httpPublishPlayCricetSeasonToImport = functions
.runWith({ memory: '128MB', timeoutSeconds: 120 })
.https
.onRequest(
  async (req, res) => {
    try {
      // Retrieve data from season Param, then package to {JSON} message and push to buffer.
      if (req.query.season === undefined)
        throw new Error('API call status : season param not found');
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

//FIXME: Remove create topic
async function createTopic(topicName: string) {
    // Creates a new topic
    try{
        const pubSubClient = new PubSub();
        await pubSubClient.createTopic(topicName,);
        console.log(`Topic ${topicName} created.`);
    } catch (err) {
        console.log(err);
    }
   
  }