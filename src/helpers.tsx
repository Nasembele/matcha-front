import {ICurrentUserMessages, IMessage, INotification, IUserData} from "./types";

export const prepareDateToSendServer = (date: string) => {
  const parsedDate = date.split('-');
  return `${parsedDate[2]}.${parsedDate[1]}.${parsedDate[0]}`;
}

export const addNewFirstPack = (arr: ICurrentUserMessages[], newEl: {
                                  messages: {
                                    chatId: number,
                                    messageAnswer: IMessage[]
                                  }
                                }
) => {
  const messagesWithId = {
    messages: {
      chatId: newEl.messages.chatId,
      messageAnswer: newEl.messages.messageAnswer.reverse()
    },
    oldestMessagesId: newEl.messages.messageAnswer[0]?.id,
    freshMessagesId: newEl.messages.messageAnswer[newEl.messages.messageAnswer.length - 1]?.id
  }

  // const ind = arr.findIndex((el) => el.messages.chatId === newEl.messages.chatId);
  // if (ind !== -1) {
  //     arr.splice(ind, 1);
  // }
  //     arr.push(messagesWithId);
  return arr;
}

export const addElemInArray = (elem: any, array: any) => {
  array.push(elem);
  return array;
}

export const closeNotificationAboutMessage = (messageId: number, array: any) => {
  const ind = array.findIndex((el: any) => el.messageId === messageId);
  array[ind].isShow = false;
  return array;
}

export const prepareNotificationForSave = (notification: any): INotification | undefined => {
  if (notification.transportMessage?.messageNotification) {
    return {
      action: 'NEW_MESSAGE',
      fromUsr: notification.transportMessage?.messageNotification.senderId,
      messageId: notification.transportMessage?.messageNotification.messageId,
      chatId: notification.transportMessage?.chatId,
      isPrepareForShow: false,
      isCanShow: true
    }
  } else if (notification.likeAction) {
    return {
      action: notification.likeAction?.action,
      fromUsr: notification.likeAction?.fromUsr,
      isPrepareForShow: false,
      isCanShow: true
    }
  }
}

export const setUserFiInLastNotificationHelp = (notifications: INotification[], user: {firstName: string, lastName: string}) => {
  notifications[notifications.length - 1].fromUsrFI = `${user.firstName} ${user.lastName}`;
  notifications[notifications.length - 1].isPrepareForShow = true;
  return notifications;
}

export const getNotificationTitleByAction = (action: string) => {
 switch (action) {
   case 'NEW_MESSAGE':
     return 'Новое сообщение';
   case 'VISIT':
     return 'Новый визит';
   case 'LIKE':
     return 'Новый лайк';
   case 'MATCH':
     return 'Новый матч';
   case 'TAKE_LIKE':
     return 'Забрали лайк';
 }
}

export const getDescriptionByAction = (action: string, fromFI?: string, title?: string) => {
  let description;
  switch (action) {
    case 'NEW_MESSAGE':
      description = 'прислал(а) сообщение';
      break;
    case 'VISIT':
      description = 'просматривал(а) Ваш профиль';
      break;
    case 'LIKE':
      description = 'поставил(а) Вам лайк';
      break;
    case 'MATCH':
      description = 'поставил(а) Вам лайк в ответ, у вас матч';
      break;
    case 'TAKE_LIKE':
      description = 'забрал(а) свой лайк';
      break;
  }
  return `${fromFI || ''} ${description}`
}

export const setIsShowFalseInLastNotification = (notifications: INotification[]) => {
  notifications[notifications.length - 1].isCanShow = false;
  return notifications;
}