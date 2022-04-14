import {useDispatch, useSelector} from "react-redux";
import {IMessage, IState} from "../../../types";
import React, {useEffect, useState} from "react";
import {createChat, getUserById} from "../../../api";
import style from './ChatRoom.module.css';
import UserCard from "../../../parts/UserCard/UserCard";
import {Button, Input, Upload} from "antd";
import {
  BackwardOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  FastForwardOutlined,
  UploadOutlined
} from "@ant-design/icons";
import Message from "../../../parts/Message/Message";
import {MatchSideBar} from "../MatchSideBar/MatchSideBar";
import {sendNewMessage} from "../Chat.reducer";
import {actionDataForPhoto, englishLetter, forbiddenForChat, getBase64, russianLetter} from "../../../helpers";
import cc from "classnames";

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

  useEffect(() => {
    if (chat.toUserId) {
      dispatch(getUserById(chat.toUserId));
    }
  }, [dispatch, chat.toUserId]);

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
    const getFirstMessage = {
      type: 'CHAT',
      transportMessage: {
        chatId: chat.openChatId,
        getMessageRq: {
          type: "GET_FIRST_PACK"
        }
      }
    };
    dispatch(sendNewMessage(newMessage));
    dispatch(sendNewMessage(getFirstMessage));
    setMessage('');
  }

  const sendPhoto = (e: any) => {
    if (e.file?.status === 'done' &&
      (e.file?.type === 'image/png' || e.file?.type === 'image/tiff' || e.file?.type === 'image/psd'
        || e.file?.type === 'image/bmp' || e.file?.type === 'image/hdr'|| e.file?.type === 'image/jpeg'
        || e.file?.type === 'image/tga' || e.file?.type === 'image/webp' || e.file?.type === 'image/sgi' || e.file?.type === 'image/jpg')) {
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
          const getFirstMessage = {
            type: 'CHAT',
            transportMessage: {
              chatId: chat.openChatId,
              getMessageRq: {
                type: "GET_FIRST_PACK"
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
    const getFirstMessage = {
      type: 'CHAT',
      transportMessage: {
        chatId: chat.openChatId,
        getMessageRq: {
          type: "GET_FIRST_PACK"
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
    const getFirstMessage = {
      type: 'CHAT',
      transportMessage: {
        chatId: chat.openChatId,
        getMessageRq: {
          type: "GET_FIRST_PACK"
        }
      }
    };
    dispatch(sendNewMessage(deleteMessage));
    dispatch(sendNewMessage(getFirstMessage));
  }

  const getLastMessageCallBack = () => {
    const getFirstMessage = {
      type: 'CHAT',
      transportMessage: {
        chatId: chat.openChatId,
        getMessageRq: {
          type: "GET_FIRST_PACK"
        }
      }
    };
    dispatch(sendNewMessage(getFirstMessage));
  }

  const disableButtonGetNewMessage = !Boolean(chat.currentUserMessages?.oldestMessagesId);

  const setNewMessage = ({target: {value}}: any) => {
    if (value === '' || ((value.match(russianLetter) || value.match(englishLetter)) && !value.match(forbiddenForChat))) {
      setMessage(value)
    }
  }

  useEffect(() => {
    const getFirstMessage = {
      type: 'CHAT',
      transportMessage: {
        chatId: chat.openChatId,
        getMessageRq: {
          type: "GET_FIRST_PACK"
        }
      }
    };
    dispatch(sendNewMessage(getFirstMessage));
  }, [dispatch, chat.openChatId]);

  const onClickCreateChannel = () => {
    dispatch(createChat(chat.toUserId));
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
        <div className={cc(chat.openChatId === -1 && style.chat_one_button_header, style.chat_header)}>
          {chat.openChatId !== -1 &&
          <>
            {
              disableButtonGetNewMessage ?
                <BackwardOutlined style={{color: 'grey', fontSize: '29px'}}/> :
                <BackwardOutlined style={{color: 'rgb(24, 144, 255)', fontSize: '29px'}}
                                  onClick={onClickGetPreviousMessages}/>
            }
          </>}
          {chat.openChatId !== -1 &&
          <FastForwardOutlined style={{color: 'rgb(24, 144, 255)', fontSize: '30px'}}
                               onClick={getLastMessageCallBack}/>}
          {chat.openChatId !== -1 &&
          <DeleteOutlined style={{color: 'rgb(232,96,144)', fontSize: '30px'}} onClick={onClickDeleteAllMessages}/>}
          <CloseCircleOutlined style={{color: 'rgb(96, 101, 232)', fontSize: '30px'}} onClick={closeWindow}/>
        </div>
        <div className={cc(style.message_container, chat.openChatId === -1 && style.flex)}>
          {chat.openChatId === -1 ?
            <div className={style.chat_one_button_footer}>
              <Button type="primary" className={style.submit_button} onClick={onClickCreateChannel}>
                Открыть чат
              </Button>
            </div> :
            chat.currentUserMessages?.messages?.map((el: IMessage) => {
                let photo = chat.userInChat?.card.photos?.find(el => Number(el.number) === 6);
                if (!photo) {
                  photo = chat.userInChat?.card.photos[0]
                }
                return <Message key={el.id}
                                message={el}
                                fromUserId={fromUserId}
                                userFirstName={chat.userInChat?.firstName}
                                onClickDeleteMessage={onClickDeleteMessage}
                                userPhoto={photo}/>
              }
            )
          }
        </div>
        {chat.openChatId !== -1 &&
          <Input.Group compact className={style.message_input_container}>
            <Input style={{width: 'calc(100% - 135px)'}} onChange={setNewMessage}
                   value={message}/>
            <Upload
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
        }
      </div>
      }
      <div className={style.card_container}>
        {chat.userInChat &&
        <div className={style.card_wrapper}>
          <UserCard user={chat.userInChat} isCurrentUser={true} actionAfterTakeLike={closeWindow}/>
        </div>}
      </div>
    </div>
  )
}