import {initialState} from "./Registration.helpers";
import * as constants from './Registration.consts';
import {usersAPI} from "../../api";
import {setUserAccount} from "./RegistrationAC";

export default function RegistrationReducer(state = initialState, action) {
    switch (action.type) {
        case constants.SET_FIO:
            return {
                ...state,
                fio: action.payload
            };
        case constants.SET_USER_ACCOUNT:
            return action.payload;
        default:
            return state;
    }
}

export const updateRegDataPostQuery = (registration) => (dispatch) => {
    usersAPI.createAccount(registration)
        .then(response => {
            dispatch(setUserAccount(response.data));
        })
        .catch(() => {
            alert('error');
        });
}