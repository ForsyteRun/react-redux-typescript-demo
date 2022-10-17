import { ResultCodeEnum} from './../api/api';
import { Dispatch } from "redux";
import { ActionsType } from '../types/types';
import { meAPI } from '../api/meApi';
import { authAPI } from '../api/authApi';
import { securityApi } from '../api/securityApi';

const initialState = {
   email: null as string | null,
   login: null as string | null,
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
   authAC: (email: string | null, login: string | null, id: number | null, isAuth: boolean) => {
      return {type: 'minin/authReduser/SET_AUTH', email, login, id, isAuth} as const
   },
   getCaptcha: (url: string | null) => {
      return{type: 'minin/authReduser/get_Captcha', url} as const
   },
};

export const getHeaderThunkCreater = () => async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
      const res = await meAPI.authMe();
      if (res.data.resultCode === ResultCodeEnum.Success) {
         const { email, login, id } = res.data.data
         dispatch(actions.authAC(email, login, id, true))
      }
    else dispatch(actions.authAC(null, null, null, false))
   } catch (error) {
      throw new Error('Error in getHeaderThunkCreater' + error)
   }
};

type CaptchaType = {
   login: string | null,
   email: string | null,
   rememberMe: boolean,
   captcha: string | null
};

export const enterAuthThunkCreater = (values: CaptchaType, setSubmitting: (isSubmitting: boolean) => void) => 
async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
      let res = await authAPI.enterAuth(values.login, values.email, values.rememberMe, values.captcha);
      if (res) {
        getHeaderThunkCreater()
         //@ts-ignore
        setSubmitting(false);
      } else {
         getCaptchaThunk();
      } 
   } catch (error) {
      throw new Error('Error in enterAuthThunkCreater' + error); 
   }
};

export const outAuthThunkCreater = () => 
async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
      await authAPI.outAuth()
      dispatch(actions.authAC(null, null, null, false))   
   } catch (error) {
      throw new Error('Error in outAuthThunkCreater' + error);
   }
};

export const getCaptchaThunk = () => 
async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
        const res = await securityApi.getCaptcha();
   dispatch(actions.getCaptcha(res));
   } catch (error) {
      throw new Error('Error in getCaptchaThunk' + error);
   }
};