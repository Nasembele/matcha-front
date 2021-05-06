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