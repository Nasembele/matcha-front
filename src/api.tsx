import axios from "axios";
import {setLikeUserAC, setUserAccountAC, setUserDataAC, setUsersAC} from "./components/MainPage/MainPageAC";
import {IAuthData, IRegData, IUserCard, IUserData} from "./types";
import {Dispatch} from "redux";
import {
    setIsAuthUserAC,
    setIsAuthUserDataAC,
    setIsRegUserAC,
    setIsValidEmailResetUserAC, setIsValidLinkResetUserAC, setIsValidPassResetUserAC
} from "./components/Login/LoginAC";
import {setServerErrorAC} from "./components/ErrorWrapper/ErrorWrapperAC";

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
    //
    // getAccount() {
    //     return instance.get('account')
    // },

    saveAccountChanges(newCard: IUserCard) {
        return instance.post('main/account?act=card', newCard)
    },

    // getUsers() {
    //     return instance.get('getUsers')
    // },
    //
    // likeUser (userId) {
    //     return  instance.post(`like/${userId}`)
    // },

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

export const authGetUserQuery = () => (dispatch: Dispatch) => {
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
            }
            // dispatch(setIsAuthAC(true));
        })
        .catch(() => {
            console.log('error');
            dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
            // dispatch(setIsAuthUserAC(true));//todo потом убрать
        });
}

export const signInPostQuery = (isAuthData: IAuthData) => (dispatch: Dispatch) => {
    usersAPI.signIn(isAuthData)
        .then((res: any) => {
            // debugger;
            if (res.data !== 'INVALID LOGIN OR PASSWORD') { //поправить на новый лад?
                // добавить ошибку error jwt
                // dispatch(setIsAuthUserDataAC(res.data));
                dispatch(setUserDataAC(res.data));
                dispatch(setIsAuthUserAC(true));
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
            dispatch(setIsAuthUserAC(false));
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

//
// export const getUserAccountGetQuery = () => (dispatch) => {
//     usersAPI.getAccount()
//         .then(response => {
//             dispatch(setUserAccountAC(response));
//         }) //валидация на успешный ответ и на появление сообщения
//         .catch(() => {});
// }

export const saveChangeAccPostQuery = (newCard: IUserCard) => (dispatch: Dispatch) => {
    usersAPI.saveAccountChanges(newCard)
        .then((res: any) => {
            // dispatch(setUserAccountAC(response));
        }) //валидация на успешный ответ
        .catch(() => {
        dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху

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
// export const likeUserPostQuery = (userId) => (dispatch) => {
//     usersAPI.likeUser(userId)
//         .then(response => { //валидация?
//             dispatch(setLikeUserAC());
//         })
//         .catch(() => {
//             dispatch(setLikeUserAC()); //потом убрать
//         });
// }