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
  // const [hasChangeTags, setHasChangeTags] = useState(false); //выключать при логауте
  const [userIndex, setUserIndex] = useState(0); //возможно просто задать 0?
  // const [isSaveChange, setIsSaveChange] = useState(false); //выключать при логауте
  const [isOpenFilter, setIsOpenFilter] = useState(false); //выключать при логауте

  const [isShowChangeBirthday, setIsShowChangeBirthday] = useState(false);
  const [isShowChangeEmail, setIsShowChangeEmail] = useState(false);
  const [isShowChangePass, setIsShowChangePass] = useState(false);

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

  const openAccountProperties = () => {
    // dispatch(setUserDataAC(userData));
    setChosenIndex(2);
    //   !hasGetUser && dispatch(getUserAccountGetQuery());
    // setHasGetUser(true);
  }

  const openUserFilter = () => {
    setIsOpenFilter(true);

  }

  const closeUserFilter = () => {
    setIsOpenFilter(false);

  }
  const setFilterAge = (parameter: string) => (e: any) => {
    if (parameter === 'start') {
      dispatch(setStartFilterAgeAC(Number(e.target.value)));
    }
    if (parameter === 'end') {
      dispatch(setEndFilterAgeAC(Number(e.target.value)));

    }
  }


  const setFilterRating = (e: any) => {
    dispatch(setFilterRatingAC(Number(e.target.value)));
  }
  const setFilterCommonTags = (e: any) => {
    dispatch(setFilterCommonTagsAC(Number(e.target.value)));
  }

  const setFilterLocation = (e: any) => {
    dispatch(setFilterLocationAC(e.target.value));
  }

  const closeAccountSetting = () => {
    setChosenIndex(0);
    dispatch(setIsOpenChatRoom(false));
  }

  // const changeOrient = (orient: any) => {
  //     dispatch(changeOrientAC(orient.target.value));
  // };

  const changeRegName = () => {
    // dispatch(changeOrientAC(orient.target.value));
  };

  // const changeEducation = (education: any) => {
  //   dispatch(changeEducationAC(education.target.value));
  // };
  //
  // const changeWorkPlace = (workPlace: any) => {
  //   dispatch(changeWorkPlaceAC(workPlace.target.value));
  // };
  //
  // const changePosition = (position: any) => {
  //   dispatch(changePositionAC(position.target.value));
  // };
  //
  // const changeBiography = (biography: any) => {
  //   dispatch(changeBiographyAC(biography.target.value));
  // };
  //
  // const changeTags = (tags: any) => {
  //   dispatch(changeTagsAC(tags.target.value));
  //   if (mainPage.account.card.tags?.length === 5) {
  //     setHasChangeTags(false)
  //   }
  // };
  //
  // const onClickChangeTags = () => {
  //   setHasChangeTags(true)
  //   dispatch(deleteTagsAC());
  // };
  //
  // const onClickSaveChangesAcc = () => {
  //   dispatch(saveChangeAccPostQuery(mainPage.account.card));
  //   setIsSaveChange(true);
  // };

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

  // const onClickLogout = () => {
  //   dispatch(logoutGetQuery());
  // }

  // const changeGender = (e: React.FormEvent<HTMLSelectElement>) => {
  //   dispatch(changeGenderAC(e.currentTarget.value));
  // };
  //
  // const changeSexualPreference = (e: React.FormEvent<HTMLSelectElement>) => {
  //   dispatch(changeSexualPreferenceAC(e.currentTarget.value));
  // };

  // const changePhoto = (number: number) => (e: any) => {
  //   dispatch(setPhotoParam(number, e.target.files[0].name, e.target.files[0].type));
  //   getBase64(e.target.files[0]).then(
  //     res => {
  //       dispatch(setPhotoContent(res, number));
  //       dispatch(changePhotoPostQuery(number, 'save'));
  //       // dispatch(authGetUserQuery()); TODO открыть когда заработает запрос
  //     }
  //   );
  // }
  // const deletePhoto = (number: number) => (e: any) => {
  //   dispatch(changePhotoPostQuery(number, 'delete'));
  //   dispatch(authGetUserQuery());
  // };

  const saveChangedFIO = () => {
    const newFio = `${mainPage.account.lastName} ${mainPage.account.firstName} ${mainPage.account.middleName}`;
    dispatch(updateAccountSettings("fio", newFio));
  }

  const saveChangedBirthday = () => {
    dispatch(updateAccountSettings("birthDate", mainPage.account.birthday));
  }

  // dispatch(changePhotoPostQuery(number));
//отправлять на сервер каждую фотку
//     обновлять всю инфу
  //сделать кнопук удаления каждой отдельной фотки и после этого обновлять инфу


  const changeFirstAccName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAccFirstNameAC(value));
  }

  const changeAccLastName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAccLastNameAC(value));
  }

  const changeAccMiddleName = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAccMiddleNameAC(value));
  }

  const changeAccBirthday = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAccBirthdayAC(value));
    dispatch(updateAccountSettings("birthDate", value));
  }

  const changeShowBirthday = () => {
    setIsShowChangeBirthday(true);
  }

  const changeAccEmail = () => {
    dispatch(changeAccEmailPostQuery());
    setIsShowChangeEmail(true);
  }

  const changeAccPass = () => {
    dispatch(changeAccPassPostQuery());
    setIsShowChangePass(true);
  }

  const getUsersByFilters = () => {
    //запрос на фильтры
    dispatch(setUserFilterPutQuery());
    // dispatch(getUsersPostQuery());
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
        {/*//todo*/}
{/*        {chosenIndex === 1 &&*/}
{/*        <div>*/}
{/*          <div className={style.button_acc} onClick={closeAccountSetting}>Выйти из настроек аккаунта</div>*/}
{/*          <div>*/}
{/*            <div className={style.content}>*/}
{/*              <div className={style.form_header}>Имя</div>*/}
{/*              <span>{mainPage.account.firstName}</span>*/}

{/*              <div className={style.form_header}>Отчество</div>*/}
{/*              <span>{mainPage.account.middleName}</span>*/}

{/*              <div className={style.form_header}>Фамилия</div>*/}
{/*              <span>{mainPage.account.lastName}</span>*/}

{/*              <div className={style.form_header}>Возраст</div>*/}
{/*              <span>{mainPage.account.yearsOld}</span>*/}

{/*              <div className={style.form_header}>Главное фото</div>*/}
{/*              {!mainPage.account.card.photos[0]?.content &&*/}
{/*              <input type="file" id="file" name="file" onChange={changePhoto(0)}/>}*/}

{/*              {mainPage.account.card.photos[0]?.content &&*/}
{/*              <span>*/}
{/*                <img height='100px'*/}
{/*                     src={`data:${mainPage.account.card.photos[0]?.format};base64,${mainPage.account.card.photos[0]?.content}`}*/}
{/*                     alt='фото 1'/>*/}
{/*                <div onClick={deletePhoto(0)}>Удалить фото</div>*/}

{/*                <div className={style.form_header}>Фото 2</div>*/}
{/*                {!mainPage.account.card.photos[1]?.content &&*/}
{/*                <input type="file" id="file" name="file" onChange={changePhoto(1)}/>}*/}
{/*              </span>*/}
{/*              }*/}

{/*              {mainPage.account.card.photos[1]?.content &&*/}
{/*              <span>*/}
{/*                            <img height='100px'*/}
{/*                                 src={`data:${mainPage.account.card.photos[1]?.format};base64,${mainPage.account.card.photos[1]?.content}`}*/}
{/*                                 alt='фото 2'/>*/}
{/*                <div onClick={deletePhoto(1)}>Удалить фото</div>*/}

{/*                            <div className={style.form_header}>Фото 3</div>*/}
{/*                {!mainPage.account.card.photos[2]?.content &&*/}
{/*                <input type="file" id="file" name="file" onChange={changePhoto(2)}/>}*/}
{/*                                  </span>}*/}

{/*              {mainPage.account.card.photos[2]?.content &&*/}
{/*              <span>*/}
{/*                            <img height='100px'*/}
{/*                                 src={`data:${mainPage.account.card.photos[2]?.format};base64,${mainPage.account.card.photos[2]?.content}`}*/}
{/*                                 alt='фото 3'/>*/}
{/*                <div onClick={deletePhoto(2)}>Удалить фото</div>*/}

{/*                            <div className={style.form_header}>Фото 4</div>*/}
{/*                {!mainPage.account.card.photos[3]?.content &&*/}
{/*                <input type="file" id="file" name="file" onChange={changePhoto(3)}/>}*/}
{/*</span>}*/}
{/*              {mainPage.account.card.photos[3]?.content &&*/}
{/*              <span>*/}
{/*                            <img height='100px'*/}
{/*                                 src={`data:${mainPage.account.card.photos[3]?.format};base64,${mainPage.account.card.photos[3]?.content}`}*/}
{/*                                 alt='фото 4'/>*/}
{/*                <div onClick={deletePhoto(3)}>Удалить фото</div>*/}

{/*                            <div className={style.form_header}>Фото 5</div>*/}
{/*                {!mainPage.account.card.photos[4]?.content &&*/}
{/*                <input type="file" id="file" name="file" onChange={changePhoto(4)}/>}*/}
{/*                                    </span>}*/}

{/*              {mainPage.account.card.photos[4]?.content &&*/}
{/*              <span>*/}
{/*                            <img height='100px'*/}
{/*                                 src={`data:${mainPage.account.card.photos[4]?.format};base64,${mainPage.account.card.photos[4]?.content}`}*/}
{/*                                 alt='фото 5'/>*/}
{/*                                <div onClick={deletePhoto(4)}>Удалить фото</div>*/}

{/*</span>}*/}
{/*              <div className={style.form_header}>Месторасположение</div>*/}
{/*              <span>{mainPage.account.location}</span>*/}

{/*              <div className={style.form_header}>Рейтинг</div>*/}
{/*              <span>{mainPage.account.card.rating}</span>*/}

{/*              <div className={style.form_header}>Пол</div>*/}
{/*              <select onChange={changeGender}>*/}
{/*                <option>{'Не выбрано'}</option>*/}
{/*                <option value={'male'} selected={mainPage.account.card.gender === 'male'}>{'M'}</option>*/}
{/*                <option value={'female'} selected={mainPage.account.card.gender === 'female'}>{'Ж'}</option>*/}
{/*              </select>*/}

{/*              <div className={style.form_header}>Сексуальные предпочтения</div>*/}
{/*              <select onChange={changeSexualPreference}>*/}
{/*                <option>{'Не выбрано'}</option>*/}
{/*                <option value={'getero'}*/}
{/*                        selected={mainPage.account.card.sexualPreference === 'getero'}>{'гетеро'}</option>*/}
{/*                <option value={'bisexual'}*/}
{/*                        selected={mainPage.account.card.sexualPreference === 'bisexual'}>{'би'}</option>*/}
{/*                {mainPage.account?.card?.gender === 'male' &&*/}
{/*                <option value={'gay'} selected={mainPage.account.card.sexualPreference === 'gay'}>{'гей'}</option>}*/}
{/*                {mainPage.account?.card?.gender === 'female' &&*/}
{/*                <option value={'lesbi'}*/}
{/*                        selected={mainPage.account.card.sexualPreference === 'lesbi'}>{'лесби'}</option>}*/}
{/*              </select>*/}

{/*              <div className={style.form_header}>Биография</div>*/}
{/*              <textarea onChange={changeBiography} className={style.form_input}*/}
{/*                        value={mainPage.account?.card?.biography}/>*/}

{/*              /!*<div className={style.form_header}>Фото</div>*!/*/}

{/*              <div className={style.form_header}>Образование</div>*/}
{/*              <textarea onChange={changeEducation} className={style.form_input}*/}
{/*                        value={mainPage.account?.card?.education}/>*/}


{/*              <div className={style.form_header}>Место работы</div>*/}
{/*              <textarea onChange={changeWorkPlace} className={style.form_input}*/}
{/*                        value={mainPage.account?.card?.workPlace}/>*/}


{/*              <div className={style.form_header}>Должность</div>*/}
{/*              <textarea onChange={changePosition} className={style.form_input}*/}
{/*                        value={mainPage.account?.card?.position}/>*/}


{/*              <div className={style.form_header}>Интересы</div>*/}
{/*              <div className={style.tags}>*/}
{/*                {hasChangeTags &&*/}
{/*                <select*/}
{/*                  onChange={changeTags} multiple={true} size={10}*/}
{/*                >*/}
{/*                  {tagsArray.map((item: string) => {*/}
{/*                    return <option key={item}>{item}</option>*/}
{/*                  })}*/}
{/*                </select>}*/}

{/*                <div>*/}
{/*                  {mainPage.account?.card?.tags?.map((item: string) => {*/}
{/*                    return <div>{item}</div>*/}
{/*                  })}*/}
{/*                </div>*/}
{/*              </div>*/}

{/*              {!hasChangeTags &&*/}
{/*              <button className={style.change_button} onClick={onClickChangeTags}>*/}
{/*                Изменить*/}
{/*              </button>}*/}
{/*              <div>*/}
{/*                <button onClick={onClickSaveChangesAcc}>*/}
{/*                  Сохранить*/}
{/*                </button>*/}
{/*              </div>*/}
{/*              {*/}
{/*                isSaveChange &&*/}
{/*                <div>Изменения сохранены</div>*/}
{/*              }*/}
{/*            </div>*/}
{/*          </div>*/}
{/*        </div>}*/}

        {chosenIndex === 2 &&
        <div>
          <div className={style.button_acc} onClick={closeAccountSetting}>Выйти из настроек аккаунта</div>
          <div>
            <div className={style.content}>

              <div className={style.form_header}>Имя</div>
              <input type={'text'} onChange={changeFirstAccName} className={style.form_input}
                     value={mainPage.account.firstName}/>

              <div className={style.form_header}>Отчество</div>
              <input type={'text'} onChange={changeAccMiddleName} className={style.form_input}
                     value={mainPage.account.middleName}/>


              <div className={style.form_header}>Фамилия</div>
              <input type={'text'} onChange={changeAccLastName} className={style.form_input}
                     value={mainPage.account.lastName}/>

              <button onClick={saveChangedFIO}>
                Сохранить изменения
              </button>

              <div className={style.form_header}>Дата рождения</div>

              <div>{mainPage.account.birthday}</div>

              {
                !isShowChangeBirthday &&
                <button onClick={changeShowBirthday}>
                  Поменять дату рождения
                </button>
              }
              {isShowChangeBirthday &&
              <input className={style.form_input} type={'date'}
                     onChange={changeAccBirthday}
                     value={mainPage.account.birthday}/>}

              {/*<button onClick={saveChangedBirthday}>*/}
              {/*  Сохранить изменения*/}
              {/*</button>*/}


              <div className={style.form_header}>e-mail</div>
              <button onClick={changeAccEmail}>
                Поменять email
              </button>
              {isShowChangeEmail &&
              <div>{'Перейдите по ссылке из почты'}</div>
              }
              {/*TODO change pass*/}

              <div className={style.form_header}>Пароль</div>
              <button onClick={changeAccPass}>
                Поменять пароль
              </button>
              {isShowChangePass &&
              <div>{'Перейдите по ссылке из почты'}</div>
              }

              {mainPage.changeAccountSetting.isValidPrevEmail &&
              <div>

              </div>
              }

              {/*<input className={style.form_input}*/}
              {/*       value={login.authData.email}/>*/}

            </div>
          </div>
        </div>}

        {chosenIndex === 0 &&
        // <div className={style.button_acc} onClick={openAccountSetting}>Аккаунт</div>
        // <div className={style.button_acc} onClick={openAccountProperties}>Настройки аккаунта</div>
        // <div className={style.button_acc} onClick={openUserFilter}>Фильтр</div>
        // {<div className={style.button_acc} onClick={closeUserFilter}>Закрыть фильтр</div>}

        // {isOpenFilter &&
        // <div>
        //   <div className={style.button_acc} onClick={closeUserFilter}>Закрыть фильтр</div>
        //   <div className={style.userFilter}>
        //     <p>Фильтр
        //     </p>
        //     <p>Возраст
        //       <div>От
        //         <input type='number' onChange={setFilterAge("start")} value={mainPage.userFilters.ageBy}/>
        //       </div>
        //       <div>До
        //         <input type='number' onChange={setFilterAge("end")} value={mainPage.userFilters.ageTo}/>
        //       </div>
        //     </p>
        //     <p>Рейтинг
        //       <div>
        //         <input type='number' onChange={setFilterRating} value={mainPage.userFilters.rating}/>
        //       </div>
        //     </p>
        //     <p>Количество общих интересов
        //       <div>
        //         <input type='number' onChange={setFilterCommonTags} value={mainPage.userFilters.commonTagsCount}/>
        //       </div>
        //     </p>
        //     <p>Месторасположение
        //       <div>
        //         <input type='text' onChange={setFilterLocation} value={mainPage.userFilters.location}/>
        //       </div>
        //     </p>
        //     <button onClick={getUsersByFilters}>Поиск</button>
        //   </div>
        // </div>
        // }
        mainPage.users[userIndex]
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
