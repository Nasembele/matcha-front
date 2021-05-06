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
        case constants.SET_USER_EMAIL:
            return {
                ...state,
                email: action.payload
            };
        case constants.SET_USER_RESET_PASSWORD:
            return {
                ...state,
                resetPassword: action.payload
            };
        case constants.SET_REG_NAME:
            return {
                ...state,
                regData: {
                    ...state.regData,
                    name: action.payload
                }
            };
        case constants.SET_REG_LAST_NAME:
            return {
                ...state,
                regData: {
                    ...state.regData,
                    lastName: action.payload
                }
            };
        case constants.SET_REG_MIDDLE_NAME:
            return {
                ...state,
                regData: {
                    ...state.regData,
                    middleName: action.payload
                }
            };
        case constants.SET_REG_EMAIL:
            return {
                ...state,
                regData: {
                    ...state.regData,
                    email: action.payload
                }
            };
        case constants.SET_REG_LOGIN:
            return {
                ...state,
                regData: {
                    ...state.regData,
                    login: action.payload
                }
            };
        case constants.SET_REG_PASSWORD:
            return {
                ...state,
                regData: {
                    ...state.regData,
                    password: action.payload
                }
            };
        default:
            return state;
    }
}