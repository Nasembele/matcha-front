import {IAction, IChat, IChatMessage, IMessage} from "../../types";
import * as constants from "./Chat.consts";
import {
  addElemInArray,
  addNewFirstPack,
  closeNotificationAboutMessage,
  prepareNotificationForSave, setUserFiInLastNotificationHelp
} from "../../helpers";
import {message} from "antd";
import {Dispatch} from "redux";
import {setCurrentUserMessages, setReceivedNotice, setUserFiInLastNotification} from "./ChatAC";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {chatAPI} from "../../chat-api";
import {getUserById} from "../../api";

export const initialChatState: IChat = {
  chatToken: '',
  chatFingerprint: '',
  isOpenChatRoom: false,
  openChatId: 0,
  toUserId: 0,
  matches: [],
  // currentUserMessages?: {},
  // messageNotification: [],
  actionNotifications: []
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
        // firstPackMessages: addNewFirstPack(state.firstPackMessages,
        //   {
        //     messages: action.payload
        //   }),
        // lastIdInFirstPAckMessages: action.payload.messageAnswer[action.payload.messageAnswer.length - 1]?.id
      };
    case constants.SET_USER_IN_CHAT:
      return {
        ...state,
        userInChat: action.payload
      };
    case constants.SET_NOTIFICATION_ABOUT_NEW_MESSAGES: //todo
      return {
        ...state,
        // messageNotification: addElemInArray({
        //   isShow: action.payload.isShow,
        //   chatId: action.payload.chatId,
        //   userId: action.payload.userId,
        //   messageId:  action.payload.messageId,
        // }, state.messageNotification)
      };
    case constants.CLOSE_NOTIFICATION_ABOUT_NEW_MESSAGES:
      return {
        ...state,
        // messageNotification: closeNotificationAboutMessage(action.payload.messageId, state.messageNotification)
      };

    case constants.SET_NOTIFICATION_ABOUT_NEW_VISIT:
      return {
        ...state,
        actionNotifications: addElemInArray({
          action: action.payload.action,
          isShow: action.payload.isShow,
          fromUsr: action.payload.fromUsr,
          toUsr: action.payload.toUsr
        }, state.actionNotifications)
      };

    case constants.SET_RECEVIED_CHAT_NOTICE:
      return {
        ...state,
        actionNotifications: [...state.actionNotifications, prepareNotificationForSave(action.payload)]
      }
    case constants.SET_CURRENT_USER_MESSAGES:
      return {
        ...state,
        currentUserMessages: {
          ...state.currentUserMessages,
          messages: action.payload.reverse(),
          oldestMessagesId: action.payload[0]?.id
        }
      }
    case constants.SET_USER_FI_IN_LAST_NOTIFICATION:
      return {
        ...state,
        actionNotifications: setUserFiInLastNotificationHelp(state.actionNotifications, action.payload)
      }
    default:
      return state;
  }
}

let _newMessageHandler: ((messages: any) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      if (messages.transportMessage?.messageAnswer) {
        dispatch(setCurrentUserMessages(messages.transportMessage.messageAnswer))
      } else
        // if (messages.transportMessage?.messageNotification || messages.likeAction) {

        // const getMessageById = {
        //   type: 'CHAT',
        //   transportMessage: {
        //     chatId: messages.transportMessage.chatId,
        //     getMessageRq: {
        //       type: "BY_IDS",
        //       messageIds: [messages.transportMessage.messageNotification.messageId],
        //     }
        //   }
        // };

        // dispatch(sendNewMessage(getMessageById));
        dispatch(setReceivedNotice(messages)) //todo гдето тут классифицировать поступающие сообщения?
      }

  }

  return _newMessageHandler
}

export const startMessagesListening = (dateForChannel: any) => async (dispatch: Dispatch) => {
  chatAPI.start(dateForChannel);
  chatAPI.subscribe(newMessageHandlerCreator(dispatch));
}

export const stopMessagesListening = () => async (dispatch: Dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
  chatAPI.stop();
}

export const sendNewMessage = (newMessage: any):any => async (dispatch: Dispatch) => {
  chatAPI.sendMessage(JSON.stringify(newMessage));
}

export const setAction = (action: string, fromUsr: number, toUsr: number) => async (dispatch: Dispatch) => {
  const setActionMessage = {
    type: 'ACTION_NOTIFICATION',
    likeAction: {
      fromUsr,
      toUsr,
      action
    }
  };
  chatAPI.sendMessage(JSON.stringify(setActionMessage));
}