import {useDispatch, useSelector} from "react-redux";
import {IFirstPackMessagesWithChatId, IMatches, IMessage, IState} from "../../../types";
import {socket} from "../../MainPage/MainPage";
import {useEffect, useMemo, useState} from "react";
import {setFirstPackMessagesAC} from "../ChatAC";

export const ChatRoom = () => {

  const dispatch = useDispatch();

  const chat = useSelector((state: IState) => state.chat);

  const firstMessagePackByChatId =  chat.firstPackMessages.find(el => el.messages.chatId === chat.openChatId)?.messages.messageAnswer;

  // let socket = new WebSocket(`ws://localhost:8080/chat/2/${chat.chatToken}/${chat.chatFingerprint}`); //TODO вписать id меня и чата и вынести вотдельный файл

  // socket.onopen = function (e) {
  //   alert("[open] Соединение установлено");
  //   alert("Отправляем данные на сервер");
  //   // socket.send("Меня зовут Джон");
  //
  //   const dataMessage = {
  //     message: {
  //       chatId: "1",
  //       fromId: "2",
  //       toId: "100",
  //       type: "TEXT",
  //       content: "Hey lol!"
  //     }
  //   };
  //
  //   socket.send(JSON.stringify(dataMessage));
  //
  //   const message = {
  //     getMessageRq: {
  //       messageIds: [127, 129, 130, 131],
  //       type: "BY_IDS"
  //     }
  //   };
  //
  //   socket.send(JSON.stringify(message));
  //
  //   // JSON.parse(json)
  // };


  // socket.onmessage = function (event) {
  //   alert(`[message] Данные получены с сервера: ${event.data}`);
  // };

  // socket.onclose = function(event) {
  //   if (event.wasClean) {
  //     alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  //   } else {
  //     // например, сервер убил процесс или сеть недоступна
  //     // обычно в этом случае event.code 1006
  //     alert('[close] Соединение прервано');
  //   }
  // };

  // socket.onerror = function (error) {
  //   alert(`[error] ${error}`);
  // };

  // socket.onopen = function (e) {
  //   alert("[open] Соединение установлено");

    // alert("Отправляем данные на сервер");

    // const dataMessage = {
    //   chatId: 1,
    //   message: {
    //     chatId: "1",
    //     fromId: "2",
    //     toId: "98",
    //     type: "TEXT",
    //     content: "Hey kek!"
    //   }
    // };

    // socket.send(JSON.stringify(dataMessage));

    // const message = {
    //   chatId: 1,
    //   getMessageRq: {
    //     messageIds: [1, 2, 3],
    //     type: "BY_IDS"
    //   }
    // };
    //
    // socket.send(JSON.stringify(message));

  // const getFirstMessage = {
  //   chatId: 1,
  //   getMessageRq: {
  //     type: "GET_FIRST_PACK"
  //   }
  // };
  //
  // socket.send(JSON.stringify(getFirstMessage));
  //
  //   socket.onmessage = function (event) {
  //     alert(`[message] Данные получены с сервера: ${event.data}`);
  //   };
    // JSON.parse(json)

    // const deleteMessage = {
    //   chatId: 1,
    //   deleteMessage: {
    //     ids: [1, 2, 3],
    //     type: "BY_IDS"
    //   }
    // };
    //
    // socket.send(JSON.stringify(deleteMessage));

  // };

  const [message, setMessage] = useState('');


  const sendMessage = () => {
    if (!message) return;

    const newMessage = { //todo тут вставить переменные
      chatId: chat.openChatId,
      message: {
        chatId: chat.openChatId,
        fromId: '2',
        toId: "100",
        type: "TEXT",
        content: message
      }
    };

    socket.send(JSON.stringify(newMessage));

    const getFirstMessage = {
      chatId: chat.openChatId,
      getMessageRq: {
        type: "GET_FIRST_PACK"
      }
    };

    socket.send(JSON.stringify(getFirstMessage));

    socket.onmessage = function (event) {
      dispatch(setFirstPackMessagesAC(JSON.parse(event.data)));
    };

    setMessage('');
  }

  return (
    <div>
      {
        firstMessagePackByChatId?.map((el: IMessage) => {
          return <div>
            {el.fromId}
            {el.content}
            {el.toId}
          </div>
        })
      }
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
      <button onClick={sendMessage}>
        Отправить
      </button>
    </div>
  )
}