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
  DeleteOutlined, DownCircleOutlined,
  FastForwardOutlined, MessageOutlined,
  StepBackwardOutlined,
  UpCircleOutlined
} from "@ant-design/icons";
import Message from "../../../parts/Message/Message";
import {MatchSideBar} from "../MatchSideBar/MatchSideBar";

type IProps = {
  closeWindow: VoidFunction,
  isShowMatchSideBarMobile: boolean,
  isShowUserCardMobile: boolean,
  closeAnotherWindowMobile: VoidFunction

}

export const ChatRoom = ({
                           closeWindow,
                           isShowMatchSideBarMobile,
                           isShowUserCardMobile,
                           closeAnotherWindowMobile
                         }: IProps) => {

  const dispatch = useDispatch();

  const chat = useSelector((state: IState) => state.chat);
  const fromUserId = useSelector((state: IState) => state.mainPage.account.id);

  const [message, setMessage] = useState('');
  // const [isShowUserCardMobile, setIsShowUserCardMobile] = useState(false);
  // const [isShowMatchSideBarMobile, setIsShowMatchSideBarMobile] = useState(false);

  const firstMessagePackByChatId = chat.firstPackMessages.find(el => el.messages.chatId === chat.openChatId)?.messages.messageAnswer;

  useEffect(() => {
    if (chat.toUserId) {
      dispatch(getUserById(chat.toUserId));
    }
  }, [chat.toUserId]);

  // const changeShowUserCardMobile = () => {
  //   setIsShowUserCardMobile(prevState => !prevState);
  //   setIsShowMatchSideBarMobile(false);
  // }
  //
  // const changeShowMatchSideBarMobile = () => {
  //   setIsShowMatchSideBarMobile(prevState => !prevState);
  //   setIsShowUserCardMobile(false);
  // }

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

  // const closeAnotherWindowMobile = () => {
  //   setIsShowMatchSideBarMobile(false);
  //   setIsShowUserCardMobile(false);
  // }

  return (
    <div className={style.container}>
      {isShowMatchSideBarMobile && !isShowUserCardMobile &&
      <div className={style.card_container_mobile}>
        <MatchSideBar closeAnotherWindowMobile={closeAnotherWindowMobile}/>
      </div>
      }

      {isShowUserCardMobile && !isShowMatchSideBarMobile &&
      <div className={style.card_container_mobile}>
        <div className={style.card_wrapper}>
          <UserCard user={chat.userInChat!} isCurrentUser={true} actionAfterTakeLike={closeWindow}/>
        </div>
      </div>
      }
      {!isShowUserCardMobile && !isShowMatchSideBarMobile &&
      <div className={style.chat_wrapper}>

        <div className={style.chat_header}>
          {
            disableButtonGetNewMessage ?
              <BackwardOutlined style={{color: 'grey', fontSize: '29px'}}/> :
              <BackwardOutlined style={{color: 'rgb(24, 144, 255)', fontSize: '29px'}}
                                onClick={onClickGetPreviousMessages}/>
          }

          <FastForwardOutlined style={{color: 'rgb(24, 144, 255)', fontSize: '30px'}}
                               onClick={getLastMessageCallBack}/>

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
      }
      {/*<div className={style.mobile_footer}>*/}
      {/*  <MessageOutlined style={{color: 'rgb(24, 144, 255)', fontSize: '30px'}} onClick={changeShowMatchSideBarMobile}/>*/}
      {/*  {isShowUserCardMobile ?*/}
      {/*    <DownCircleOutlined style={{color: 'rgb(96, 101, 232)', fontSize: '30px'}} onClick={changeShowUserCardMobile}/>*/}
      {/*    :*/}
      {/*    <UpCircleOutlined style={{color: 'rgb(96, 101, 232)', fontSize: '30px'}} onClick={changeShowUserCardMobile}/>*/}
      {/*  }*/}
      {/*</div>*/}

      <div className={style.card_container}>
        {chat.userInChat &&
        <div className={style.card_wrapper}>
          <UserCard user={chat.userInChat} isCurrentUser={true} actionAfterTakeLike={closeWindow}/>
        </div>}
      </div>
    </div>
  )
}