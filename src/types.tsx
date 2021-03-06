export interface IAction {
  type: string,
  payload: any
}

export interface IPhotos {
  content: string,
  format: string,
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
  gender: 'male' | 'female' | null,
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
  filter?: IUserFilter,
  isUserFromLikeHistory?: boolean,
  isUserFromVisitHistory?: boolean,
  status: string,
  lastAction?: string
}

export interface IRegData {
  firstName: string,
  lastName: string,
  middleName: string,
  userName: string,
  birthday: string,
  gender: 'male' | 'female' | null,
  sexualPreference: 'getero' | 'gay' | 'bisexual' | 'lesbi' | null,
  email: string,
  password: string,
  isRegUser: boolean | null,
}

export interface IAuthData {
  login: string,
  password: string
}

export interface ILogin {
  isAuth: null | boolean,
  authData: IAuthData,
  regData: IRegData,
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
    isConfirmNewEmail: null | boolean,
    isValidEmailPassLink: null | boolean,
    isChangePass: null | boolean
  },
  users: IUserData[],
  hasAddedUserInHistory: boolean | null,
  likeUsers: IUserData[],
  userFilters: IUserFilter,
  currentUser?: IUserDataWithMatch,
  userInCardStatus?: IStatus[]
}

export interface IUserDataWithMatch {
  userData: IUserData,
  match: boolean
}

export interface IError {
  isServerError: boolean,
}

export interface IMatches {
  id: number,
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
  type: string,
  typeInfo?: string
}

export interface ICurrentUserMessages {
  messages: IMessage[],
  oldestMessagesId?: number,
  freshMessagesId?: number
}

export interface IStatus {
  userId: 11245,
  status: "OFFLINE",
  lastAction: "2021-12-20 22:28:32"
}

export interface IChat {
  chatToken: string,
  chatFingerprint: string,
  isOpenChatRoom: boolean,
  openChatId: number,
  toUserId: number,
  pairs: IMatches[],
  messages: IMatches[],
  likes: IMatches[],
  visits: IMatches[],
  currentUserMessages?: ICurrentUserMessages,
  userInChat?: IUserData,
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

export interface IChatMessage {}