import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import style from './MainPage.module.css';
import {
  getUserByIdWithAction,
  getUsersPostQuery,
  logoutGetQuery,
} from "../../api";
import {IState} from "../../types";
import {MatchSideBar} from "../Chat/MatchSideBar/MatchSideBar";
import {ChatRoom} from "../Chat/ChatRoom/ChatRoom";
import {
  setIsOpenChatRoom,
  setIsShowFalseForNotifications,
  setUserFiInLastNotification
} from "../Chat/ChatAC";
import UserCard from "../../parts/UserCard/UserCard";
import {
  DownCircleOutlined,
  HistoryOutlined,
  LogoutOutlined,
  MessageOutlined,
  UpCircleOutlined,
  UserOutlined
} from "@ant-design/icons";
import UserSettings from "../../parts/UserSettings/UserSettings";
import {sendNewMessage, startMessagesListening} from "../Chat/Chat.reducer";
import {notification} from "antd";
import {getDescriptionByAction, getNotificationTitleByAction} from "../../helpers";
import History from "../../parts/History/History";
import {deleteNotLikeUserAC, setHasAddedUserInHistory} from "./MainPageAC";

const MainPage = () => {

  const dispatch = useDispatch();

  const mainPage = useSelector((state: IState) => state.mainPage);
  const chat = useSelector((state: IState) => state.chat);

  const [chosenIndex, setChosenIndex] = useState(0);
  const [userIndex] = useState(0);
  const [isShowUserCardMobile, setIsShowUserCardMobile] = useState(false);
  const [isShowMatchSideBarMobile, setIsShowMatchSideBarMobile] = useState(false);

  const countUsers = mainPage.users.length;

  useEffect(() => {
    if (chosenIndex === 0 && countUsers === 0) {
      if (!mainPage.hasAddedUserInHistory) {
        dispatch(getUsersPostQuery());
      }
    }
  }, [dispatch, chosenIndex, countUsers, mainPage.hasAddedUserInHistory]);

  useEffect(() => {
    if (chat.isOpenChatRoom) {
      setChosenIndex(3);
      closeAnotherWindowMobile();
    }
  }, [chat.isOpenChatRoom, chat.toUserId, chat.userInChat]);

  useEffect(() => {
    //todo открывается канал
    if (sessionStorage.chatFingerprint) {
      const dateForChannel = {
        chatFingerprint: sessionStorage.chatFingerprint,
        chatToken: sessionStorage.chatToken,
        userId: sessionStorage.userId
      }
      dispatch(startMessagesListening(dateForChannel));
    }
    // eslint-disable-next-line
  }, [dispatch, sessionStorage.chatFingerprint]);

  const notificationContainer = document.getElementById("not-cont");

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

    const secondAction = () => {
      chat.actionNotifications?.forEach((el) => {
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

    chat.actionNotifications?.forEach((el) => {
      if (el?.isPrepareForShow === false) {
        if (el.chatId === chat.openChatId) {
          dispatch(sendNewMessage(getFirstMessage));
        }
        dispatch(getUserByIdWithAction(el.fromUsr, setUserFiInLastNotification, secondAction));
      }
    })
  }, [dispatch, chat.actionNotifications, chat.openChatId, notificationContainer]);

  const closeCard = () => {
    setChosenIndex(0);
    dispatch(setIsOpenChatRoom(false));
  }

  const changeChosenIndex = (index: number) => {
    setChosenIndex(index);
  }

  const changeShowUserCardMobile = () => {
    setChosenIndex(3);
    setIsShowUserCardMobile(prevState => !prevState);
    setIsShowMatchSideBarMobile(false);
    if (mainPage.hasAddedUserInHistory) {
      dispatch(deleteNotLikeUserAC());
    }
    dispatch(setHasAddedUserInHistory(false));
  }

  const changeShowMatchSideBarMobile = () => {
    dispatch(setIsOpenChatRoom(false));
    setChosenIndex(2);
    setIsShowMatchSideBarMobile(prevState => !prevState);
    setIsShowUserCardMobile(false);
    if (mainPage.hasAddedUserInHistory) {
      dispatch(deleteNotLikeUserAC());
    }
    dispatch(setHasAddedUserInHistory(false));
  }

  const closeAnotherWindowMobile = () => {
    setIsShowMatchSideBarMobile(false);
    setIsShowUserCardMobile(false);
  }

  const onClickLogout = () => {
    if (mainPage.hasAddedUserInHistory) {
      dispatch(deleteNotLikeUserAC());
    }
    dispatch(setHasAddedUserInHistory(false));
    dispatch(logoutGetQuery());
  }

  const changeShowUserSettings = () => {
    if (chosenIndex === 1) {
      setChosenIndex(0);
    } else {
      setChosenIndex(1);
    }
    closeAnotherWindowMobile();
    if (mainPage.hasAddedUserInHistory) {
      dispatch(deleteNotLikeUserAC());
    }
    dispatch(setHasAddedUserInHistory(false));
  }

  const changeShowHistory = () => {
    if (chosenIndex === 4) {
      setChosenIndex(0);
    } else {
      setChosenIndex(4);
    }
    closeAnotherWindowMobile();
    if (mainPage.hasAddedUserInHistory) {
      dispatch(deleteNotLikeUserAC());
    }
    dispatch(setHasAddedUserInHistory(false));
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
      {chosenIndex === 4 &&
      <div className={style.user_settings_wrapper}>
        <History changeChosenIndex={changeChosenIndex}/>
      </div>
      }
      <div className={style.mobile_footer}>
        {(!isShowMatchSideBarMobile && !chat.isOpenChatRoom) ?
          <UserOutlined style={{fontSize: '30px'}} onClick={changeShowUserSettings}/>
          :
          <div/>
        }
        {(!isShowMatchSideBarMobile && !chat.isOpenChatRoom) &&
        <HistoryOutlined style={{fontSize: '30px', color: 'green'}} onClick={changeShowHistory}/>
        }
        {!isShowMatchSideBarMobile ?
          <MessageOutlined style={{color: 'rgb(24, 144, 255)', fontSize: '30px'}}
                           onClick={changeShowMatchSideBarMobile}/> :
          <div/>
        }
        {(!isShowMatchSideBarMobile && chat.isOpenChatRoom) && <>
          {isShowUserCardMobile ?
            <DownCircleOutlined style={{color: 'rgb(96, 101, 232)', fontSize: '30px'}}
                                onClick={changeShowUserCardMobile}/>
            :
            <UpCircleOutlined style={{color: 'rgb(96, 101, 232)', fontSize: '30px'}}
                              onClick={changeShowUserCardMobile}/>
          }
        </>
        }
        <LogoutOutlined style={{color: 'rgb(232, 96, 144)', fontSize: '30px'}} onClick={onClickLogout}/>
      </div>
      <div className={style.side_bar_container}>
        <MatchSideBar closeAnotherWindowMobile={closeAnotherWindowMobile} changeChosenIndex={changeChosenIndex}/>
      </div>
      {chosenIndex === 0
      && <div className={style.main_field}>
        {mainPage.users[userIndex] &&
        <div className={style.card_wrapper}>
          <UserCard user={mainPage.users[userIndex]} isCurrentUser={false}
                    isShowButton={mainPage.users[userIndex].isUserFromLikeHistory}/>
        </div>
        }
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
};

export default MainPage;
