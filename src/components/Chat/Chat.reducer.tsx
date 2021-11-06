import {IAction, IChat} from "../../types";
import * as constants from "./Chat.consts";

export const initialChatState = {
  matches: []
}

export default function ChatReducer(state: IChat = initialChatState, action: IAction) {
  switch (action.type) {
    case constants.SET_USER_MATCHES:
      return {
        ...state,
        matches: action.payload
      };
    default:
      return state;
  }
}