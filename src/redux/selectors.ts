import { createSelector } from "reselect";
import { UserData } from "../types/types";
import {AppState} from './redux';

export const getLogin = (state: AppState) => {
   return state.auth.login;
};

export const getIsAuth = (state: AppState) => {
   return state.auth.isAuth;
};

export const getEmail = (state: AppState) => {
   return state.auth.email;
};

const downUsers = (state: AppState) => {
   return state.profile.users;
};

export const downReselect = createSelector(downUsers, (users: Array<UserData>): Array<UserData> => {
  return users.filter(el => el.id >= 2);
});


