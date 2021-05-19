import * as constants from "./MainPage.consts";

export const setUserAccountAC = (userAccountData) => ({
    type: constants.SET_USER_ACCOUNT,
    payload: userAccountData
});

export const changeOrientAC = (orient) => ({
    type: constants.SET_USER_ORIENT,
    payload: orient
});

export const changeEducationAC = (education) => ({
    type: constants.SET_USER_EDUCATION,
    payload: education
});

export const changeWorkPlaceAC = (workPlace) => ({
    type: constants.SET_USER_WORK_PLACE,
    payload: workPlace
});

export const changePositionAC = (position) => ({
    type: constants.SET_USER_POSITION,
    payload: position
});

export const changeBiographyAC = (biography) => ({
    type: constants.SET_USER_BIOGRAPHY,
    payload: biography
});

export const changeTagsAC = (tag) => ({
    type: constants.SET_USER_TAGS,
    payload: tag
});

export const deleteTagsAC = () => ({
    type: constants.DELETE_USER_TAGS,
});

export const setUsersAC = (users) => ({
    type: constants.SET_USERS,
    payload: users
});

export const setLikeUserAC = () => ({
    type: constants.SET_LIKE_USER,
});

export const deleteNotLikeUserAC = () => ({
    type: constants.DELETE_NOT_LIKE_USER,
});
