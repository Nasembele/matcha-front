import axios from "axios";
import {setIsAuthAC} from "./components/Login/LoginAC";
import {setUserAccountAC} from "./components/MainPage/MainPageAC";

const instance = axios.create(
    {
        //withCredentials: true,
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

    signIn(login) {
        return instance.post('login', login)
    },

    recoveryPassword(email) {
        return instance.post('resetpassend', email)
    },

    resetPassword(resetPass) {
        return instance.post('resetpasschange', resetPass)
    },

    createAccount(regData) {
        return instance.post('registration', regData)
    },

    getAccount() {
        return instance.get('myaccount')
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

export const signInPostQuery = (login) => (dispatch) => {
    usersAPI.signIn(login)
        .then(response => {
            dispatch(setIsAuthAC(true));
        })
        .catch(() => {
            dispatch(setIsAuthAC(true));
        });
}

export const recoveryPasswordPostQuery = (email) => (dispatch) => {
    usersAPI.recoveryPassword(email) //валидация на успешный ответ и на появление сообщения
        .then(response => {})
        .catch(() => {});
}

export const resetPasswordPostQuery = (resetPass) => (dispatch) => {
    usersAPI.resetPassword(resetPass)
        .then(response => {}) //валидация на успешный ответ и на появление сообщения
        .catch(() => {});
}

export const updateRegDataPostQuery = (regData) => (dispatch) => {
    usersAPI.createAccount(regData)
        .then(response => {}) //валидация на успешный ответ и на появление сообщения
        .catch(() => {});
}

export const getUserAccountGetQuery = () => (dispatch) => {
    usersAPI.getAccount()
        .then(response => {
            dispatch(setUserAccountAC(response));
        }) //валидация на успешный ответ и на появление сообщения
        .catch(() => {});
}