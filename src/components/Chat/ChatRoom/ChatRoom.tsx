import {useDispatch, useSelector} from "react-redux";
import {IFirstPackMessagesWithChatId, IMatches, IMessage, IPhotos, IState} from "../../../types";
import {socket} from "../../MainPage/MainPage";
import React, {useEffect, useMemo, useState} from "react";
import {setFirstPackMessagesAC} from "../ChatAC";
import {getUserById} from "../../../api";
import style from './ChatRoom.module.css';

export const ChatRoom = () => {

  const dispatch = useDispatch();

  const chat = useSelector((state: IState) => state.chat);
  const fromUserId = useSelector((state: IState) => state.mainPage.account.id);

  const [message, setMessage] = useState('');

  const firstMessagePackByChatId = chat.firstPackMessages.find(el => el.messages.chatId === chat.openChatId)?.messages.messageAnswer;

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

  useEffect(() => {
    dispatch(getUserById(chat.toUserId));
  }, [chat.toUserId]);

  const sendMessage = () => {
    if (!message) return;

    const newMessage = {
      chatId: chat.openChatId,
      message: {
        chatId: chat.openChatId,
        fromId: fromUserId,
        toId: chat.toUserId,
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

  const getPreviousMessages = () => {
    const getFirstMessage = {
      chatId: chat.openChatId,
      getMessageRq: {
        type: "BEFORE_FIRST",
        specificId: chat.firstPackMessages.find((el) => el.messages.chatId === chat.openChatId)?.lastMessagesId
      }
    };

    socket.send(JSON.stringify(getFirstMessage));

    socket.onmessage = function (event) {
      dispatch(setFirstPackMessagesAC(JSON.parse(event.data)));
    };
  }

  return (
    <div className={style.container}>
      <div>
        <button onClick={getPreviousMessages}>
          Показать предыдущие сообщения
        </button>
        {
          firstMessagePackByChatId?.map((el: IMessage) => {
            return <div>
              <div>
                {el.fromId !== fromUserId &&
                  <div>
                    {
                      chat.userInChat?.card.photos[0] &&
                      <span>
                        <img height='40px'
                             src={`data:${chat.userInChat?.card.photos[0]?.format};base64,${chat.userInChat?.card.photos[0]?.content}`}
                             alt='фото'/>
                      </span>
                    }
                    {chat.userInChat?.firstName}
                  </div>
                }
              </div>
              <div className={el.fromId === fromUserId ? style.my_message : undefined}>
                {el.content}
              </div>
            </div>
          })
        }
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
       <div>
         <button onClick={sendMessage}>
          Отправить
         </button>
       </div>
      </div>
      <div>
          <span>
            <span>
              <div>{chat.userInChat?.firstName}</div>
              <div>{chat.userInChat?.middleName}</div>
              <div>{chat.userInChat?.lastName}</div>
              {chat.userInChat?.card.photos?.map((el: IPhotos) => {
                return el &&
                  <span>
                    <img height='100px' src={`data:${el.format};base64,${el.content}`} alt='фото'/>
                  </span>})
              }
              <div>{chat.userInChat?.card.rating}</div>
            </span>
            <span>
              <div>{chat.userInChat?.yearsOld}</div>
              <div>{chat.userInChat?.location}</div>
              <div>{chat.userInChat?.card.biography}</div>
              <div>{chat.userInChat?.card.workPlace}</div>
              <div>{chat.userInChat?.card.position}</div>
              <div>{chat.userInChat?.card.education}</div>
              <div>
                {chat.userInChat &&
                <div>
                  Интересы:
                  {chat.userInChat?.card.tags?.map((item: string) => {
                    return <div>{item}</div>
                  })}
                </div>}
                </div>
            </span>
          </span>
      </div>
    </div>
  )
}