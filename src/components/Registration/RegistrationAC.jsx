import * as constants from './Registration.consts';

export const changeFioAC = (fioInput) => ({
    type: constants.SET_FIO,
    payload: fioInput
});

export const setUserAccount = (registration) => ({
    type: constants.SET_USER_ACCOUNT,
    payload: registration
});