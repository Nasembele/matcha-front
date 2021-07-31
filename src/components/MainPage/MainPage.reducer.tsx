import {getArrayWithNewEl, giveNextUsers, initialState, setLikeUser} from "./MainPage.helpers";
import * as constants from "./MainPage.consts";
import {setLikeUserAC} from "./MainPageAC";
import {IAction, IMainPage} from "../../types";

export default function MainPageReducer(state: IMainPage = initialState, action: IAction) {
    switch (action.type) {
        case constants.SET_USER_ACCOUNT:
            return {
                ...state,
                account: action.payload
            };
        case constants.SET_USER_ORIENT:
            return {
                ...state,
                account: {
                    ...state.account,
                    orient: action.payload
                }
            };
        case constants.SET_USER_EDUCATION:
            return {
                ...state,
                account: {
                    ...state.account,
                    card: {
                        ...state.account.card,
                        education: action.payload
                    }
                }
            };
        case constants.SET_USER_WORK_PLACE:
            return {
                ...state,
                account: {
                    ...state.account,
                    card: {
                        ...state.account.card,
                        workPlace: action.payload
                    }
                }
            };
        case constants.SET_USER_POSITION:
            return {
                ...state,
                account: {
                    ...state.account,
                    card: {
                        ...state.account.card,
                        position: action.payload
                    }
                }
            };
        case constants.SET_USER_BIOGRAPHY:
            return {
                ...state,
                account: {
                    ...state.account,
                    card: {
                        ...state.account.card,
                        biography: action.payload
                    }
                }
            };
        case constants.SET_USER_TAGS:
            return {
                ...state,
                account: {
                    ...state.account,
                    card: {
                        ...state.account.card,
                        tags: getArrayWithNewEl(state.account.card.tags, action.payload)
                    }
                }
            };
        case constants.DELETE_USER_TAGS:
            return {
                ...state,
                account: {
                    ...state.account,
                    card: {
                        ...state.account.card,
                        tags: []
                    }
                }
            };
        case constants.SET_USERS:
            return {
                ...state,
                users: {
                    ...state.users,
                    us: action.payload,
                }
            };
        case constants.SET_LIKE_USER:
            return {
                ...state,
                likeUsers: setLikeUser(state.likeUsers, state.users[0]),
                users: {
                    ...state.users,
                    us: giveNextUsers(state.users)},
            };
        case constants.DELETE_NOT_LIKE_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    us: giveNextUsers(state.users)},
            };
        case constants.SET_USER_DATA:
            return {
                ...state,
                account: action.payload
            };
        case constants.SET_NEW_GENDER:
            return {
                ...state,
                account: {
                    ...state.account,
                    card: {
                        ...state.account.card,
                        gender: action.payload
                    }
                }
            };
        case constants.SET_NEW_SEXUAL_PREFERENCE:
            return {
                ...state,
                account: {
                    ...state.account,
                    card: {
                        ...state.account.card,
                        sexualPreference: action.payload
                    }
                }
            };
        default:
            return state;
    }
}