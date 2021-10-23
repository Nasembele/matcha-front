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

export const setPhotoContent = (photo: any, number: number) => ({
    type: constants.SET_PHOTO_CONTENT,
    payload: {
        number: number,
        photo: photo
    }
});

export const setPhotoParam = (number: number, name: string, format: string) => ({
    type: constants.SET_PHOTO_PARAM,
    payload: {
        number: number,
        name: name,
        format: format
    }
});

export const setStartFilterAgeAC = (startAge: string) => ({
    type: constants.SET_START_FILTER_AGE,
    payload: startAge
});

export const setEndFilterAgeAC = (endAge: string) => ({
    type: constants.SET_END_FILTER_AGE,
    payload: endAge
});

export const setFilterRatingAC = (rating: string) => ({
    type: constants.SET_FILTER_RATING,
    payload: rating
});

export const setFilterCommonTagsAC = (commonTags: string) => ({
    type: constants.SET_FILTER_COMMON_TAGS,
    payload: commonTags
});

export const changeAccFirstNameAC = (name: string) => ({
    type: constants.SET_ACC_FIRST_NAME,
    payload: name
});

export const changeAccLastNameAC = (lastName: string) => ({
    type: constants.SET_ACC_LAST_NAME,
    payload: lastName
});

export const changeAccMiddleNameAC = (middleName: string) => ({
    type: constants.SET_ACC_MIDDLE_NAME,
    payload: middleName
});

export const changeAccBirthdayAC = (date: string) => ({
    type: constants.SET_ACC_BIRTHDAY,
    payload: date
});

export const setValidPrevEmailAC = (isValidPrevEmail: boolean) => ({
    type: constants.SET_VALID_PREV_EMAIL,
    payload: isValidPrevEmail
});

export const setNewEmailAC = (newEmail: string) => ({
    type: constants.SET_NEW_EMAIL,
    payload: newEmail
});

export const setValidNewEmailAC = (isValidNewEmail: boolean) => ({
    type: constants.SET_VALID_NEW_EMAIL,
    payload: isValidNewEmail
});

export const setConfirmNewEmailAC = (isConfirmNewEmail: boolean) => ({
    type: constants.SET_CONFIRM_NEW_EMAIL,
    payload: isConfirmNewEmail
});

export const setChangePassAC = (isChangePass: boolean) => ({
    type: constants.SET_CHANGE_PASS,
    payload: isChangePass
});

export const setIsValidLinkAC = (isValidLink: boolean) => ({
    type: constants.SET_VALID_LINK_CHANGE_EMAIL_PASS,
    payload: isValidLink
});


