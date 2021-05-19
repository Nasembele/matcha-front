import {getArrayWithNewEl, giveNextUsers, initialState, setLikeUser} from "./MainPage.helpers";
import * as constants from "./MainPage.consts";
import {setLikeUserAC} from "./MainPageAC";

export default function MainPageReducer(state = initialState, action) {
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
                    education: action.payload
                }
            };
        case constants.SET_USER_WORK_PLACE:
            return {
                ...state,
                account: {
                    ...state.account,
                    workPlace: action.payload
                }
            };
        case constants.SET_USER_POSITION:
            return {
                ...state,
                account: {
                    ...state.account,
                    position: action.payload
                }
            };
        case constants.SET_USER_BIOGRAPHY:
            return {
                ...state,
                account: {
                    ...state.account,
                    biography: action.payload
                }
            };
        case constants.SET_USER_TAGS:
            return {
                ...state,
                account: {
                    ...state.account,
                    tags: getArrayWithNewEl(state.account.tags, (action.payload))
                }
            };
        case constants.DELETE_USER_TAGS:
            return {
                ...state,
                account: {
                    ...state.account,
                    tags: []
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
                likeUsers: setLikeUser(state.likeUsers, state.users.us[0]),
                users: {
                    ...state.users,
                    us: giveNextUsers(state.users.us)},
            };
        case constants.DELETE_NOT_LIKE_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    us: giveNextUsers(state.users.us)},
            };
        default:
            return state;
    }
}