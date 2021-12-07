import {IMatches, IMessage, IUserData} from "../../types";
import * as constants from "./Chat.consts";

export const setUserMatchesAC = (matches: IMatches) => ({
  type: constants.SET_USER_MATCHES,
  payload: matches
});

export const setIsOpenChatRoom = (isOpenChatRoom: boolean, chatId?: number, toUserId?: number) => ({
  type: constants.SET_IS_OPEN_CHAT_ROOM,
  payload: {isOpenChatRoom, chatId, toUserId}
});

export const setChatTokenAC = (data: { Token: string, userFingerprint: string }) => ({
  type: constants.SET_CHAT_TOKEN,
  payload: data
});

export const setFirstPackMessagesAC = (firstPackMessages: IMessage[]) => ({
  type: constants.SET_FIRST_PACK_MESSAGES,
  payload: firstPackMessages
});

export const setUserInChatAC = (userInChat: IUserData) => ({
  type: constants.SET_USER_IN_CHAT,
  payload: userInChat
});

export const setNotificationAboutNewMessageAC = (hasNewMessage: boolean) => ({
  type: constants.SET_NOTIFICATION_ABOUT_NEW_MESSAGES,
  payload: hasNewMessage
});

export const setNotificationParametersAboutNewMessageAC = (chatId: number, userId: number) => ({
  type: constants.SET_NOTIFICATION_PARAMETERS_ABOUT_NEW_MESSAGES,
  payload: {chatId, userId}
});


