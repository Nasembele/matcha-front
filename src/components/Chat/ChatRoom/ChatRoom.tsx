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
import {Button, Input, Upload} from "antd";
import {
  BackwardOutlined,
  CloseCircleOutlined,
  DeleteOutlined, DownCircleOutlined,
  FastForwardOutlined, MessageOutlined, PlusOutlined,
  StepBackwardOutlined,
  UpCircleOutlined, UploadOutlined
} from "@ant-design/icons";
import Message from "../../../parts/Message/Message";
import {MatchSideBar} from "../MatchSideBar/MatchSideBar";
import {sendNewMessage, startMessagesListening} from "../Chat.reducer";
import {actionDataForPhoto, forbiddenForText, getBase64, russianLetter} from "../../../helpers";

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

  const firstMessagePackByChatId = ['d'];//chat.firstPackMessages.find(el => el.messages.chatId === chat.openChatId)?.messages.messageAnswer;

  const getFirstMessage = {
    type: 'CHAT',
    transportMessage: {
      chatId: chat.openChatId,
      getMessageRq: {
        type: "GET_FIRST_PACK"
      }
    }
  };

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
    const newMessage = {
      type: 'CHAT',
      transportMessage: {
        chatId: chat.openChatId,
        message: {
          chatId: chat.openChatId,
          fromId: fromUserId,
          toId: chat.toUserId,
          type: "TEXT",
          content: message
        }
      }
    };
    // sendMessage(chat.openChatId, fromUserId, chat.toUserId, message, firstMessagePackByChatId); //todo
    dispatch(sendNewMessage(newMessage));
    dispatch(sendNewMessage(getFirstMessage));
    setMessage('');
  }

  const sendPhoto = (e: any) => {
    if (e.file?.status === 'done' &&
      (e.file?.type === 'image/jpeg' || e.file?.type === 'image/png' || e.file?.type === 'image/jpg')) {
      getBase64(e.file.originFileObj).then(
        res => {

          const newMessage = {
            type: 'CHAT',
            transportMessage: {
              chatId: chat.openChatId,
              message: {
                chatId: chat.openChatId,
                fromId: fromUserId,
                toId: chat.toUserId,
                type: "IMAGE",
                typeInfo: e.file.type,
                content: res
              }
            }
          };
          dispatch(sendNewMessage(newMessage));
          dispatch(sendNewMessage(getFirstMessage));
        }
      );
    }
  }

  const onClickGetPreviousMessages = () => {
    const getPreviousMessages = {
      type: 'CHAT',
      transportMessage: {
        chatId: chat.openChatId,
        getMessageRq: {
          type: "BEFORE_FIRST",
          specificId: chat.currentUserMessages?.oldestMessagesId
        }
      }
    };
    dispatch(sendNewMessage(getPreviousMessages));
  }

  const onClickDeleteMessage = (e: any) => {
    const deleteMessage = {
      type: 'CHAT',
      transportMessage: {
        chatId: chat.openChatId,
        deleteMessage: {
          type: "BY_IDS",
          ids: [e.currentTarget.dataset.messageId]
        }
      }
    };

    dispatch(sendNewMessage(deleteMessage));
    dispatch(sendNewMessage(getFirstMessage));
  }

  const onClickDeleteAllMessages = () => {
    const deleteMessage = {
      type: 'CHAT',
      transportMessage: {
        chatId: chat.openChatId,
        deleteMessage: {
          type: "ALL",
        }
      }
    };

    dispatch(sendNewMessage(deleteMessage));
    dispatch(sendNewMessage(getFirstMessage));
  }

  const getLastMessageCallBack = () => {
    dispatch(sendNewMessage(getFirstMessage));
  }

  // const currentPack = chat.firstPackMessages.find((el) => el.messages.chatId === chat.openChatId)?.messages.messageAnswer; todo
  const disableButtonGetNewMessage = !Boolean(chat.currentUserMessages?.oldestMessagesId);

  // const actionAfterTaeLike = () => {
  //   closeWindow();
  //   dispatch(getUserMatch('MATCH', setUserMatchesAC));
  // }

  // const closeAnotherWindowMobile = () => {
  //   setIsShowMatchSideBarMobile(false);
  //   setIsShowUserCardMobile(false);
  // }

  useEffect(() => { //todo
    dispatch(sendNewMessage(getFirstMessage));
  }, [chat.openChatId]);

  const setNewMessage = ({target: {value}}: any) => {
    if (value === '' || (value.match(russianLetter) && !value.match(forbiddenForText))) {
      setMessage(value)
    }
  }

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
            chat.currentUserMessages?.messages?.map((el: IMessage) =>
              <Message key={el.id}
                       message={el}
                       fromUserId={fromUserId}
                       userFirstName={chat.userInChat?.firstName}
                       onClickDeleteMessage={onClickDeleteMessage}
                       userPhoto={chat.userInChat?.card.photos[0]}/>
            )
          }


        </div>

        <Input.Group compact className={style.message_input_container}>
          <Input style={{width: 'calc(100% - 135px)'}} onChange={setNewMessage}
                 value={message}/>
          <Upload
            // name="avatar"
            // listType="picture-card"
            // className="avatar-uploader"
            showUploadList={false}
            action={actionDataForPhoto}
            onChange={sendPhoto}
          >
            <Button icon={<UploadOutlined/>}/>
          </Upload>
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