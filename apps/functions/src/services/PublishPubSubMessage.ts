import { PubSub } from '@google-cloud`/pubsub';

export class PublishPubSubMessage {
  /**
   * publishPubSubMessage
   */
  public publishPubSubMessage(pubsubTopicName: string, messagedata: any) {
    //Add MatchList to PubSub: PlayCricket_Match_List_Data
    const pubSubClient = new PubSub();

    //createTopic('PlayCricket_Match_List_Data');
    const pubsubTopic = pubSubClient.topic(pubsubTopicName, {
      batching: {
        maxMessages: 500,
        maxMilliseconds: 5000,
      },
    });

    const dataBuffer = Buffer.from(JSON.stringify(messagedata));

    pubsubTopic.publish(dataBuffer, this.callback);
  }

  private callback(err:any, messageId: any): void {
    if (err) {
      console.error(err);
    }

    console.log(
      `PubSub Message ${messageId} published to topic PlayCricket_Match_List_Data`
    );
  }
}
