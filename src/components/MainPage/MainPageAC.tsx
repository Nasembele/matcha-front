import * as constants from "./MainPage.consts";
import {IUserData} from "../../types";

export const setUserAccountAC = (userAccountData: IUserData) => ({
    type: constants.SET_USER_ACCOUNT,
    payload: userAccountData
});

// export const changeOrientAC = (orient: any) => ({
//     type: constants.SET_USER_ORIENT,
//     payload: orient
// });

export const changeEducationAC = (education: string) => ({
    type: constants.SET_USER_EDUCATION,
    payload: education
});

export const changeWorkPlaceAC = (workPlace: string) => ({
    type: constants.SET_USER_WORK_PLACE,
    payload: workPlace
});

export const changePositionAC = (position: string) => ({
    type: constants.SET_USER_POSITION,
    payload: position
});

export const changeBiographyAC = (biography: string) => ({
    type: constants.SET_USER_BIOGRAPHY,
    payload: biography
});

export const changeTagsAC = (tag: Array<string>) => ({
    type: constants.SET_USER_TAGS,
    payload: tag
});

export const deleteTagsAC = () => ({
    type: constants.DELETE_USER_TAGS,
});

export const setUsersAC = (users: Array<IUserData>) => ({
    type: constants.SET_USERS,
    payload: users
});

export const setLikeUserAC = () => ({
    type: constants.SET_LIKE_USER,
});

export const deleteNotLikeUserAC = () => ({
    type: constants.DELETE_NOT_LIKE_USER,
});

export const setUserDataAC = (userData: IUserData) => ({
    type: constants.SET_USER_DATA,
    payload: userData
});

export const changeGenderAC = (gender: string) => ({
    type: constants.SET_NEW_GENDER,
    payload: gender
});

export const changeSexualPreferenceAC = (sexualPreference: string) => ({
    type: constants.SET_NEW_SEXUAL_PREFERENCE,
    payload: sexualPreference
});