import axios from "axios";
import {setLikeUserAC, setUserAccountAC, setUsersAC} from "./components/MainPage/MainPageAC";
import {IAuthData, IUserData} from "./types";
import {Dispatch} from "redux";
import {setIsAuthUserAC, setIsAuthUserDataAC} from "./components/Login/LoginAC";
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
    //
    // recoveryPassword(email) {
    //     return instance.post('resetPasswd', email)
    // },
    //
    // resetPassword(resetPass) {
    //     return instance.post('resetPassChange', resetPass)
    // },
    //
    // createAccount(regData) {
    //     return instance.post('registration', regData)
    // },
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
            if (res === 'Error JWT') { //поправить на новый лад?
                dispatch(setIsAuthUserAC(false));
                // добавить ошибку error jwt
            }
            dispatch(setIsAuthUserAC(true));
            dispatch(setIsAuthUserDataAC(res));
            // dispatch(setIsAuthAC(true));
        })
        .catch(() => {
            console.log('error');
            dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
            // dispatch(setIsAuthUserAC(true));
        });
}

export const signInPostQuery = (isAuthData: IAuthData) => (dispatch: Dispatch) => {
    usersAPI.signIn(isAuthData)
        .then((res: any) => {
            dispatch(setIsAuthUserDataAC(res));
        })
        .catch(() => {
            dispatch(setServerErrorAC(true)); //ошибка общая на всю приложуху
        });
}


// export const recoveryPasswordPostQuery = (email) => (dispatch) => {
//     usersAPI.recoveryPassword(email) //валидация на успешный ответ и на появление сообщения
//         .then(response => {})
//         .catch(() => {});
// }
//
// export const resetPasswordPostQuery = (resetPass) => (dispatch) => {
//     usersAPI.resetPassword(resetPass)
//         .then(response => {}) //валидация на успешный ответ и на появление сообщения
//         .catch(() => {});
// }
//
// export const updateRegDataPostQuery = (regData) => (dispatch) => {
//     usersAPI.createAccount(regData)
//         .then(response => {}) //валидация на успешный ответ и на появление сообщения
//         .catch(() => {});
// }
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