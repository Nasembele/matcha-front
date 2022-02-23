import {IChatMessage, IMatches, IMessage, IUserData} from "../../types";
import * as constants from "./Chat.consts";

export const setUserMatchesAC = (matches: IMatches) => ({
  type: constants.SET_USER_MATCHES,
  payload: matches
});

export const setUserLikesAC = (likes: IMatches) => ({
  type: constants.SET_USER_LIKES,
  payload: likes
});

export const setUserVisitsAC = (visits: IMatches) => ({
  type: constants.SET_USER_VISITS,
  payload: visits
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

export const setNotificationAboutNewMessageAC = (isShow: boolean, chatId?: number, userId?: number, messageId?: number) => ({
  type: constants.SET_NOTIFICATION_ABOUT_NEW_MESSAGES,
  payload: {isShow, chatId, userId, messageId}
});

export const closeNotificationAboutNewMessageAC = (isShow: boolean, messageId: number) => ({
  type: constants.CLOSE_NOTIFICATION_ABOUT_NEW_MESSAGES,
  payload: {isShow, messageId}
});

export const setNotificationAboutNewVisitAC = (isShow: boolean, fromUsr?: number, toUsr?: number, action?: string) => ({
  type: constants.SET_NOTIFICATION_ABOUT_NEW_VISIT,
  payload: {isShow, fromUsr, toUsr, action}
});

export const setReceivedNotice = (notice: any) => ({
  type: constants.SET_RECEVIED_CHAT_NOTICE,
  payload: notice
});

export const setCurrentUserMessages = (messages: IMessage[]) => ({
  type: constants.SET_CURRENT_USER_MESSAGES,
  payload: messages
});

export const setUserFiInLastNotification = (user: IUserData) => ({
  type: constants.SET_USER_FI_IN_LAST_NOTIFICATION,
  payload: {firstName: user.firstName, lastName: user.lastName}
});

export const setIsShowFalseForNotifications = () => ({
  type: constants.SET_IS_SHOW_FALSE_FOR_NOTIFICATION,
});

export const closeOpenChatRoom = () => ({
  type: constants.CLOSE_OPEN_CHAT_ROOM,
});

export const clearChatPage = () => ({
  type: constants.CLEAR_CHAT_PAGE
});
