export interface IAction {
    type: string,
    payload: any
}

export interface IResetData {
    email: string,
    resetPassword: string,
    isResetUser: boolean,
}

export interface IUserCard {
    biography: string,
    workPlace: string,
    position: string,
    education: string,
    rating: number,
    gender: 'male' | 'female',
    sexualPreference: 'getero' | 'gay' | 'bisexual' | 'lesbi',
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
    gender: 'male' | 'female',
    sexualPreference: 'getero' | 'gay' | 'bisexual' | 'lesbi',
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
    regData?: IRegData,
    userData?: IUserData,
    resetData?: IResetData
}

export interface IError {
    isServerError: boolean,
}

export interface IState {
    login: ILogin,
    error: IError,
}