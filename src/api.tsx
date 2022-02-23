import axios from "axios";
import {
  deleteNotLikeUserAC,
  setChangePassAC, setConfirmNewEmailAC, setIsValidLinkAC,
  setLikeUserAC, setMatchCurrentUserAC,
  setUserAccountAC,
  setUserDataAC, setUserFiltersAC,
  setUsersAC, setUserStatus, setValidNewEmailAC,
  setValidPrevEmailAC
} from "./components/MainPage/MainPageAC";
import {IAuthData, IChat, IPhotos, IRegData, IState, IUserCard, IUserData, IUserFilter} from "./types";
import {Dispatch} from "redux";
import {
  changeLoginAC, changePasswordAC,
  setIsAuthUserAC,
  setIsAuthUserDataAC,
  setIsRegUserAC,
  setIsValidEmailResetUserAC, setIsValidLinkResetUserAC, setIsValidPassResetUserAC
} from "./components/Login/LoginAC";
import {setServerErrorAC} from "./components/ErrorWrapper/ErrorWrapperAC";
import {prepareDateToSendServer} from "./helpers";
import {ChangeEvent} from "react";
import {
  closeOpenChatRoom,
  setChatTokenAC,
  setIsOpenChatRoom,
  setUserInChatAC,
  setUserLikesAC,
  setUserMatchesAC
} from "./components/Chat/ChatAC";
import {useSelector} from "react-redux";
import {chatAPI} from "./chat-api";
import {setAction} from "./components/Chat/Chat.reducer";

// const userId = sessionStorage.getItem('userId');
// const chatToken = sessionStorage.getItem('chatToken');
// const chatFingerprint = sessionStorage.getItem('chatFingerprint');
//
// console.log(userId);
// console.log(chatToken);
// console.log(chatToken);

// let socket = new WebSocket(`ws://localhost:8080/chat/${userId}/${chatToken}/${chatFingerprint}`); //TODO вписать id меня и чата и вынести вотдельный файл

// let socket = new WebSocket(`ws://localhost:8080/chat/2/12`); //TODO вписать id меня и чата и вынести вотдельный файл

const instance = axios.create(
  {
    withCredentials: true,
    baseURL: `http://localhost:8080`,
    // headers: {
    //    // "API-KEY":  '8cf7dc5c-b03e-40ad-81de-b8c8ff761cb4'
    //
    // }

  }

// fetch('http://localhost:8080/registration', {
//     method: 'POST',
//     body: JSON.stringify({})
// })
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(e => console.log(e))
)


export const usersAPI = {

  authGetUser() {
    return instance.get('getauthuser')
  },

  signIn(isAuthData: IAuthData) {
    return instance.post('login', isAuthData)
  },

  recoveryPassword(email: Object) {
    return instance.post('resetpassend', email)
  },

  resetPassword(resetPass: Object) {
    return instance.post('resetpasschange', resetPass)
  },

  createAccount(regData: IRegData) {
    return instance.post('registration', regData)
  },
  logout() {
    return instance.get('logout')
  },
  validateResetLink(currentURL: string) {
    return instance.get(currentURL)
  },
  validateLinkGetQuery(currentURL: string) {
    return instance.get(currentURL)
  },

  //
  // getAccount() {
  //     return instance.get('account')
  // },

  saveAccountChanges(newCard: any) {
    return instance.post('main/account?act=card', newCard)
  },

  changePhoto(photoObj: any) {
    return instance.post('main/account?act=photo', photoObj)
  },

  getUsers() {
    return instance.get('main?act=getList')
  },

  setFilters(filters: IUserFilter) {
      return instance.put('main', filters)
  },

  likeUser(data: any) {
    return instance.put(`main/like`, data)
  },

  updateAccSettings(data: Object) {
    return instance.put(`main/accountsettings`, data)
  },

  changeEmail(data: Object) {
    return instance.post(`main/accountsettings`, data)
  },

  changePass(data: Object) {
    return instance.post(`passchange`, data)
  },

  saveNewEmailAccSettings(data: Object) {
    return instance.post(`main/accountsettings?act=emailNewRqSend`, data)
  },

  confirmNewEmailAccSettings(data: Object) {
    return instance.put(`main/accountsettings`, data)
  },

  saveNewPasswordPutQuery(data: Object) {
    return instance.put(`passchange`, data)
  },

  getUserMatchGetQuery(action: string, lastId?: number) { //todo
    return lastId ? instance.get(`main?act=getActions&action=${action}&after=${lastId}`)
      : instance.get(`main?act=getActions&action=${action}`)
  },

  createChatPutQuery(data: Object) {
    return instance.put(`main/chatcreate`, data);
  },

  getChatTokenGetQuery() {
    return instance.get(`main/token`);
    },

  getUserByIdGetQuery(userId: number) {
    return instance.get(`main/getuser?id=${userId}`);
  },

  getUserStatus(userId: number) {
    return instance.post(`/main/getstatus`, {ids: [userId]}); //todo status
  }

  // fetch('http://localhost:8080/registration', {
  // method: 'POST',
  //     body: JSON.stringify({})
  // })
  // .then(res => res.json())
  // .then(res => console.log(res))
  // .catch(e => console.log(e));

  // createAccount(registration) {
  //     return instance.post(`follow/${userId}`)
  // },

  // getUsers  (currentPage = 1, pageSize = 10)  {

  //     return (instance.get(`users?page=${currentPage}&count=${pageSize}`,
  //     ))
  //         .then(response => {
  //             return response.data;
  //         });
  // },
  // follow (userId) {
  //     return  instance.post(`follow/${userId}`)
  // },
  // unfollow (userId) {
  //     return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
  // },
  // getProfile(userId) {
  //     return instance.get(`profile/` + userId)
  // }
}

// fetch('http://localhost:8080/registration', {
// method: 'POST',
//     body: JSON.stringify({})
// })
// .then(res => res.json())
// .then(res => console.log(res))
// .catch(e => console.log(e));

export const authGetUserQuery = () => (dispatch: any, getState: any) => {
  usersAPI.authGetUser()
    // fetch('http://localhost:8080/getauthuser', {
    //     method: 'GET',
    //     body: JSON.stringify({})
    // })
    .then((res: any) => {
      // debugger;

      if (res.data === 'Error JWT') { //поправить на новый лад?
        // debugger;
        dispatch(setIsAuthUserAC(false));
        // добавить ошибку error jwt
      } else {



        dispatch(setIsAuthUserAC(true));
        // dispatch(setIsAuthUserDataAC(res.data));
        dispatch(setUserDataAC(res.data));
        dispatch(setUserFiltersAC(res.data.filter));
        dispatch(getUserMatch('MATCH', setUserMatchesAC));
        dispatch(getChatToken());
      }
      // dispatch(setIsAuthAC(true));
    })
    .catch(() => {
      console.log('error');
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
      // dispatch(setIsAuthUserAC(true));//todo потом убрать
    });
}

export const signInPostQuery = (isAuthData: IAuthData) => (dispatch: any, getState: any) => {
  usersAPI.signIn(isAuthData)
    .then((res: any) => {
      // debugger;
      if (res.data !== 'INVALID LOGIN OR PASSWORD') { //поправить на новый лад?
        // добавить ошибку error jwt
        // dispatch(setIsAuthUserDataAC(res.data));

        const userId = getState().mainPage.account.userId;
        const chatToken = getState().chat.chatToken;
        const chatFingerprint = getState().chat.chatFingerprint;

        // const myStorage = window.localStorage;
        // sessionStorage.setItem('userId', userId);
        // sessionStorage.setItem('chatToken', chatToken);
        // sessionStorage.setItem('chatFingerprint', chatFingerprint);


        dispatch(setUserDataAC(res.data));
        dispatch(setUserFiltersAC(res.data.filter));
        dispatch(setIsAuthUserAC(true));
        dispatch(getUserMatch('MATCH', setUserMatchesAC));
        dispatch(getChatToken());
      }
      // dispatch(setIsAuthUserDataAC(res));
      // dispatch(setIsAuthUserAC(true));

    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
      // dispatch(setIsAuthUserAC(true)); //todo потом убрать

    });
}


export const recoveryPasswordPostQuery = (email: Object) => (dispatch: Dispatch) => {
  usersAPI.recoveryPassword(email) //валидация на успешный ответ и на появление сообщения
    .then((res: any) => {
      if (res.data === 'SUCCESS') { //поправить на новый лад?
        dispatch(setIsValidEmailResetUserAC(true));
      }
      dispatch(setIsValidEmailResetUserAC(false));

    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const resetPasswordPostQuery = (resetPass: Object) => (dispatch: Dispatch) => {
  usersAPI.resetPassword(resetPass)
    .then((res: any) => {
      if (res.data === 'SUCCESS') { //поправить на новый лад?
        dispatch(setIsValidPassResetUserAC(true));
      }
      if (res.data === 'NEW PASS NOT DIFFERENT BY OLD') { //поправить на новый лад?
        dispatch(setIsValidPassResetUserAC('old_pass'));
      }
      dispatch(setIsValidPassResetUserAC(false));

    }) //валидация на успешный ответ и на появление сообщения
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
      dispatch(setIsValidPassResetUserAC(false));
    });
}

export const updateRegDataPostQuery = (regData: IRegData) => (dispatch: Dispatch) => {
  usersAPI.createAccount(regData)
    .then((res: any) => {
      if (res.data === 'SUCCESS') { //поправить на новый лад?
        dispatch(setIsRegUserAC(true));
      }
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
      // dispatch(setIsRegUserAC(true)); //todo потом убрать
    });
}

export const logoutGetQuery = () => (dispatch: Dispatch) => {
  usersAPI.logout()
    .then((res: any) => {
      // if (res.data === 'SUCCESS') { //поправить на новый лад?
      //     dispatch(setIsRegUserAC(true));
      // }
      dispatch(changeLoginAC(''));
      dispatch(changePasswordAC(''));
      dispatch(setIsAuthUserAC(false)); //TODO почистить в редаксе логин и пароль
      sessionStorage.clear();
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
      // dispatch(setIsRegUserAC(true)); //todo потом убрать
    });
}

export const validateResetLinkGetQuery = (currentURL: string) => (dispatch: Dispatch) => {
  currentURL = 'http://localhost:8080' + currentURL.substr(21);
  usersAPI.validateResetLink(currentURL)
    .then((res: any) => {
      if (res.data === 'SUCCESS') { //поправить на новый лад?
        dispatch(setIsValidLinkResetUserAC(true));
      }
      dispatch(setIsValidLinkResetUserAC(true)); //false
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
      dispatch(setIsValidLinkResetUserAC(false));
      // dispatch(setIsRegUserAC(true)); //todo потом убрать
    });
}

export const validateLink = (currentURL: string) => (dispatch: Dispatch) => {
  currentURL = 'http://localhost:8080' + currentURL.substr(21);
  usersAPI.validateLinkGetQuery(currentURL)
    .then((res: any) => {
      if (res.data === 'SUCCESS') { //поправить на новый лад?
        dispatch(setIsValidLinkAC(true));
      } else {
        dispatch(setIsValidLinkAC(false)); //false
      }
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
      dispatch(setIsValidLinkAC(false)); //false
      // dispatch(setIsRegUserAC(true)); //todo потом убрать
    });
}

//
// export const getUserAccountGetQuery = () => (dispatch) => {
//     usersAPI.getAccount()
//         .then(response => {
//             dispatch(setUserAccountAC(response));
//         }) //валидация на успешный ответ и на появление сообщения
//         .catch(() => {});
// }

export const saveChangeAccPostQuery = (newCard: IUserCard) => (dispatch: Dispatch) => {
  const prepareNewCard = {
    biography: newCard.biography || '',
    workPlace: newCard.workPlace || '',
    position: newCard.position || '',
    education: newCard.education || '',
    gender: newCard.gender || 'male',
    sexualPreference: newCard.sexualPreference || 'getero',
    tags: newCard.tags || [],
    // photos: [{
    //   ...newCard.photos[0],
    //   action: 'save'
    // }]
    // photos: newCard.photos || []
  }
  usersAPI.saveAccountChanges(prepareNewCard)
    .then((res: any) => {
      // dispatch(setUserAccountAC(response));
    }) //валидация на успешный ответ
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху

    });
}

export const changePhotoPostQuery = (number: number, action: 'save' | 'delete') => (dispatch: Dispatch, getState: any) => {
  const photoObj = getState().mainPage.account?.card?.photos[number];
  if (action) {
    photoObj.action = action;
  }
  usersAPI.changePhoto([photoObj])
    .then((res: any) => {
      // dispatch(setUserAccountAC(response));
    }) //валидация на успешный ответ
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const getUsersPostQuery = () => (dispatch: Dispatch, getState: any) => {
  // const filter = getState().mainPage.userFilters;
  usersAPI.getUsers()
    .then((res: any) => {
      dispatch(setUsersAC(res.data));
      // dispatch(setUserFiltersAC(res.data[0].filter));
    }) //валидация на успешный ответ
    .catch(() => {
      dispatch(setServerErrorAC(true));
    });
}

export const setUserFilterPutQuery = () => (dispatch: any, getState: any) => {
  const filter = getState().mainPage.userFilters;
  usersAPI.setFilters(filter)
    .then(res => {
//todo сюда засунуть запрос
      dispatch(getUsersPostQuery());
      // return dispatch(getUsersPostQuery());
    }) //валидация на успешный ответ
    .catch(() => {
      dispatch(setServerErrorAC(true));
    });
}

// export const getUsersGetQuery = () => (dispatch) => {
//     usersAPI.getUsers()
//         .then(response => {
//             dispatch(setUsersAC(response));
//         })
//         .catch(() => {});
// }
//
export const likeUserPutQuery = (userId: number, action: string) => (dispatch: any, getState: any) => {
  const myId = getState().mainPage.account.id;

  const data = {
    "toUsr": userId,
    "action": action,
    'fromUsr': myId
  }
  usersAPI.likeUser(data)
    .then((response: any) => { //валидация?
      // dispatch(setLikeUserAC()); TODO тут подумать!!!

      if (action === 'LIKE') {
        dispatch(getUserMatch('LIKE', setUserLikesAC));
      }

      if (action === 'BLOCK') {
        dispatch(getUserMatch('MATCH', setUserMatchesAC));
        dispatch(closeOpenChatRoom());
      }

      if (response.data === 'MATCH') {
        dispatch(setMatchCurrentUserAC());
        dispatch(getUserMatch('MATCH', setUserMatchesAC));
        dispatch(setAction('MATCH', myId, userId));
      } else {
        dispatch(deleteNotLikeUserAC());
      }
      if (action === 'DISLIKE' || response.data === 'MATCH') {
        return;
      }
      if (action === 'TAKE_LIKE') {
        dispatch(getUserMatch('MATCH', setUserMatchesAC));
      }
      dispatch(setAction(action, myId, userId));


    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const changeAccEmailPostQuery = () => (dispatch: Dispatch) => {
  const data = {"act": "emailRqSend"};

  usersAPI.changeEmail(data)
    .then((response: any) => { //валидация?
      // if (response === 'SUCCESS') {
      //   dispatch(setValidPrevEmailAC(true));
      // } else {
      //   dispatch(setValidPrevEmailAC(false));
      // }
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const changeAccPassPostQuery = (userEmail?: string) => (dispatch: Dispatch, getState: any) => {
  const email = getState().mainPage.account.email;
  const emailReq = email ? email : userEmail;
  const data = {"email": emailReq};

  usersAPI.changePass(data)
    .then((response: any) => { //валидация?
      // if (response === 'SUCCESS') {
      //   dispatch(setValidPrevEmailAC(true));
      // } else {
      //   dispatch(setValidPrevEmailAC(false));
      // }
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const updateAccountSettings = (field: string, value: string) => (dispatch: Dispatch, getState: any) => {
  const userId = getState().mainPage.account.id;
  let data;
  switch (field) {
    case "fio":
      data = {
        id: userId,
        field: field,
        fio: value,
      };
      break;
    case "birthDate":
    default:
      data = {
        id: userId,
        field: field,
        birthDate: prepareDateToSendServer(value),
      };
      break;
  }
  usersAPI.updateAccSettings(data)
    .then(response => { //валидация?
      // dispatch(setLikeUserAC());
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const saveNewEmail = (id: string, linkId: string, token: string,) => (dispatch: Dispatch, getState: any) => {
  const changeAccountSetting = getState().mainPage.changeAccountSetting;

  const data = {
    id: id,
    token: token,
    linkId: linkId,
    email: changeAccountSetting.newEmail,
    act: "emailNewRqSend",
  };

  usersAPI.saveNewEmailAccSettings(data)
    .then((response: any) => { //валидация?
      if (response.data === 'SUCCESS') {
        dispatch(setValidNewEmailAC(true));
      } else {
        dispatch(setValidNewEmailAC(false));
      }
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const confirmNewEmail = (id: string, linkId: string, token: string, email: string) => (dispatch: Dispatch, getState: any) => {

  const data = {
    id: id,
    token: token,
    linkId: linkId,
    email: email,
    // act: "emailNewRqSend",
    field: 'email',
  };

  usersAPI.confirmNewEmailAccSettings(data)
    .then((response: any) => { //валидация?
      if (response.data === 'SUCCESS') {
        dispatch(setConfirmNewEmailAC(true));
      } else {
        dispatch(setConfirmNewEmailAC(false));
      }
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const saveNewPassword = (id: string, linkId: string, token: string, pass: string) => (dispatch: Dispatch, getState: any) => {

  const data = {
    id,
    token,
    linkId,
    password: pass,
  };

  usersAPI.saveNewPasswordPutQuery(data)
    .then((response: any) => { //валидация?
      if (response.data === 'SUCCESS') {
        dispatch(setChangePassAC(true));
      } else {
        dispatch(setChangePassAC(false));
      }
    })
    .catch(() => {
      dispatch(setChangePassAC(false));
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const getUserMatch = (action: string, actionAfterSuccess: Function, lastId?: number) => (dispatch: Dispatch, getState: any) => {

  usersAPI.getUserMatchGetQuery(action, lastId)
    .then((response: any) => { //валидация?
      dispatch(actionAfterSuccess(response.data));
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const createChat = (toUser: number) => (dispatch: any, getState: any) => {

  usersAPI.createChatPutQuery({'toUsr': toUser})
    .then((response: any) => { //валидация?
      dispatch(setIsOpenChatRoom(true, response.data, toUser));
      dispatch(getUserMatch('MATCH', setUserMatchesAC));
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const setVisitUserPutQuery = (userId: number) => (dispatch: any, getState: any) => {
  const myId = getState().mainPage.account.id;

  const data = {
    "toUsr": userId,
    "action": 'VISIT',
    'fromUsr': myId
  }
  usersAPI.likeUser(data)
    .then()
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const getUserById = (userId: number) => (dispatch: any, getState: any) => {
  const myId = getState().mainPage.account.id;

  usersAPI.getUserByIdGetQuery(userId)
    .then((response: any) => { //валидация?
      dispatch(setUserInChatAC(response.data));
      dispatch(setVisitUserPutQuery(userId));
      dispatch(setAction('VISIT', myId, userId));
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const getUserByIdWithAction = (userId: number, actionAfterSuccess: Function, secondAction?: Function) => (dispatch: any, getState: any) => {
  usersAPI.getUserByIdGetQuery(userId)
    .then((response: any) => { //валидация?
      dispatch(actionAfterSuccess(response.data));
      secondAction && secondAction();
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const getUserStatus = (userId: number) => (dispatch: any, getState: any) => {
  usersAPI.getUserStatus(userId)
    .then((response: any) => { //валидация?
      dispatch(setUserStatus(response.data));
    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}

export const getChatToken = () => (dispatch: any, getState: any) => {

  usersAPI.getChatTokenGetQuery()
    .then((response: any) => { //валидация?

      const userId = getState().mainPage.account.id;

      sessionStorage.setItem('userId', userId);
       sessionStorage.setItem('chatToken', response.data.token);
       sessionStorage.setItem('chatFingerprint', response.data.userFingerprint);

      const userIdCheck = sessionStorage.getItem('userId');
      const chatToken = sessionStorage.getItem('chatToken');
      const chatFingerprint = sessionStorage.getItem('chatFingerprint');

      console.log(userIdCheck);
      console.log(response.data.token);
      console.log(chatFingerprint);

      dispatch(setChatTokenAC(response.data));

      const chat = getState().chat;
      // const userId = getState().mainPage.account.id;

      // dispatch(openChatCanal(chat, userId));

    })
    .catch(() => {
      dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
    });
}