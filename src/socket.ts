import {IMessage} from "./types";

const userIdChat = sessionStorage.getItem('userId');
const chatToken = sessionStorage.getItem('chatToken');
const chatFingerprint = sessionStorage.getItem('chatFingerprint');


export const socket = new WebSocket(`ws://localhost:8080/chat/${userIdChat}/${chatToken}/${chatFingerprint}`); //TODO вписать id меня и чата и вынести вотдельный файл

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
