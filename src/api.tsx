import axios from "axios";
import {
  clearMainPage,
  deleteNotLikeUserAC,
  setChangePassAC,
  setConfirmNewEmailAC,
  setIsValidLinkAC,
  setMatchCurrentUserAC,
  setUserDataAC,
  setUserFiltersAC,
  setUsersAC,
  setUserStatus,
  setValidNewEmailAC,
} from "./components/MainPage/MainPageAC";
import {IAuthData, IRegData, IUserCard, IUserFilter} from "./types";
import {Dispatch} from "redux";
import {
  changeLoginAC,
  changePasswordAC,
  clearLoginPage,
  setIsAuthUserAC,
  setIsRegUserAC,
  setIsValidEmailResetUserAC,
  setIsValidPassResetUserAC
} from "./components/Login/LoginAC";
import {prepareDateToSendServer} from "./helpers";
import {
  clearChatPage,
  closeOpenChatRoom,
  setChatTokenAC,
  setIsOpenChatRoom,
  setUserInChatAC,
  setUserLikesAC,
  setUserMatchesAC
} from "./components/Chat/ChatAC";
import {setAction} from "./components/Chat/Chat.reducer";

const instance = axios.create(
  {
    withCredentials: true,
    baseURL: `http://localhost:8080`,
  }
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
  getUserMatchGetQuery(action: string, lastId?: number) {
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
    return instance.post(`/main/getstatus`, {ids: [userId]});
  }
}

export const authGetUserQuery = () => (dispatch: any) => {
  usersAPI.authGetUser()
    .then((res: any) => {
      if (res.data === 'Error JWT') {
        dispatch(setIsAuthUserAC(null));
      } else {
        dispatch(setIsAuthUserAC(true));
        dispatch(setUserDataAC(res.data));
        dispatch(setUserFiltersAC(res.data.filter));
        dispatch(getUserMatch('MATCH', setUserMatchesAC));
        dispatch(getChatToken());
      }
    })
    .catch(() => {
    });
}

export const rerunGetUserQuery = () => (dispatch: any) => {
  usersAPI.authGetUser()
    .then((res: any) => {
      if (res.data === 'Error JWT') {
        dispatch(setIsAuthUserAC(null));
      } else {
        dispatch(setUserDataAC(res.data));
      }
    })
    .catch(() => {
    });
}

export const signInPostQuery = (isAuthData: IAuthData) => (dispatch: any, getState: any) => {
  usersAPI.signIn(isAuthData)
    .then((res: any) => {
      if (res.data !== 'INVALID LOGIN OR PASSWORD' && res.data !== 'WRONG') {
        dispatch(setUserDataAC(res.data));
        dispatch(setUserFiltersAC(res.data.filter));
        dispatch(setIsAuthUserAC(true));
        dispatch(getUserMatch('MATCH', setUserMatchesAC));
        dispatch(getChatToken());
      } else {
        dispatch(setIsAuthUserAC(false));
      }
    })
    .catch(() => {
    });
}

export const recoveryPasswordPostQuery = (email: Object) => (dispatch: Dispatch) => {
  usersAPI.recoveryPassword(email)
    .then((res: any) => {
      if (res.data === 'SUCCESS') {
        dispatch(setIsValidEmailResetUserAC(true));
      }
      dispatch(setIsValidEmailResetUserAC(false));
    })
    .catch(() => {
    });
}

export const resetPasswordPostQuery = (resetPass: Object) => (dispatch: Dispatch) => {
  usersAPI.resetPassword(resetPass)
    .then((res: any) => {
      if (res.data === 'SUCCESS') {
        dispatch(setIsValidPassResetUserAC(true));
      }
      if (res.data === 'NEW PASS NOT DIFFERENT BY OLD') {
        dispatch(setIsValidPassResetUserAC('old_pass'));
      }
      dispatch(setIsValidPassResetUserAC(false));
    })
    .catch(() => {
      dispatch(setIsValidPassResetUserAC(false));
    });
}

export const updateRegDataPostQuery = (regData: IRegData) => (dispatch: Dispatch) => {
  usersAPI.createAccount(regData)
    .then((res: any) => {
      if (res.data === 'SUCCESS') {
        dispatch(setIsRegUserAC(true));
      } else {
        dispatch(setIsRegUserAC(false));
      }
    })
    .catch(() => {
    });
}

export const logoutGetQuery = () => (dispatch: Dispatch) => {
  usersAPI.logout()
    .then(() => {
      dispatch(changeLoginAC(''));
      dispatch(changePasswordAC(''));
      dispatch(setIsAuthUserAC(null));
      dispatch(clearMainPage());
      dispatch(clearChatPage());
      dispatch(clearLoginPage());
      sessionStorage.clear();
    })
    .catch(() => {
    });
}

export const validateLink = (currentURL: string) => (dispatch: Dispatch) => {
  currentURL = 'http://localhost:8080' + currentURL.substr(21);
  usersAPI.validateLinkGetQuery(currentURL)
    .then((res: any) => {
      if (res.data === 'SUCCESS') {
        dispatch(setIsValidLinkAC(true));
      } else {
        dispatch(setIsValidLinkAC(false));
      }
    })
    .catch(() => {
      dispatch(setIsValidLinkAC(false));
    });
}

export const saveChangeAccPostQuery = (newCard: IUserCard) => () => {
  const prepareNewCard = {
    biography: newCard.biography || '',
    workPlace: newCard.workPlace || '',
    position: newCard.position || '',
    education: newCard.education || '',
    gender: newCard.gender || 'male',
    sexualPreference: newCard.sexualPreference || 'getero',
    tags: newCard.tags || []
  }
  usersAPI.saveAccountChanges(prepareNewCard)
    .then(() => {
    })
    .catch(() => {
    });
}

export const changePhotoPostQuery = (number: number, action: 'save' | 'delete') => (dispatch: any, getState: any) => {
  const photoObj = getState().mainPage.account?.card?.photos[number];
  if (action) {
    photoObj.action = action;
  }
  usersAPI.changePhoto([photoObj])
    .then(() => {
      dispatch(rerunGetUserQuery());
    })
    .catch(() => {
    });
}

export const getUsersPostQuery = () => (dispatch: Dispatch) => {
  usersAPI.getUsers()
    .then((res: any) => {
      dispatch(setUsersAC(res.data));
    })
    .catch(() => {
    });
}

export const setUserFilterPutQuery = () => (dispatch: any, getState: any) => {
  const filter = getState().mainPage.userFilters;
  usersAPI.setFilters(filter)
    .then(res => {
      dispatch(getUsersPostQuery());
    })
    .catch(() => {
    });
}

export const likeUserPutQuery = (userId: number, action: string) => (dispatch: any, getState: any) => {
  const myId = getState().mainPage.account.id;
  const data = {
    "toUsr": userId,
    "action": action,
    'fromUsr': myId
  }
  usersAPI.likeUser(data)
    .then((response: any) => { //валидация?
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
    });
}

export const changeAccEmailPostQuery = () => (dispatch: Dispatch) => {
  const data = {"act": "emailRqSend"};
  usersAPI.changeEmail(data)
    .then(() => {
    })
    .catch(() => {
    });
}

export const changeAccPassPostQuery = (userEmail?: string) => (dispatch: Dispatch, getState: any) => {
  const email = getState().mainPage.account.email;
  const emailReq = email ? email : userEmail;
  const data = {"email": emailReq};
  usersAPI.changePass(data)
    .then((response: any) => {
      if (response.data === 'SUCCESS') {
        dispatch(setIsValidEmailResetUserAC(true));
      } else {
        dispatch(setIsValidEmailResetUserAC(false));
      }
    })
    .catch(() => {
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
    .then(() => {
    })
    .catch(() => {
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
    .then((response: any) => {
      if (response.data === 'SUCCESS') {
        dispatch(setValidNewEmailAC(true));
      } else {
        dispatch(setValidNewEmailAC(false));
      }
    })
    .catch(() => {
    });
}

export const confirmNewEmail = (id: string, linkId: string, token: string, email: string) => (dispatch: Dispatch) => {
  const data = {
    id: id,
    token: token,
    linkId: linkId,
    email: email,
    field: 'email'
  };
  usersAPI.confirmNewEmailAccSettings(data)
    .then((response: any) => {
      if (response.data === 'SUCCESS') {
        dispatch(setConfirmNewEmailAC(true));
      } else {
        dispatch(setConfirmNewEmailAC(false));
      }
    })
    .catch(() => {
    });
}

export const saveNewPassword = (id: string, linkId: string, token: string, pass: string) => (dispatch: Dispatch) => {
  const data = {
    id,
    token,
    linkId,
    password: pass,
  };
  usersAPI.saveNewPasswordPutQuery(data)
    .then((response: any) => {
      if (response.data === 'SUCCESS') {
        dispatch(setChangePassAC(true));
      } else {
        dispatch(setChangePassAC(false));
      }
    })
    .catch(() => {
      dispatch(setChangePassAC(false));
    });
}

export const getUserMatch = (action: string, actionAfterSuccess: Function, lastId?: number) => (dispatch: Dispatch) => {
  usersAPI.getUserMatchGetQuery(action, lastId)
    .then((response: any) => {
      dispatch(actionAfterSuccess(response.data));
    })
    .catch(() => {
    });
}

export const createChat = (toUser: number) => (dispatch: any) => {
  usersAPI.createChatPutQuery({'toUsr': toUser})
    .then((response: any) => {
      dispatch(setIsOpenChatRoom(true, response.data, toUser));
      dispatch(getUserMatch('MATCH', setUserMatchesAC));
    })
    .catch(() => {
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
    });
}

export const getUserById = (userId: number) => (dispatch: any, getState: any) => {
  const myId = getState().mainPage.account.id;
  usersAPI.getUserByIdGetQuery(userId)
    .then((response: any) => {
      dispatch(setUserInChatAC(response.data));
      dispatch(setVisitUserPutQuery(userId));
      dispatch(setAction('VISIT', myId, userId));
    })
    .catch(() => {
    });
}

export const getUserByIdWithAction = (userId: number, actionAfterSuccess: Function, secondAction?: Function) => (dispatch: any) => {
  usersAPI.getUserByIdGetQuery(userId)
    .then((response: any) => {
      dispatch(actionAfterSuccess(response.data));
      secondAction && secondAction();
    })
    .catch(() => {
    });
}

export const getUserStatus = (userId: number) => (dispatch: any) => {
  usersAPI.getUserStatus(userId)
    .then((response: any) => {
      dispatch(setUserStatus(response.data));
    })
    .catch(() => {
    });
}

export const getChatToken = () => (dispatch: any, getState: any) => {
  usersAPI.getChatTokenGetQuery()
    .then((response: any) => {
      const userId = getState().mainPage.account.id;
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('chatToken', response.data.token);
      sessionStorage.setItem('chatFingerprint', response.data.userFingerprint);
      dispatch(setChatTokenAC(response.data));
    })
    .catch(() => {
    });
}