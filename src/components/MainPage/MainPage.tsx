import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect, useState} from "react";
import style from './MainPage.module.css';

import {
  changeAccBirthdayAC,
  changeAccFirstNameAC, changeAccLastNameAC, changeAccMiddleNameAC,
  changeBiographyAC,
  changeEducationAC,
  changeGenderAC,
  changePositionAC,
  changeSexualPreferenceAC,
  changeTagsAC,
  changeWorkPlaceAC,
  deleteNotLikeUserAC,
  deleteTagsAC, setEndFilterAgeAC, setFilterCommonTagsAC, setFilterLocationAC, setFilterRatingAC,
  setLikeUserAC,
  setPhotoContent, setPhotoParam, setStartFilterAgeAC,
  setUserDataAC,
  setUsersAC
} from "./MainPageAC";
import {tagsArray} from "./MainPage.helpers";
import {
  authGetUserQuery, changeAccEmailPostQuery, changeAccPassPostQuery,
  changePhotoPostQuery, getUserMatch,
  getUsersPostQuery, likeUserPutQuery,
  logoutGetQuery,
  saveChangeAccPostQuery, setUserFilterPutQuery, setVisitUserPutQuery, updateAccountSettings
} from "../../api";
import {IChat, IMatches, IPhotos, IState} from "../../types";
import {
  changeRegBirthdayAC,
  changeRegFirstNameAC,
  changeRegGenderAC,
  changeRegLastNameAC, changeRegMiddleNameAC,
  changeRegSexualPreferenceAC
} from "../Login/LoginAC";
import ChangeAccountSettingsModalWindow
  from "./components/ChangeAccountSettingsModalWindow/ChangeAccountSettingsModalWindow";
import {MatchSideBar} from "../Chat/MatchSideBar/MatchSideBar";
import {ChatRoom} from "../Chat/ChatRoom/ChatRoom";
import {
  setFirstPackMessagesAC,
  setIsOpenChatRoom,
  setNotificationAboutNewMessageAC,
  setNotificationAboutNewVisitAC
} from "../Chat/ChatAC";
import {getFirstMessages, setAction} from "../../socket";
import {Button} from "@mui/material";
import UserCard from "../../parts/UserCard/UserCard";
import {DownCircleOutlined, LogoutOutlined, MessageOutlined, UpCircleOutlined} from "@ant-design/icons";

// const openChatCanal = (chat: IChat, userId: number) => {
//
//   //тут сделать обработку уведомлений
//
//
//   socket.onopen = function (e) {
//     alert("[open] Соединение установлено");
//
//     alert("Отправляем данные на сервер");
//
//     const dataMessage = {
//       chatId: 1,
//       message: {
//         chatId: "1",
//         fromId: "2",
//         toId: "98",
//         type: "TEXT",
//         content: "Hey lol!"
//       }
//     };
//
//     socket.send(JSON.stringify(dataMessage));
//
//     const message = {
//       chatId: 1,
//       getMessageRq: {
//         messageIds: [1, 2, 3],
//         type: "BY_IDS"
//       }
//     };
//
//     socket.send(JSON.stringify(message));
//
//     socket.onmessage = function (event) {
//       alert(`[message] Данные получены с сервера: ${event.data}`);
//     };
//     // JSON.parse(json)
//
//     const deleteMessage = {
//       chatId: 1,
//       deleteMessage: {
//         ids: [1, 2, 3],
//         type: "BY_IDS"
//       }
//     };
//
//     socket.send(JSON.stringify(deleteMessage));
//
//   };
// }
//
// export const sendMessage = () => {
//   alert("Отправляем данные на сервер");
//
//   const dataMessage = {
//     chatId: 1,
//     message: {
//       chatId: "1",
//       fromId: "2",
//       toId: "98",
//       type: "TEXT",
//       content: "Hey lol!"
//     }
//   };
//   //
//   socket.send(JSON.stringify(dataMessage));
//   //
//   // const message = {
//   //   chatId: 1,
//   //   getMessageRq: {
//   //     messageIds: [1, 2, 3],
//   //     type: "BY_IDS"
//   //   }
//   // };
//   //
//   // socket.send(JSON.stringify(message));
// }


// const getBase64 = (file: File) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       let encoded = reader.result!.toString().replace(/^data:(.*,)?/, '');
//       if ((encoded.length % 4) > 0) {
//         encoded += '='.repeat(4 - (encoded.length % 4));
//       }
//       resolve(encoded);
//     };
//     reader.onerror = error => reject(error);
//   });
// }

// const chat = useSelector((state: IState) => state.chat);
// const userId = useSelector((state: IState) => state.mainPage.use);
// const userIdChat = sessionStorage.getItem('userId');
// const chatToken = sessionStorage.getItem('chatToken');
// const chatFingerprint = sessionStorage.getItem('chatFingerprint');
//
// export const socket = new WebSocket(`ws://localhost:8080/chat/${userIdChat}/${chatToken}/${chatFingerprint}`); //TODO вписать id меня и чата и вынести вотдельный файл

const MainPage = (state: IState) => {

  const dispatch = useDispatch();

  const mainPage = useSelector((state: IState) => state.mainPage);
  const login = useSelector((state: IState) => state.login);
  const chat = useSelector((state: IState) => state.chat);

  const userId = mainPage.account.id;
  // const userData = useSelector((state: IState) => state.login.userData);

  const [chosenIndex, setChosenIndex] = useState(0);
  const [hasGetUser, setHasGetUser] = useState(false); //выключать при логауте
  const [userIndex, setUserIndex] = useState(0); //возможно просто задать 0?


  const [isShowUserCardMobile, setIsShowUserCardMobile] = useState(false);
  const [isShowMatchSideBarMobile, setIsShowMatchSideBarMobile] = useState(false);

  const countUsers = mainPage.users.length;

  useEffect(() => {
    if (chosenIndex === 0 && countUsers === 0) {
      dispatch(getUsersPostQuery());
    }
    // dispatch(getUsersPostQuery());


  }, [chosenIndex, countUsers]);

  useEffect(() => {
    if (chat.isOpenChatRoom === true) {
      setChosenIndex(3);
      closeAnotherWindowMobile();
    }
  }, [chat.isOpenChatRoom]);

  useEffect(() => {
    const setFirstPackMessagesCallBack = (parseEvent: any) => dispatch(setFirstPackMessagesAC(parseEvent));
    const setNotificationAboutNewMessageCallBack = (hasNewMessage: boolean, chatId: number, senderId: number, messageId: number) =>
      dispatch(setNotificationAboutNewMessageAC(hasNewMessage, chatId, senderId, messageId));
    const setNotificationAboutNewVisitCallBack = (hasNewVisit: boolean, fromUsr: number, toUsr: number, action: string) =>
      dispatch(setNotificationAboutNewVisitAC(hasNewVisit, fromUsr, toUsr, action));

    // chat.matches.map((el: IMatches) => {
    // if (el.chatId) {
    // return
    getFirstMessages(undefined, setFirstPackMessagesCallBack, setNotificationAboutNewMessageCallBack, setNotificationAboutNewVisitCallBack);
    // }
    // return ''
    // })
  }, []);


  // useEffect(() => { //TODO делать запрос пока матчи не кончатся
  //   dispatch(getUserMatch());
  // });

  // useEffect(() => {
  //   dispatch(getUsersPostQuery());
  // }, [mainPage.userFilters]);

  const openAccountSetting = () => {
    // dispatch(setUserDataAC(userData));
    setChosenIndex(1);
    //   !hasGetUser && dispatch(getUserAccountGetQuery());
    setHasGetUser(true);
  }

  const closeAccountSetting = () => {
    setChosenIndex(0);
    dispatch(setIsOpenChatRoom(false));
  }

  const onClickLikeUser = () => {
    dispatch(likeUserPutQuery(mainPage.users[userIndex]?.id, 'LIKE'));

    //TODO показывать если матч и передавать его в чат
    // dispatch(deleteNotLikeUserAC());
  };

  const onClickVisitUser = () => {
    const toUser = mainPage.users[userIndex]?.id;
    const fromUser = mainPage.account.id;

    dispatch(setVisitUserPutQuery(toUser));
    setAction('VISIT', fromUser, toUser);


    //TODO показывать если матч и передавать его в чат
    // dispatch(deleteNotLikeUserAC());
  };

  const onClickDisLikeUser = () => {
    dispatch(likeUserPutQuery(mainPage.users[userIndex]?.id, 'DISLIKE'));
    // dispatch(deleteNotLikeUserAC());
  };

  const onClickTakeLikeUser = () => {
    dispatch(likeUserPutQuery(mainPage.users[userIndex]?.id, 'TAKE_LIKE'));
    // dispatch(deleteNotLikeUserAC());
  };

  const onClickNotLikeUser = () => {
    dispatch(deleteNotLikeUserAC());
  }

  const saveChangedBirthday = () => {
    dispatch(updateAccountSettings("birthDate", mainPage.account.birthday));
  }

  const changeShowUserCardMobile = () => {
    setIsShowUserCardMobile(prevState => !prevState);
    setIsShowMatchSideBarMobile(false);
  }

  const changeShowMatchSideBarMobile = () => {
    setChosenIndex(3);
    setIsShowMatchSideBarMobile(prevState => !prevState);
    setIsShowUserCardMobile(false);
  }

  const closeAnotherWindowMobile = () => {
    setIsShowMatchSideBarMobile(false);
    setIsShowUserCardMobile(false);
  }


  const onClickLogout = () => {
    dispatch(logoutGetQuery());
  }

  return (
    <div className={style.content_wrapper}>
      {isShowMatchSideBarMobile && !isShowUserCardMobile && chosenIndex !== 3 &&
      <MatchSideBar closeAnotherWindowMobile={closeAnotherWindowMobile}/>
      }

      <div className={style.mobile_footer}>
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
        <div/>
        <LogoutOutlined style={{color: 'rgb(232, 96, 144)', fontSize: '30px'}} onClick={onClickLogout}/>
      </div>

      <div className={style.side_bar_container}>
        <MatchSideBar closeAnotherWindowMobile={closeAnotherWindowMobile}/>
      </div>
      <div className={style.main_field}>
        {chosenIndex !== 3 && mainPage.users[userIndex]
        && <div className={style.card_wrapper}>
          <UserCard user={mainPage.users[userIndex]} isCurrentUser={false}/>
        </div>}
        {
          chosenIndex === 3 &&
          <div className={style.chat_room_container}>
            <ChatRoom closeWindow={closeAccountSetting}
                      isShowMatchSideBarMobile={isShowMatchSideBarMobile}
                      isShowUserCardMobile={isShowUserCardMobile}
                      closeAnotherWindowMobile={closeAnotherWindowMobile}/>
          </div>
        }
      </div>
    </div>
  )
}

export default MainPage;
