import {IAction, IChat} from "../../types";
import * as constants from "./Chat.consts";
import {addNewFirstPack} from "../../helpers";

export const initialChatState = {
  chatToken: '',
  chatFingerprint: '',
  isOpenChatRoom: false,
  openChatId: 0,
  toUserId: 0,
  matches: [],
  firstPackMessages: [],
  lastIdInFirstPAckMessages: 0
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
        openChatId: action.payload.chatId ? action.payload.chatId : 0,
        toUserId: action.payload.toUserId ? action.payload.toUserId : 0
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
          }),
        // lastIdInFirstPAckMessages: action.payload.messageAnswer[action.payload.messageAnswer.length - 1]?.id
      };
    case constants.SET_USER_IN_CHAT:
      return {
        ...state,
        userInChat: action.payload
      };
    case constants.SET_NOTIFICATION_ABOUT_NEW_MESSAGES:
      return {
        ...state,
        messageNotification: {
          ...state.messageNotification,
          hasNewMessage: action.payload
        }
      };
    case constants.SET_NOTIFICATION_PARAMETERS_ABOUT_NEW_MESSAGES:
      return {
        ...state,
        messageNotification: {
          ...state.messageNotification,
          chatId: action.payload.chatId,
          userId: action.payload.userId
        }
      };
    default:
      return state;
  }
}