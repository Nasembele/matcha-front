import {IAction, IChat} from "../../types";
import * as constants from "./Chat.consts";
import {addNewFirstPack} from "../../helpers";

export const initialChatState = {
  chatToken: '',
  chatFingerprint: '',
  isOpenChatRoom: false,
  openChatId: 0,
  matches: [],
  firstPackMessages: []
}

export default function ChatReducer(state: IChat = initialChatState, action: IAction) {
  switch (action.type) {
    case constants.SET_USER_MATCHES:
      return {
        ...state,
        matches: action.payload
      };
    case constants.SET_IS_OPEN_CHAT_ROOM:
      return {
        ...state,
        isOpenChatRoom: action.payload.isOpenChatRoom,
        openChatId: action.payload.chatId ? action.payload.chatId : 0
      };
    case constants.SET_CHAT_TOKEN:
      return {
        ...state,
        chatToken: action.payload.token,
        chatFingerprint: action.payload.userFingerprint
      };
    case constants.SET_FIRST_PACK_MESSAGES:
      return {
        ...state,
        firstPackMessages: addNewFirstPack(state.firstPackMessages,
          {
            messages: action.payload
          })
      };
    default:
      return state;
  }
}