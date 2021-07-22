import * as constants from './Login.consts';
import {IUserData} from "../../types";

export const changeLoginAC = (login: string) => ({
    type: constants.SET_USER_EMAIL,
    payload: login
});

export const changePasswordAC = (password: string) => ({
    type: constants.SET_USER_PASSWORD,
    payload: password
});

export const setIsAuthUserAC = (isAuth: boolean) => ({
    type: constants.SET_IS_AUTH_USER,
    payload: isAuth
});

export const setIsAuthUserDataAC = (isAuthUserData: IUserData) => ({
    type: constants.SET_IS_AUTH_USER_DATA,
    payload: isAuthUserData
});

//
// export const changeEmailAC = (email) => ({
//     type: constants.SET_USER_EMAIL,
//     payload: email
// });
//
// export const changeResetPasswordAC = (password) => ({
//     type: constants.SET_USER_RESET_PASSWORD,
//     payload: password
// });
//
// export const changeRegNameAC = (name) => ({
//     type: constants.SET_REG_NAME,
//     payload: name
// });
//
// export const changeRegLastNameAC = (name) => ({
//     type: constants.SET_REG_LAST_NAME,
//     payload: name
// });
//
// export const changeRegMiddleNameAC = (name) => ({
//     type: constants.SET_REG_MIDDLE_NAME,
//     payload: name
// });
//
// export const changeRegEmailAC = (email) => ({
//     type: constants.SET_REG_EMAIL,
//     payload: email
// });
//
// export const changeRegLoginAC = (login) => ({
//     type: constants.SET_REG_LOGIN,
//     payload: login
// });
//
// export const changeRegPasswordAC = (password) => ({
//     type: constants.SET_REG_PASSWORD,
//     payload: password
// });