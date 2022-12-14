import { authAPI } from '../api/authApi';
import { securityApi } from '../api/securityApi';
import { FormType } from '../Auth';
import { ActionsType, ThunkType } from '../types/types';
import { ResultCodeEnum } from './../api/api';

const initialState = {
   email: null as string | null,
   login: null as string | number |null,
   id: null as number | null,
   rememberMe: false,
   isLoading: false,
   isAuth: false,
   captcha: '' as string | null
};

export type InitialState = typeof initialState;
type Actions = ActionsType<typeof actions>

export const authReduser = (state: InitialState = initialState, action: Actions): InitialState => {
   switch (action.type) {
      case 'minin/authReduser/SET_AUTH':
         return {
            ...state,
            ...action,
         }
      case 'minin/authReduser/get_Captcha':
         return {
            ...state, captcha: action.url
         }
      default:
         return state;
   }
};

export default authReduser;

const actions = {
   authAC: (email: string | null, login: string | number |null, id: number | null, isAuth: boolean,) => {
      return {type: 'minin/authReduser/SET_AUTH', email, login, id, isAuth} as const
   },
   getCaptcha: (url: string | null) => {
      return{type: 'minin/authReduser/get_Captcha', url} as const
   },
};

export const getAuthThunkCreater = (): ThunkType<Actions>=> async (dispatch, getState) => {
   try {
      const res = await authAPI.authMe();
      if (res.resultCode === ResultCodeEnum.Success) {
         const{email, login, id} = res.data;
         dispatch(actions.authAC(email, login, id, true))
      }else {
         dispatch(actions.authAC(null, null, null, false))
      }
   } catch (error) {
      throw new Error('Error in getAuthThunkCreater' + error)
   }
};

export const enterAuthThunkCreater = (values: FormType): ThunkType<Actions> => 
async (dispatch, getState) => {
   try {
      let res = await authAPI.enterAuth(values.email, values.login, values.rememberMe, values.captcha);    
      if (res.resultCode === ResultCodeEnum.Success) {
         dispatch(actions.authAC(null, null, null, false))
         dispatch(getAuthThunkCreater() as any)
      } else {
         dispatch(getCaptchaThunk() as any)
      } 
   } catch (error) {
      throw new Error('Error in enterAuthThunkCreater' + error); 
   }
};

export const outAuthThunkCreater = (): ThunkType<Actions> => 
async (dispatch, getState) => {
   debugger;
   try {
      await authAPI.outAuth()
      dispatch(actions.authAC(null, null, null, false))
     
   } catch (error) {
      throw new Error('Error in outAuthThunkCreater' + error);
   }
};

export const getCaptchaThunk = (): ThunkType<Actions> => 
async (dispatch, getState) => {
   try {
        const res = await securityApi.getCaptcha();
   dispatch(actions.getCaptcha(res));
   } catch (error) {
      throw new Error('Error in getCaptchaThunk' + error);
   }
};