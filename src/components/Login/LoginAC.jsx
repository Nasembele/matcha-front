import * as constants from './Login.consts';

export const changeLoginAC = (login) => ({
    type: constants.SET_USER_LOGIN,
    payload: login
});

export const changePasswordAC = (password) => ({
    type: constants.SET_USER_PASSWORD,
    payload: password
});

export const setIsAuthAC = (isAuth) => ({
    type: constants.SET_IS_AUTH,
    payload: isAuth
});

export const changeEmailAC = (email) => ({
    type: constants.SET_USER_EMAIL,
    payload: email
});

export const changeResetPasswordAC = (password) => ({
    type: constants.SET_USER_RESET_PASSWORD,
    payload: password
});

export const changeRegNameAC = (name) => ({
    type: constants.SET_REG_NAME,
    payload: name
});

export const changeRegLastNameAC = (name) => ({
    type: constants.SET_REG_LAST_NAME,
    payload: name
});

export const changeRegMiddleNameAC = (name) => ({
    type: constants.SET_REG_MIDDLE_NAME,
    payload: name
});

export const changeRegEmailAC = (email) => ({
    type: constants.SET_REG_EMAIL,
    payload: email
});

export const changeRegLoginAC = (login) => ({
    type: constants.SET_REG_LOGIN,
    payload: login
});

export const changeRegPasswordAC = (password) => ({
    type: constants.SET_REG_PASSWORD,
    payload: password
});