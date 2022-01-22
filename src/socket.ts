import {IFirstPackMessagesWithChatId, IMessage} from "./types";
import {setFirstPackMessagesAC, setNotificationAboutNewMessageAC} from "./components/Chat/ChatAC";

const userIdChat = sessionStorage.getItem('userId');
const chatToken = sessionStorage.getItem('chatToken');
const chatFingerprint = sessionStorage.getItem('chatFingerprint');


export const socket = new WebSocket(`ws://localhost:8080/${userIdChat}/${chatToken}/${chatFingerprint}`);

export const getActualMessages = (openChatId: number, firstMessagePackByChatId?: IMessage[]) => {

  const getActualMessages = {
    type: 'CHAT',
    transportMessage: {
      chatId: openChatId,
      getMessageRq: {
        type: "GET_FIRST_PACK"
      }
    }
  };

  socket.send(JSON.stringify(getActualMessages));

  const receivedMessages = firstMessagePackByChatId?.filter(el => el.status === 'RECEIVED');

  if (receivedMessages && receivedMessages.length > 0) {

    let resultId: number[] = [];

    receivedMessages.map(el => resultId.push(el.id));

    const deliveryMesssage = {
      type: 'CHAT',
      transportMessage: {
        chatId: openChatId,
        deliveryNotification: {
          ids: resultId
        }
      }
    };

    socket.send(JSON.stringify(deliveryMesssage));
  }
}

export const sendMessage = (openChatId: number, fromUserId: number, toUserId: number, message: string, firstMessagePackByChatId?: IMessage[]) => {
  const newMessage = {
    type: 'CHAT',
    transportMessage: {
      chatId: openChatId,
      message: {
        chatId: openChatId,
        fromId: fromUserId,
        toId: toUserId,
        type: "TEXT",
        content: message
      }
    }
  };

  socket.send(JSON.stringify(newMessage));

  getActualMessages(openChatId, firstMessagePackByChatId);
}

export const getPreviousMessages = (openChatId: number, firstPackMessages: IFirstPackMessagesWithChatId[],
                                    setFirstPackMessagesCallBack: Function, firstMessagePackByChatId?: IMessage[]) => {
  const getFirstMessage = {
    type: 'CHAT',
    transportMessage: {
      chatId: openChatId,
      getMessageRq: {
        type: "BEFORE_FIRST",
        specificId: firstPackMessages.find((el) => el.messages.chatId === openChatId)?.oldestMessagesId
      }
    }
  };

  socket.send(JSON.stringify(getFirstMessage));

  socket.onmessage = function (event) {
    const parseEvent = JSON.parse(event.data);
    if (parseEvent.transportMessage?.chatId && parseEvent.transportMessage?.messageAnswer) {
      setFirstPackMessagesCallBack(parseEvent.transportMessage);
    } else if (parseEvent.transportMessage?.chatId && parseEvent.transportMessage?.messageNotification) {
      getActualMessages(openChatId, firstMessagePackByChatId);
    }
  };
}

export const deleteMessage = (openChatId: number, messageId: number, firstMessagePackByChatId?: IMessage[]) => {
  const deleteMessage = {
    type: 'CHAT',
    transportMessage: {
      chatId: openChatId,
      deleteMessage: {
        type: "BY_IDS",
        ids: [messageId]
      }
    }
  };

  socket.send(JSON.stringify(deleteMessage));

  getActualMessages(openChatId, firstMessagePackByChatId);
}

export const deleteAllMessages = (openChatId: number, firstMessagePackByChatId?: IMessage[]) => {
  const deleteMessage = {
    type: 'CHAT',
    transportMessage: {
      chatId: openChatId,
      deleteMessage: {
        type: "ALL",
      }
    }
  };

  socket.send(JSON.stringify(deleteMessage));

  getActualMessages(openChatId, firstMessagePackByChatId);
}


export const getFirstMessages = (chatId: number | undefined, setFirstPackMessagesCallBack: Function,
                                 setNotificationAboutNewMessageCallBack: Function,
                                 setNotificationAboutNewVisitCallBack?: Function) => {
  const getFirstMessage = {
    type: 'CHAT',
    transportMessage: {
      chatId: chatId,
      getMessageRq: {
        type: "GET_FIRST_PACK"
      }
    }
  };

  socket.send(JSON.stringify(getFirstMessage));

  socket.onmessage = function (event) {
    const parseEvent = JSON.parse(event.data);

    if (parseEvent.transportMessage?.chatId && parseEvent.transportMessage?.messageAnswer) {
      setFirstPackMessagesCallBack(parseEvent.transportMessage);
    }

    else if (parseEvent.transportMessage?.chatId && parseEvent.transportMessage?.messageNotification) {
      setNotificationAboutNewMessageCallBack(true, parseEvent.transportMessage.chatId,
        parseEvent.transportMessage.messageNotification.senderId, parseEvent.transportMessage.messageNotification.messageId)
      socket.send(JSON.stringify(getFirstMessage));
    }
    else if (setNotificationAboutNewVisitCallBack && parseEvent.likeAction && parseEvent.type === 'ACTION_NOTIFICATION') {
      setNotificationAboutNewVisitCallBack(true, parseEvent.likeAction.fromUsr, parseEvent.likeAction.toUsr, parseEvent.likeAction.action)
      // socket.send(JSON.stringify(getFirstMessage));
    }
  };
}


export const setAction = (action: string, fromUsr: number, toUsr: number) => {
  const setVisitMessage = {
    type: 'ACTION_NOTIFICATION',
    likeAction: {
      fromUsr,
      toUsr,
      action
    }
  };
  socket.send(JSON.stringify(setVisitMessage));
}