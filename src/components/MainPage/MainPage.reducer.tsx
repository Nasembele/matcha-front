import {
    getArrayWithNewEl,
    giveNextUsers,
    initialState,
    setLikeUser,
    setPhotoParamHelp
} from "./MainPage.helpers";
import * as constants from "./MainPage.consts";
import {setLikeUserAC, setPhotoParam} from "./MainPageAC";
import {IAction, IMainPage, IPhotos} from "../../types";
import {SET_FILTER_COMMON_TAGS, SET_FILTER_RATING} from "./MainPage.consts";

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
                users: action.payload,
            };
        case constants.SET_LIKE_USER:
            return {
                ...state,
                likeUsers: setLikeUser(state.likeUsers, state.users[0]),
                users: giveNextUsers(state.users)
            };
        case constants.DELETE_NOT_LIKE_USER:
            return {
                ...state,
                users: giveNextUsers(state.users)
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
        case constants.SET_PHOTO_CONTENT:
            return {
                ...state,
                account: {
                    ...state.account,
                    card: {
                        ...state.account.card,
                        // photos: setPhotoContentToArray(state.account.card.photos, action.payload)
                        photos: state.account.card.photos?.map((el: IPhotos, index: number) => {
                            if (index === action.payload?.number) {
                                return {
                                    ...el,
                                    // displayContent: `data:${el.data.format};base64,${action.payload?.photo}`,
                                    // data: {
                                        ...el,
                                        content: action.payload?.photo
                                    // },
                                }
                            } else {
                                return el
                            }
                        })
                    }
                }
            };
        case constants.SET_PHOTO_PARAM:
            return {
                ...state,
                account: {
                    ...state.account,
                    card: {
                        ...state.account.card,
                        // photos:
                        photos: setPhotoParamHelp(state.account.card.photos, action.payload)
                        //   state.account.card.photos.map((el: IPhotos, index: number) => {
                        //     if (index === action.payload?.number) {
                        //         return {
                        //             ...el,
                        //             data: {
                        //                 ...el.data,
                        //                 name: action.payload?.name,
                        //                 format: action.payload?.format
                        //             },
                        //         }
                        //     } else {
                        //         return el
                        //     }
                        // })
                    }
                }
            };
        case constants.SET_START_FILTER_AGE:
            return {
                ...state,
                userFilters: {
                    ...state.userFilters,
                    ageBy: action.payload
                }
            };
        case constants.SET_END_FILTER_AGE:
            return {
                ...state,
                userFilters: {
                    ...state.userFilters,
                    ageTo: action.payload
                }
            };
        case constants.SET_FILTER_RATING:
            return {
                ...state,
                userFilters: {
                    ...state.userFilters,
                    rating: action.payload
                }
            };
        case constants.SET_FILTER_COMMON_TAGS:
            return {
                ...state,
                userFilters: {
                    ...state.userFilters,
                    commonTagsCount: action.payload
                }
            };
        default:
            return state;
    }
}