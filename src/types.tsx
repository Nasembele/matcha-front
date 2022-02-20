import {message} from "antd";

export interface IAction {
    type: string,
    payload: any
}

export interface IPhotos {

        content: string,
        format: string,
        // name: string,
        action?: 'save' | 'delete' | null,
        number: string,
    main: boolean

}

export interface IResetData {
    id: number,
    email: string,
    resetPassword: string,
    isValidEmail: boolean | null,
    isValidLink: boolean | null,
    isValidPass: boolean | null | 'old_pass',
}

export interface IUserCard {
    biography?: string,
    workPlace?: string,
    position?: string,
    education?: string,
    rating?: number,
    gender: 'male'| 'female' | null,
    sexualPreference: 'getero' | 'gay' | 'bisexual' | 'lesbi' | null,
    tags?: Array<string>,
    photos: Array<IPhotos>
}

export interface IUserData {
    id: number;
    firstName: string,
    lastName: string,
    middleName: string,
    birthday: string,
    yearsOld: number,
    location: string,
    card: IUserCard,
    // match?: boolean,
    filter?: IUserFilter,
    isUserFromLikeHistory?: boolean,
    isUserFromVisitHistory?: boolean
}

export interface IRegData {
    firstName: string,
    lastName: string,
    middleName: string,
    birthday: string,
    gender: 'male' | 'female' | null,
    sexualPreference: 'getero' | 'gay' | 'bisexual' | 'lesbi' | null,
    email: string,
    password: string,
    isRegUser: boolean,
}

export interface IAuthData {
    login: string,
    password: string
}

export interface ILogin {
    isAuth: boolean,
    authData: IAuthData,
    regData: IRegData,
    // userData: IUserData,
    resetData: IResetData
}

export interface IUserFilter {
    ageBy: number,
    ageTo: number,
    rating: number,
    commonTagsCount: number,
    location: string
}

export interface IMainPage {
    account: IUserData,
    changeAccountSetting: {
        newEmail: string,
        isValidPrevEmail: null | boolean,
        isValidNewEmail: null | boolean,
        // linkData: {
        //     id: null | number,
        //     token: string,
        //     linkId: null | number
        // },
        isConfirmNewEmail: null | boolean,
        isValidEmailPassLink: null | boolean,
        isChangePass: null | boolean,

    },
    users: IUserData[],
    likeUsers: IUserData[],
    userFilters: IUserFilter,
    currentUser?: IUserDataWithMatch
}

export interface IUserDataWithMatch {
    userData: IUserData,
    match: boolean
}

export interface IError {
    isServerError: boolean,
}

export interface IMatches {
    matchId: number,
    userId: number,
    chatId?: number,
    firstName?: string,
    icon?: IPhotos
}

export interface IMessage {
    chatId: number,
    content: string,
    creationTime: string,
    fromId: number,
    id: number,
    status: string,
    toId: number,
    type: string
}

export interface ICurrentUserMessages {
    messages: IMessage[],
    oldestMessagesId?: number,
    freshMessagesId?: number
}

export interface IChat {
    chatToken: string,
    chatFingerprint: string,
    isOpenChatRoom: boolean,
    openChatId: number,
    toUserId: number,
    matches: IMatches[],
    likes: IMatches[],
    visits: IMatches[],
    currentUserMessages?: ICurrentUserMessages,
    userInChat?: IUserData,
    // messageNotification: Array<{
    //     isShow: boolean,
    //     chatId: number,
    //     userId: number
    // }>,
    actionNotifications: INotification[]
}

export interface INotification {
    action: string,
    isCanShow: boolean,
    isPrepareForShow: boolean,
    fromUsr: number,
    toUsr?: number,
    messageId?: number,
    chatId?: number,
    messageText?: string,
    fromUsrFI?: string,
}

export interface IState {
    login: ILogin,
    mainPage: IMainPage,
    chat: IChat,
    error: IError,
}

export type SubscriberType = (messages: IChatMessage[]) => void;

export interface IChatMessage { //todo

}