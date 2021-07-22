import {initialState} from "./ErrorWrapper.helpers";
import * as constants from './ErrorWrapper.consts';
import {IAction, IError} from "../../types";

export default function ErrorWrapperReducer(state: IError = initialState, action: IAction) {
    switch (action.type) {
        case constants.SET_SERVER_ERROR:
            return {
                ...state,
                isServerError: action.payload
            };
        default:
            return state;
    }
}