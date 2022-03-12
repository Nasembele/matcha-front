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

export const setIsAuthUserAC = (isAuth: boolean | null) => ({
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

export const changeRegUsernameAC = (username: string) => ({
    type: constants.SET_REG_USERNAME,
    payload: username
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

export const changeRegPasswordAC = (password: string) => ({
    type: constants.SET_REG_PASSWORD,
    payload: password
});

export const setIsRegUserAC = (isRegUser: boolean | null) => ({
    type: constants.SET_IS_REG_USER,
    payload: isRegUser
});

export const setIsValidEmailResetUserAC = (isValidEmail: boolean | null) => ({
    type: constants.SET_IS_VALID_EMAIL,
    payload: isValidEmail
});

export const setIsValidLinkResetUserAC = (isValidLink: boolean | null) => ({
    type: constants.SET_IS_VALID_LINK,
    payload: isValidLink
});

export const setIsValidPassResetUserAC = (isValidPass: boolean | null | 'old_pass') => ({
    type: constants.SET_IS_VALID_PASS,
    payload: isValidPass
});

export const setIdResetUserAC = (id: number) => ({
    type: constants.SET_ID_RESET_USER,
    payload: id
});

export const clearLoginPage = () => ({
    type: constants.CLEAR_LOGIN_PAGE
});