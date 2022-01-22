import {IFirstPackMessagesWithChatId, IMessage} from "./types";

export const prepareDateToSendServer = (date: string) => {
    const parsedDate = date.split('-');
    return `${parsedDate[2]}.${parsedDate[1]}.${parsedDate[0]}`;
}

export const addNewFirstPack = (arr: IFirstPackMessagesWithChatId[], newEl: {
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

    const ind = arr.findIndex((el) => el.messages.chatId === newEl.messages.chatId);
    if (ind !== -1) {
        arr.splice(ind, 1);
    }
        arr.push(messagesWithId);
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
