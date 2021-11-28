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
    const messagesWithLastI = {
        messages: {
            chatId: newEl.messages.chatId,
            messageAnswer: newEl.messages.messageAnswer.reverse()
        },
        lastMessagesId: newEl.messages.messageAnswer[0]?.id
    }

    const ind = arr.findIndex((el) => el.messages.chatId === newEl.messages.chatId);
    if (ind !== -1) {
        arr.splice(ind, 1);
    }
        arr.push(messagesWithLastI);
    return arr;
}