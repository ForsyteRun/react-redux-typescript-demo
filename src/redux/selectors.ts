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

export const getUsers = (state: AppState) => {
   return state.profile.users;
};

