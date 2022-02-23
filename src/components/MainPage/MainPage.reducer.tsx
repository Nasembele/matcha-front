import {
  getArrayWithNewEl,
  giveNextUsers,
  initialState,
  setLikeUser,
  setPhotoParamHelp
} from "./MainPage.helpers";
import * as constants from "./MainPage.consts";
import {setLikeUserAC, setPhotoParam} from "./MainPageAC";
import {IAction, IMainPage, IPhotos, IUserData} from "../../types";
import {SET_ACC_BIRTHDAY, SET_FILTER_COMMON_TAGS, SET_FILTER_RATING, SET_VALID_NEW_EMAIL} from "./MainPage.consts";
import {addNewElemInArray} from "../../helpers";

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
            // tags: getArrayWithNewEl(state.account.card.tags, action.payload)
            tags: action.payload
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
        currentUser: {
          userData: action.payload[0],
          match: false
        },
      };
    case constants.SET_LIKE_USER:
      return {
        ...state,
        currentUser: {
          userData: state.users[1],
          match: false
        },
        likeUsers: setLikeUser(state.likeUsers, state.users[0]),
        users: giveNextUsers(state.users),
      };
    case constants.DELETE_NOT_LIKE_USER:
      return {
        ...state,
        currentUser: {
          userData: state.users[1],
          match: false
        },
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
    case constants.SET_FILTER_LOCATION:
      return {
        ...state,
        userFilters: {
          ...state.userFilters,
          location: action.payload
        }
      };
    case constants.SET_ACC_FIRST_NAME:
      return {
        ...state,
        account: {
          ...state.account,
          firstName: action.payload
        }
      };
    case constants.SET_ACC_LAST_NAME:
      return {
        ...state,
        account: {
          ...state.account,
          lastName: action.payload
        }
      };
    case constants.SET_ACC_MIDDLE_NAME:
      return {
        ...state,
        account: {
          ...state.account,
          middleName: action.payload
        }
      };
    case constants.SET_ACC_BIRTHDAY:
      return {
        ...state,
        account: {
          ...state.account,
          birthday: action.payload
        }
      };
    case constants.SET_VALID_PREV_EMAIL:
      return {
        ...state,
        changeAccountSetting: {
          ...state.changeAccountSetting,
          isValidPrevEmail: action.payload
        }
      };
    case constants.SET_NEW_EMAIL:
      return {
        ...state,
        changeAccountSetting: {
          ...state.changeAccountSetting,
          newEmail: action.payload
        }
      };
    case constants.SET_VALID_NEW_EMAIL:
      return {
        ...state,
        changeAccountSetting: {
          ...state.changeAccountSetting,
          isValidNewEmail: action.payload
        }
      };
    case constants.SET_CONFIRM_NEW_EMAIL:
      return {
        ...state,
        changeAccountSetting: {
          ...state.changeAccountSetting,
          isConfirmNewEmail: action.payload
        }
      };
    case constants.SET_CHANGE_PASS:
      return {
        ...state,
        changeAccountSetting: {
          ...state.changeAccountSetting,
          isChangePass: action.payload
        }
      };
    case constants.SET_VALID_LINK_CHANGE_EMAIL_PASS:
      return {
        ...state,
        changeAccountSetting: {
          ...state.changeAccountSetting,
          isValidEmailPassLink: action.payload
        }
      };
    case constants.SET_MATCH_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          match: true
        }
      };
    case constants.SET_USER_FILTER:
      return {
        ...state,
        userFilters: action.payload
      };
    case constants.ADD_USER_TO_USERS_LIST_FROM_LIKES_HISTORY:
      return {
        ...state,
        users: addNewElemInArray(state.users, action.payload, true),
        currentUser: {
          userData: action.payload,
          match: false
        }
      };
    case constants.ADD_USER_TO_USERS_LIST_FROM_VISITS_HISTORY:
      return {
        ...state,
        users: addNewElemInArray(state.users, action.payload, false),
        currentUser: {
          userData: action.payload,
          match: false
        }
      };
    case constants.SET_USER_STATUS:
      return {
        ...state,
        userInCardStatus: action.payload
      };
    default:
      return state;
  }
}