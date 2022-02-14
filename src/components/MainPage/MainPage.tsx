import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import style from './MainPage.module.css';
import {
  getUserById, getUserByIdWithAction,
  getUsersPostQuery,
  logoutGetQuery,
} from "../../api";
import {IState} from "../../types";
import {MatchSideBar} from "../Chat/MatchSideBar/MatchSideBar";
import {ChatRoom} from "../Chat/ChatRoom/ChatRoom";
import {
  setFirstPackMessagesAC,
  setIsOpenChatRoom, setIsShowFalseForNotifications,
  setNotificationAboutNewMessageAC,
  setNotificationAboutNewVisitAC, setUserFiInLastNotification
} from "../Chat/ChatAC";
import {getFirstMessages} from "../../socket";
import UserCard from "../../parts/UserCard/UserCard";
import {DownCircleOutlined, LogoutOutlined, MessageOutlined, UpCircleOutlined, UserOutlined} from "@ant-design/icons";
import UserSettings from "../../parts/UserSettings/UserSettings";
import cc from "classnames";
import {sendNewMessage, startMessagesListening} from "../Chat/Chat.reducer";
import {notification} from "antd";
import {getDescriptionByAction, getNotificationTitleByAction} from "../../helpers";

// export const socket = new WebSocket(`ws://localhost:8080/pul`);
// export const socket = new WebSocket(`ws://localhost:8080/${userIdChat}/${chatToken}/${chatFingerprint}`);

const MainPage = () => {

  const dispatch = useDispatch();

  const mainPage = useSelector((state: IState) => state.mainPage);
  const chat = useSelector((state: IState) => state.chat);

  const [chosenIndex, setChosenIndex] = useState(0);
  const [userIndex] = useState(0); //возможно просто задать 0?

  const [isShowUserCardMobile, setIsShowUserCardMobile] = useState(false);
  const [isShowMatchSideBarMobile, setIsShowMatchSideBarMobile] = useState(false);

  const [isShowUserSettings, setIsShowUserSettings] = useState(false);

  const countUsers = mainPage.users.length;

  useEffect(() => {
    if (chosenIndex === 0 && countUsers === 0) {
      dispatch(getUsersPostQuery());
    }
  }, [chosenIndex, countUsers]);

  useEffect(() => {
    if (chat.isOpenChatRoom) {
      setChosenIndex(3);
      closeAnotherWindowMobile();
    }
  }, [chat.isOpenChatRoom, chat.toUserId, chat.userInChat]);

  // useEffect(() => {
  //   const setFirstPackMessagesCallBack = (parseEvent: any) => dispatch(setFirstPackMessagesAC(parseEvent));
  //   const setNotificationAboutNewMessageCallBack = (hasNewMessage: boolean, chatId: number, senderId: number, messageId: number) =>
  //     dispatch(setNotificationAboutNewMessageAC(hasNewMessage, chatId, senderId, messageId));
  //   const setNotificationAboutNewVisitCallBack = (hasNewVisit: boolean, fromUsr: number, toUsr: number, action: string) =>
  //     dispatch(setNotificationAboutNewVisitAC(hasNewVisit, fromUsr, toUsr, action));
  //
  //   // chat.matches.map((el: IMatches) => {
  //   // if (el.chatId) {
  //   // return
  //   getFirstMessages(undefined, setFirstPackMessagesCallBack, setNotificationAboutNewMessageCallBack, setNotificationAboutNewVisitCallBack);
  //   // }
  //   // return ''
  //   // })
  // }, []);

  useEffect(() => {
    if (sessionStorage.chatFingerprint) {
      const dateForChannel = {
        chatFingerprint: sessionStorage.chatFingerprint,
        chatToken: sessionStorage.chatToken,
        userId: sessionStorage.userId
      }
      dispatch(startMessagesListening(dateForChannel));
    }
  }, [sessionStorage.length]);

  const getFirstMessage = {
    type: 'CHAT',
    transportMessage: {
      chatId: chat.openChatId,
      getMessageRq: {
        type: "GET_FIRST_PACK"
      }
    }
  };

  const notificationContainer = document.getElementById("not-cont");

  const secondAction = () => {
    chat.actionNotifications?.map((el) => {
      if (el?.isPrepareForShow && el?.isCanShow) {
        const title = getNotificationTitleByAction(el.action);
          const args = {
            message: title,
            description: getDescriptionByAction(el.action, el.fromUsrFI, title),
            duration: 0,
            getContainer: () => notificationContainer!,
            className: style.notification
          };
        notification.open(args);

          dispatch(setIsShowFalseForNotifications());
      }
    })
  }

  // if (width > 450) {
  //   notification.open(args);
  // } else {
  //   notification.open(args);
  // }

  useEffect(() => {
    chat.actionNotifications?.map((el) => {
      if (el?.isPrepareForShow === false) {
        if (el.chatId === chat.openChatId) {
          dispatch(sendNewMessage(getFirstMessage));
        }
        dispatch(getUserByIdWithAction(el.fromUsr, setUserFiInLastNotification, secondAction));
      }
    })
  }, [chat.actionNotifications]);

  const closeCard = () => {
    setChosenIndex(0);
    dispatch(setIsOpenChatRoom(false));
  }

  const changeShowUserCardMobile = () => {
    setChosenIndex(3);
    setIsShowUserCardMobile(prevState => !prevState);
    setIsShowMatchSideBarMobile(false);
    setIsShowUserSettings(false);
  }

  const changeShowMatchSideBarMobile = () => {
    dispatch(setIsOpenChatRoom(false));
    setChosenIndex(2);
    setIsShowMatchSideBarMobile(prevState => !prevState);
    setIsShowUserCardMobile(false);
    setIsShowUserSettings(false);
  }

  const closeAnotherWindowMobile = () => {
    setIsShowMatchSideBarMobile(false);
    setIsShowUserCardMobile(false);
  }

  const onClickLogout = () => {
    dispatch(logoutGetQuery());
  }

  const changeShowUserSettings = () => {
    if (chosenIndex === 1) {
      setChosenIndex(0);
    } else {
      setChosenIndex(1);
    }
    setIsShowUserSettings(prevState => !prevState);
    closeAnotherWindowMobile();
  }

  return (
    <div className={style.content_wrapper}>
      <div id="not-cont" className={style.not}>
      </div>
      {chosenIndex === 2 &&
      <MatchSideBar closeAnotherWindowMobile={closeAnotherWindowMobile}/>
      }
      {chosenIndex === 1 &&
      <div className={style.user_settings_wrapper}>
        <UserSettings/>
      </div>
      }

      <div className={style.mobile_footer}>

        {(!isShowMatchSideBarMobile && !chat.isOpenChatRoom) ?
          <UserOutlined style={{fontSize: '30px'}} onClick={changeShowUserSettings}/>
          :
          <div/>
        }

        {!isShowMatchSideBarMobile ?
          <MessageOutlined style={{color: 'rgb(24, 144, 255)', fontSize: '30px'}}
                           onClick={changeShowMatchSideBarMobile}/> :
          <div/>
        }
        {(!isShowMatchSideBarMobile && chat.isOpenChatRoom) ? <>
            {isShowUserCardMobile ?
              <DownCircleOutlined style={{color: 'rgb(96, 101, 232)', fontSize: '30px'}}
                                  onClick={changeShowUserCardMobile}/>
              :
              <UpCircleOutlined style={{color: 'rgb(96, 101, 232)', fontSize: '30px'}}
                                onClick={changeShowUserCardMobile}/>
            }
          </> :
          <div/>
        }

        <LogoutOutlined style={{color: 'rgb(232, 96, 144)', fontSize: '30px'}} onClick={onClickLogout}/>
      </div>

      <div className={style.side_bar_container}>
        <MatchSideBar closeAnotherWindowMobile={closeAnotherWindowMobile}/>
      </div>
      {chosenIndex === 0 && mainPage.users[userIndex]
      && <div className={style.main_field}>
        <div className={style.card_wrapper}>
          <UserCard user={mainPage.users[userIndex]} isCurrentUser={false}/>
        </div>
      </div>}
      {
        chosenIndex === 3 &&
        <div className={style.chat_room_container}>
          <ChatRoom closeWindow={closeCard}
                    isShowMatchSideBarMobile={isShowMatchSideBarMobile}
                    isShowUserCardMobile={isShowUserCardMobile}
                    closeAnotherWindowMobile={closeAnotherWindowMobile}/>
        </div>
      }
    </div>
  )
}

export default MainPage;
