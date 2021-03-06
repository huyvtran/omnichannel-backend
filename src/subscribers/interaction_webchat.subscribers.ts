import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { EventsGateway } from "../sockets/events.gateway";

//ENTITY
import { InteractionWebchat } from "../entity/interaction_webchat.entity";
@EventSubscriber()
export class InteractionWebchatSubscriber
  implements EntitySubscriberInterface<InteractionWebchat> {
  constructor(
    connection: Connection,
    private readonly eventsGateway: EventsGateway
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return InteractionWebchat;
  }

  afterInsert(event: InsertEvent<InteractionWebchat>) {
    if (event.metadata.targetName !== "InteractionWebchat") {
      return;
    }
    const username = event.entity.agentUsername;
    if (username) {
      this.eventsGateway.sendData(
        `agent:${username}`,
        "newInteractionWebchat",
        event.entity
      );
    }
  }

  afterUpdate(event: UpdateEvent<InteractionWebchat>) {
    if (event.metadata.targetName !== "InteractionWebchat") {
      return;
    }
    const { agentUsername } = event.entity;
    const data = {
      id: event.entity.id,
      sessionId: event.entity.sessionId,
      sendDate: event.entity.sendDate,
      sendStatus: event.entity.sendStatus,
      agentUsername: agentUsername,
      systemMessage: event.entity.systemMessage,
    };

    this.eventsGateway.sendData(
      `agent:${agentUsername}`,
      "updateStatusMessage",
      data
    );
  }
}
