import { PubSub } from '@google-cloud/pubsub';
import * as navestockCert from '../environments/navestock-website-04b2617e4f2a';

const credentialsData = {
  projectId: navestockCert.firebaseAuthData.project_id,
  credentials: {
    private_key: navestockCert.firebaseAuthData.private_key,
    client_email: navestockCert.firebaseAuthData.client_email,
  },
};

export class AddMessagePubSub {
  public publishMessageData(msgToPublish: string): void {
    const topicName = 'Test_Message';
    const data = JSON.stringify({
      msg: 'Hello Navestock Pubsub: ' + msgToPublish,
    });

    // Creates a client; cache this for further use
    const pubSubClient = new PubSub();

    async function publishMessage() {
      // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
      const dataBuffer = Buffer.from(data);

      try {
        // await pubSubClient.createTopic(topicName);
        const messageId = await pubSubClient
          .topic(topicName)
          .publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
      } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
      }
    }
  }
}

/**     
        const pubSubClient = new PubSub(credentialsData);
        const pubsubTopic = pubSubClient.topic('Test_Messaging', {
            batching: {
              maxMessages: 500,
              maxMilliseconds: 5000,
            }
          });

          const dataBuffer = Buffer.from('Hello Navestock from PubSub');
                    pubsubTopic.publish(dataBuffer)
                        .then(
                            pubSubPublisgResponse => {
                                console.log(`PubSub Message ${pubSubPublisgResponse} published to topic Test_Messaging.`);
                            })
                        .catch(
                            err => console.error(new Error('Test_Messaging_1: PubSub Message Publish: ' + err))
                        );
 */
