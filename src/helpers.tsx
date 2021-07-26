export const prepareDateToSendServer = (date: string) => {
    const parsedDate = date.split('-');
    return `${parsedDate[2]}.${parsedDate[1]}.${parsedDate[0]}`;
}