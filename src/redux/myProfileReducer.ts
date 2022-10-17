import { Dispatch } from "redux";
import { meAPI } from "../api/meApi";
import { ActionsType, ProfileType } from "../types/types";

const initialState = {
   profileInfo: {
      lookinForJob: null,
      lookinForJobDiiscription: null,
      fullName: null,
      id: 1,
      image: ''
      } as ProfileType,
   editLogoForm: false
};

type InitialState = typeof initialState;
type Actions = ActionsType<typeof actions>

export const myProfileReducer = (state: InitialState = initialState, action: Actions): InitialState => {
   switch (action.type) {
      case 'typescript/SET_IMAGE_PROFILE':
         return  Object.assign({}, state, {image: action.url})        
      default:
      return state
   }
};

export const actions = {
   setImageProfile: (url: string) => ({type: 'typescript/SET_IMAGE_PROFILE', url} as const),
};

export const setImageProfileThunk = (url: string) => async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
      const data = await meAPI.setAvatar(url)
      dispatch(actions.setImageProfile(data))
      }
   catch (error) {
      throw new Error('Error in getHeaderThunkCreater' + error)
   }
};

export const getImageProfile = () => async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
      const data = await meAPI.getAvatar()
      dispatch(actions.setImageProfile(data))
      }
   catch (error) {
      throw new Error('Error in getHeaderThunkCreater' + error)
   }
};

export const getProfileData = () => async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
      // const data = await meAPI.
      // dispatch(actions.setImageProfile(data))
      }
   catch (error) {
      throw new Error('Error in getHeaderThunkCreater' + error)
   }
};

export const upLoadProfileData = (url: ProfileType) => async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
      // const data = await meAPI.
      // dispatch(actions.setImageProfile(data))
      }
   catch (error) {
      throw new Error('Error in getHeaderThunkCreater' + error)
   }
};


