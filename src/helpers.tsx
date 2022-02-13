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
      isPrepareForShow: false
    }
  } else if (notification.likeAction) {
    return {
      action: notification.likeAction?.action,
      fromUsr: notification.likeAction?.fromUsr,
      isPrepareForShow: false
    }
  }
}

export const setUserFiInLastNotificationHelp = (notifications: INotification[], user: IUserData) => {
  notifications[notifications.length - 1].fromUsrFI = `${user.firstName} ${user.lastName}`;
  notifications[notifications.length - 1].isPrepareForShow = true;
  return notifications;
}