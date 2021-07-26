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


export const changeEmailAC = (email: string) => ({
    type: constants.SET_USER_RESET_EMAIL,
    payload: email
});

export const changeResetPasswordAC = (password: string) => ({
    type: constants.SET_USER_RESET_PASSWORD,
    payload: password
});

export const changeRegFirstNameAC = (name: string) => ({
    type: constants.SET_REG_FIRST_NAME,
    payload: name
});

export const changeRegLastNameAC = (lastName: string) => ({
    type: constants.SET_REG_LAST_NAME,
    payload: lastName
});

export const changeRegMiddleNameAC = (middleName: string) => ({
    type: constants.SET_REG_MIDDLE_NAME,
    payload: middleName
});

export const changeRegBirthdayAC = (date: string) => ({
    type: constants.SET_REG_BIRTHDAY,
    payload: date
});

export const changeRegGenderAC = (gender: string) => ({
    type: constants.SET_REG_GENDER,
    payload: gender
});

export const changeRegSexualPreferenceAC = (sexualPreference: string) => ({
    type: constants.SET_REG_SEXUAL_PREFERENCE,
    payload: sexualPreference
});


export const changeRegEmailAC = (email: string) => ({
    type: constants.SET_REG_EMAIL,
    payload: email
});

// export const changeRegLoginAC = (login) => ({
//     type: constants.SET_REG_LOGIN,
//     payload: login
// });
//
export const changeRegPasswordAC = (password: string) => ({
    type: constants.SET_REG_PASSWORD,
    payload: password
});

export const setIsRegUserAC = (isRegUser: boolean) => ({
    type: constants.SET_IS_REG_USER,
    payload: isRegUser
});

export const setIsResetUserAC = (isResetUser: boolean) => ({
    type: constants.SET_IS_RESET_USER,
    payload: isResetUser
});