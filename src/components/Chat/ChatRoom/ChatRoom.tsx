import {useDispatch, useSelector} from "react-redux";
import {IMessage, IPhotos, IState, IUserData} from "../../../types";
import React, {useEffect, useState} from "react";
import {
  setFirstPackMessagesAC, setUserMatchesAC,
} from "../ChatAC";
import {getUserById, getUserMatch} from "../../../api";
import style from './ChatRoom.module.css';
import {
  deleteAllMessages,
  deleteMessage,
  getActualMessages,
  getPreviousMessages,
  sendMessage
} from "../../../socket";
import UserCard from "../../../parts/UserCard/UserCard";
import {Button, Input} from "antd";
import {
  BackwardOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  FastForwardOutlined,
  StepBackwardOutlined
} from "@ant-design/icons";
import Message from "../../../parts/Message/Message";

type IProps = {
  closeWindow: VoidFunction
}

export const ChatRoom = ({
                           closeWindow
                         }: IProps) => {

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
    deleteMessage(chat.openChatId, e.currentTarget.dataset.messageId, firstMessagePackByChatId);
  }

  const onClickDeleteAllMessages = () => {
    deleteAllMessages(chat.openChatId, firstMessagePackByChatId);
  }

  const getLastMessageCallBack = () => {
    getActualMessages(chat.openChatId, firstMessagePackByChatId);
  }

  const currentPack = chat.firstPackMessages.find((el) => el.messages.chatId === chat.openChatId)?.messages.messageAnswer;
  const disableButtonGetNewMessage = currentPack?.length ? currentPack?.length < 10 : true;

  // const actionAfterTaeLike = () => {
  //   closeWindow();
  //   dispatch(getUserMatch('MATCH', setUserMatchesAC));
  // }

  return (
    <div className={style.container}>
      <div className={style.chat_wrapper}>

        <div className={style.chat_header}>
          {
            disableButtonGetNewMessage ?
              <BackwardOutlined style={{color: 'grey', fontSize: '29px'}} />:
              <BackwardOutlined style={{color: 'rgb(24, 144, 255)', fontSize: '29px'}} onClick={onClickGetPreviousMessages}/>
          }

          <FastForwardOutlined style={{color: 'rgb(24, 144, 255)', fontSize: '30px'}} onClick={getLastMessageCallBack}/>

          <DeleteOutlined style={{color: 'rgb(232,96,144)', fontSize: '30px'}} onClick={onClickDeleteAllMessages}/>
          <CloseCircleOutlined style={{color: 'rgb(96, 101, 232)', fontSize: '30px'}} onClick={closeWindow}/>
        </div>


        <div className={style.message_container}>


          {
            firstMessagePackByChatId?.map((el: IMessage) =>
                <Message message={el}
                         fromUserId={fromUserId}
                         userFirstName={chat.userInChat?.firstName}
                         onClickDeleteMessage={onClickDeleteMessage}
                         userPhoto={chat.userInChat?.card.photos[0]}/>
            )
          }


        </div>

        <Input.Group compact className={style.message_input_container}>
          <Input style={{width: 'calc(100% - 115px)'}} onChange={(e) => setMessage(e.currentTarget.value)}
                 value={message}/>
          <Button type="primary" className={style.submit_button} onClick={onClickSendMessage}>
            Отправить
          </Button>
        </Input.Group>

      </div>
      <div className={style.card_container}>
        {chat.userInChat &&
        <div className={style.card_wrapper}>
          <UserCard user={chat.userInChat} isCurrentUser={true} actionAfterTakeLike={closeWindow}/>
        </div>}
      </div>
    </div>
  )
}