export interface IAction {
    type: string,
    payload: any
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
    biography: string,
    workPlace: string,
    position: string,
    education: string,
    rating: number,
    gender: 'male' | 'female' | null,
    sexualPreference: 'getero' | 'gay' | 'bisexual' | 'lesbi' | null,
    tags: Array<string>,
}

export interface IUserData {
    id: number;
    firstName: string,
    lastName: string,
    middleName: string,
    yearsOld: number,
    location: string,
    card: IUserCard,
    match: boolean
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
    email: string,
    password: string
}

export interface ILogin {
    isAuth: boolean,
    authData: IAuthData,
    regData: IRegData,
    // userData: IUserData,
    resetData: IResetData
}

export interface IMainPage {
    account: IUserData,
    users: IUserData[],
    likeUsers: IUserData[],
}

export interface IError {
    isServerError: boolean,
}

export interface IState {
    login: ILogin,
    mainPage: IMainPage,
    error: IError,
}