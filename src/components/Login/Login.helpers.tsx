export const initialRegData = {
    firstName: '',
    lastName: '',
    middleName: '',
    birthday: '',
    gender: null,
    sexualPreference: null,
    email: '',
    password: '',
    isRegUser: false,
}

// export const initialUserData = {
//     id: 0,
//     firstName: '',
//     lastName: '',
//     middleName: '',
//     yearsOld: 0,
//     location: '',
//     card: {
//         biography: '',
//         workPlace: '',
//         position: '',
//         education: '',
//         rating: 0,
//         gender: null,
//         sexualPreference: null,
//         tags: [],
//     },
//     match: false,
// }

export const initialResetData = {
    id: 0,
    email: '',
    resetPassword: '',
    isValidEmail: null,
    isValidLink: null,
    isValidPass: null,
}

export const initialState = {
    isAuth: false,
    authData: {
        email: '',
        password: ''
    },
    regData: initialRegData,
    // userData: initialUserData,
    resetData: initialResetData
};