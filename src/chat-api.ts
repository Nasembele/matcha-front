import {SubscriberType} from "./types";

// const userIdChat = sessionStorage.getItem('userId');
// const chatToken = sessionStorage.getItem('chatToken');
// const chatFingerprint = sessionStorage.getItem('chatFingerprint');

let subscribers = [] as SubscriberType[];

let wsChanel: WebSocket | null = null;

const closeHandler = () => {
  setTimeout(createChanel, 3000);
}

const messageHandler = (e: MessageEvent) => {
  const newMessage = JSON.parse(e.data);
  subscribers.forEach(s => s(newMessage));
}

const cleanUp = () => {
  wsChanel?.removeEventListener('close', closeHandler);
  wsChanel?.removeEventListener('message', messageHandler);
}

function createChanel(dateForChannel: any) {
  cleanUp();
  wsChanel?.close();
  wsChanel = new WebSocket(`ws://localhost:8080/${dateForChannel?.userId}/${dateForChannel?.chatToken}/${dateForChannel?.chatFingerprint}`);
  wsChanel.addEventListener('close', closeHandler);
  wsChanel.addEventListener('message', messageHandler);
}

export const chatAPI = {
  start(dateForChannel: any) {
    createChanel(dateForChannel);
  },
  stop() {
    subscribers = [];
    cleanUp();
    wsChanel?.close();
  },
  subscribe(callback: SubscriberType) {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter(s => s !== callback)
    }
  },
  unsubscribe(callback: SubscriberType) {
    subscribers = subscribers.filter(s => s !== callback)
  },
  // sendMessage(message: string) {
  //   wsChanel?.send(message)
  //
  // }
  sendMessage(message: string) {
    // debugger;
    if (wsChanel?.readyState === 1) {
      wsChanel?.send(message)
    } else {
      setTimeout(() => wsChanel?.send(message), 4500);
    }
  }
}