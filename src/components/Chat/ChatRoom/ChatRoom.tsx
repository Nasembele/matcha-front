import {useDispatch, useSelector} from "react-redux";
import {IMessage, IPhotos, IState} from "../../../types";
import React, {useEffect, useState} from "react";
import {
  setFirstPackMessagesAC,
} from "../ChatAC";
import {getUserById} from "../../../api";
import style from './ChatRoom.module.css';
import {
  deleteAllMessages,
  deleteMessage,
  getActualMessages,
  getPreviousMessages,
  sendMessage
} from "../../../socket";

export const ChatRoom = () => {

  const dispatch = useDispatch();

  const chat = useSelector((state: IState) => state.chat);
  const fromUserId = useSelector((state: IState) => state.mainPage.account.id);

  const [message, setMessage] = useState('');

  const firstMessagePackByChatId = chat.firstPackMessages.find(el => el.messages.chatId === chat.openChatId)?.messages.messageAnswer;

  useEffect(() => {
    dispatch(getUserById(chat.toUserId));
  }, [chat.toUserId]);

  const onClickSendMessage = () => {
    if (!message) return;
    sendMessage(chat.openChatId, fromUserId, chat.toUserId, message, firstMessagePackByChatId);
    setMessage('');
  }

  const onClickGetPreviousMessages = () => {
    const setFirstPackMessagesCallBack = (parseEvent: any) => dispatch(setFirstPackMessagesAC(parseEvent));
    getPreviousMessages(chat.openChatId, chat.firstPackMessages, setFirstPackMessagesCallBack, firstMessagePackByChatId);
  }

  const onClickDeleteMessage = (e: any) => {
    deleteMessage(chat.openChatId, e.target.dataset.messageId, firstMessagePackByChatId);
  }

  const onClickDeleteAllMessages = () => {
    deleteAllMessages(chat.openChatId, firstMessagePackByChatId);
  }

  const getLastMessageCallBack = () => {
    getActualMessages(chat.openChatId, firstMessagePackByChatId);
  }

  const currentPack = chat.firstPackMessages.find((el) => el.messages.chatId === chat.openChatId)?.messages.messageAnswer;
  const disableButtonGetNewMessage = currentPack?.length ? currentPack?.length < 10 : true;

  return (
    <div className={style.container}>
      <div>
        <button onClick={onClickGetPreviousMessages}
                disabled={disableButtonGetNewMessage}>
          Показать предыдущие сообщения
        </button>
        <button onClick={getLastMessageCallBack}>
          К новым сообщениям
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
              <div onClick={onClickDeleteMessage}
                   data-message-id={el.id}>
                Delete
              </div>
            </div>
          })
        }
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        <div>
          <button onClick={onClickSendMessage}>
            Отправить
          </button>
        </div>
        <div onClick={onClickDeleteAllMessages}>
          Удалить всю переписку
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
                  </span>
              })
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