import {IFirstPackMessagesWithChatId, IMessage} from "./types";
import {setFirstPackMessagesAC, setNotificationAboutNewMessageAC} from "./components/Chat/ChatAC";

const userIdChat = sessionStorage.getItem('userId');
const chatToken = sessionStorage.getItem('chatToken');
const chatFingerprint = sessionStorage.getItem('chatFingerprint');


export const socket = new WebSocket(`ws://localhost:8080/chat/${userIdChat}/${chatToken}/${chatFingerprint}`);

export const getActualMessages = (openChatId: number, firstMessagePackByChatId?: IMessage[]) => {

  const getActualMessages = {
    chatId: openChatId,
    getMessageRq: {
      type: "GET_FIRST_PACK"
    }
  };

  socket.send(JSON.stringify(getActualMessages));

  const receivedMessages = firstMessagePackByChatId?.filter(el => el.status === 'RECEIVED');

  if (receivedMessages && receivedMessages.length > 0) {

    let resultId: number[] = [];

    receivedMessages.map(el => resultId.push(el.id));

    const deliveryMesssage = {
      chatId: openChatId,
      deliveryNotification: {
        ids: resultId
      }
    };

    socket.send(JSON.stringify(deliveryMesssage));
  }
}

export const sendMessage = (openChatId: number, fromUserId: number, toUserId: number, message: string, firstMessagePackByChatId?: IMessage[]) => {
  const newMessage = {
    chatId: openChatId,
    message: {
      chatId: openChatId,
      fromId: fromUserId,
      toId: toUserId,
      type: "TEXT",
      content: message
    }
  };

  socket.send(JSON.stringify(newMessage));

  getActualMessages(openChatId, firstMessagePackByChatId);
}

export const getPreviousMessages = (openChatId: number, firstPackMessages: IFirstPackMessagesWithChatId[],
                                    setFirstPackMessagesCallBack: Function, firstMessagePackByChatId?: IMessage[]) => {
  const getFirstMessage = {
    chatId: openChatId,
    getMessageRq: {
      type: "BEFORE_FIRST",
      specificId: firstPackMessages.find((el) => el.messages.chatId === openChatId)?.oldestMessagesId
    }
  };

  socket.send(JSON.stringify(getFirstMessage));

  socket.onmessage = function (event) {
    const parseEvent = JSON.parse(event.data);
    if (parseEvent.chatId && parseEvent.messageAnswer) {
      setFirstPackMessagesCallBack(parseEvent);
    } else if (parseEvent.chatId && parseEvent.messageNotification) {
      getActualMessages(openChatId, firstMessagePackByChatId);
    }
  };
}

export const deleteMessage = (openChatId: number, messageId: number, firstMessagePackByChatId?: IMessage[]) => {
  const deleteMessage = {
    chatId: openChatId,
    deleteMessage: {
      type: "BY_IDS",
      ids: [messageId]
    }
  };

  socket.send(JSON.stringify(deleteMessage));

  getActualMessages(openChatId, firstMessagePackByChatId);
}

export const deleteAllMessages = (openChatId: number, firstMessagePackByChatId?: IMessage[]) => {
  const deleteMessage = {
    chatId: openChatId,
    deleteMessage: {
      type: "ALL",
    }
  };

  socket.send(JSON.stringify(deleteMessage));

  getActualMessages(openChatId, firstMessagePackByChatId);
}


export const getFirstMessages = (chatId: number, setFirstPackMessagesCallBack: Function,
                                 setNotificationAboutNewMessageCallBack: Function) => {
  const getFirstMessage = {
    chatId: chatId,
    getMessageRq: {
      type: "GET_FIRST_PACK"
    }
  };

  socket.send(JSON.stringify(getFirstMessage));

  socket.onmessage = function (event) {
    const parseEvent = JSON.parse(event.data);
    if (parseEvent.chatId && parseEvent.messageAnswer) {
      setFirstPackMessagesCallBack(parseEvent);
    } else if (parseEvent.chatId && parseEvent.messageNotification) {
      setNotificationAboutNewMessageCallBack(true, parseEvent.chatId, parseEvent.messageNotification.senderId);
      socket.send(JSON.stringify(getFirstMessage));
    }
  };
}