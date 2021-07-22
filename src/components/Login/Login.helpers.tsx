import {IAuthData, IRegData, IResetData, IUserData} from "../../types";

export const initialState = { // затипизировать полностью
    // login: '',
    // password: '',
    // isAuth: false,
    // email: '',
    // resetPassword: '',
    // regData: {
    //     name: '',
    //     lastName: '',
    //     middleName: '',
    //     dateOfBirth: '',
    //     gender: '',
    //     sexual_preference: '',
    //     login: '',
    //     email: '',
    //     password: ''
    // }

    isAuth: false,
    authData: {
        email: '',
        password: ''
    },
    // regData: IRegData,
    // userData: IUserData,
    // resetData: IResetData
};