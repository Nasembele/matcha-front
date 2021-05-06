import {initialState} from "./Login.helpers";
import * as constants from './Login.consts';

export default function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case constants.SET_USER_LOGIN:
            return {
                ...state,
                login: action.payload
            };
        case constants.SET_USER_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case constants.SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.payload
            };
        default:
            return state;
    }
}