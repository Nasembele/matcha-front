import * as constants from './ErrorWrapper.consts';

export const setServerErrorAC = (isServerError: boolean) => ({
    type: constants.SET_SERVER_ERROR,
    payload: isServerError
});

