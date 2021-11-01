export interface IAction {
    type: string,
    payload: any
}

export interface IPhotos {

        content: string,
        format: string,
        // name: string,
        action: 'save' | 'delete' | null,
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
    match?: boolean,
    filter?: IUserFilter
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

export interface IUserFilter {
    ageBy?: string,
    ageTo?: string,
    rating?: string,
    commonTagsCount?: string,
    location?: string
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
}

export interface IError {
    isServerError: boolean,
}

export interface IState {
    login: ILogin,
    mainPage: IMainPage,
    error: IError,
}