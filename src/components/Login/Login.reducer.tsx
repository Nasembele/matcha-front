import {initialState} from "./Login.helpers";
import * as constants from './Login.consts';
import {IAction, ILogin} from "../../types";
import {prepareDateToSendServer} from "../../helpers";

export default function LoginReducer(state: ILogin = initialState, action: IAction) {
    switch (action.type) {
        case constants.SET_USER_EMAIL:
            return {
                ...state,
                authData: {
                    ...state.authData,
                    login: action.payload
                }
            };
        case constants.SET_USER_PASSWORD:
            return {
                ...state,
                authData: {
                    ...state.authData,
                    password: action.payload
                }
            };
        case constants.SET_IS_AUTH_USER:
            return {
                ...state,
                isAuth: action.payload
            };
        case constants.SET_IS_AUTH_USER_DATA:
            return {
                ...state,
                userData: action.payload
            };
        // case constants.SET_USER_EMAIL:
        //     return {
        //         ...state,
        //         email: action.payload
        //     };
        case constants.SET_USER_RESET_PASSWORD:
            return {
                ...state,
                resetData: {
                    ...state.resetData,
                    resetPassword: action.payload
                }
            };
        case constants.SET_REG_FIRST_NAME:
            return {
                ...state,
                regData: {
                    ...state.regData,
                    firstName: action.payload
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
        case constants.SET_REG_BIRTHDAY:
            return {
                ...state,
                regData: {
                    ...state.regData,
                    birthday: prepareDateToSendServer(action.payload)
                }
            };
        case constants.SET_REG_GENDER:
            return {
                ...state,
                regData: {
                    ...state.regData,
                    gender: action.payload
                }
            };
        case constants.SET_IS_REG_USER:
            return {
                ...state,
                regData: {
                    ...state.regData,
                    isRegUser: action.payload
                }
            };
        case constants.SET_REG_SEXUAL_PREFERENCE:
            return {
                ...state,
                regData: {
                    ...state.regData,
                    sexualPreference: action.payload
                }
            };
        case constants.SET_USER_RESET_EMAIL:
            return {
                ...state,
                resetData: {
                    ...state.resetData,
                    email: action.payload
                }
            };
        case constants.SET_IS_VALID_EMAIL:
            return {
                ...state,
                resetData: {
                    ...state.resetData,
                    isValidEmail: action.payload
                }
            };
        case constants.SET_IS_VALID_LINK:
            return {
                ...state,
                resetData: {
                    ...state.resetData,
                    isValidLink: action.payload
                }
            };
        case constants.SET_IS_VALID_PASS:
            return {
                ...state,
                resetData: {
                    ...state.resetData,
                    isValidPass: action.payload
                }
            };
        case constants.SET_ID_RESET_USER:
            return {
                ...state,
                resetData: {
                    ...state.resetData,
                    id: action.payload
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
                    // ...state.regData,
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