import {IMatches, IUserData} from "../../types";
import * as constants from "./Chat.consts";

export const setUserMatchesAC = (matches: IMatches) => ({
  type: constants.SET_USER_MATCHES,
  payload: matches
});