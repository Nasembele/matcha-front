import axios from "axios";
import {setLikeUserAC, setUserAccountAC, setUsersAC} from "./components/MainPage/MainPageAC";
import {IAuthData, IRegData, IUserData} from "./types";
import {Dispatch} from "redux";
import {setIsAuthUserAC, setIsAuthUserDataAC, setIsRegUserAC, setIsResetUserAC} from "./components/Login/LoginAC";
import {setServerErrorAC} from "./components/ErrorWrapper/ErrorWrapperAC";

const instance = axios.create(
    {
        // withCredentials: true,
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
    //
    // getAccount() {
    //     return instance.get('account')
    // },
    //
    // saveAccountChanges(account) {
    //     return instance.post('accountSave', account)
    // },
    //
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
                dispatch(setIsAuthUserDataAC(res));
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
                dispatch(setIsAuthUserDataAC(res));
                dispatch(setIsAuthUserAC(true));
            }
            // dispatch(setIsAuthUserDataAC(res));
            // dispatch(setIsAuthUserAC(true));

        })
        .catch(() => {
            dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
            dispatch(setIsAuthUserAC(true)); //todo потом убрать

        });
}


export const recoveryPasswordPostQuery = (email: Object) => (dispatch: Dispatch) => {
    usersAPI.recoveryPassword(email) //валидация на успешный ответ и на появление сообщения
        .then((res: any) => {
            if (res.data === 'SUCCESS') { //поправить на новый лад?
                dispatch(setIsResetUserAC(true));
            }
            // dispatch(setIsResetUserAC(true));

        })
        .catch(() => {
            dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
        });
}

export const resetPasswordPostQuery = (resetPass: Object) => (dispatch: Dispatch) => {
    usersAPI.resetPassword(resetPass)
        .then((res: any) => {
            if (res.data === 'SUCCESS') { //поправить на новый лад?
                dispatch(setIsResetUserAC(true));
            }
        }) //валидация на успешный ответ и на появление сообщения
        .catch(() => {

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

//
// export const getUserAccountGetQuery = () => (dispatch) => {
//     usersAPI.getAccount()
//         .then(response => {
//             dispatch(setUserAccountAC(response));
//         }) //валидация на успешный ответ и на появление сообщения
//         .catch(() => {});
// }
//
// export const saveChangeAccPostQuery = (account) => (dispatch) => {
//     usersAPI.saveAccountChanges(account)
//         .then(response => {
//             //dispatch(setUserAccountAC(response));
//         }) //валидация на успешный ответ
//         .catch(() => {});
// }
//
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