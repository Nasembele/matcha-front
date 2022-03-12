export const initialRegData = {
    firstName: '',
    lastName: '',
    middleName: '',
    userName: '',
    birthday: '',
    gender: null,
    sexualPreference: null,
    email: '',
    password: '',
    isRegUser: null,
}

export const initialResetData = {
    id: 0,
    email: '',
    resetPassword: '',
    isValidEmail: null,
    isValidLink: null,
    isValidPass: null,
}

export const initialState = {
    isAuth: null,
    authData: {
        login: '',
        password: ''
    },
    regData: initialRegData,
    resetData: initialResetData
};