import { Dispatch } from "redux";
import { meAPI } from "../api/meApi";
import { ActionsType, ProfileType } from "../types/types";

const initialState = {
   profileInfo: {
      lookinForJob: null,
      lookinForJobDiiscription: null,
      fullName: null,
      id: 1,
      } as ProfileType,
   avatar: '',
   status: 'start'
};

type InitialState = typeof initialState;
type Actions = ActionsType<typeof actions>

export const myProfileReducer = (state: InitialState = initialState, action: Actions): InitialState => {
   switch (action.type) {
      case 'typescript/SET_IMAGE_PROFILE':
         return {
            ...state, 
            avatar: action.avatar
         };  
      case 'minin/statusReduser/GET_STATUS':
         return {
            ...state,
            status: action.status,
         };   
      case 'minin/statusReduser/UPDATE_STATUS':
         return {
            ...state,
            status: action.status,
         };
      case "typescript/SET_DATA_PROFILE":
         return Object.assign({}, state, {profileInfo: action.data} )
      default:
      return state
   }
};

export const actions = {
   getStatus: (status: string) => ({type: 'minin/statusReduser/GET_STATUS', status}as const),
   updateStatus: (status: string) => ({type: 'minin/statusReduser/UPDATE_STATUS', status}as const),
   setImageProfile: (avatar: string) => ({type: 'typescript/SET_IMAGE_PROFILE', avatar} as const),
   setDataProfile: (data: ProfileType) => ({type: 'typescript/SET_DATA_PROFILE', data} as const)
};

export const getStatusThunkCreater =
  () => async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
    try {
      const res = await meAPI.getStatus();
      dispatch(actions.getStatus(res.status)); 
    } catch (error) {
      throw new Error('Error in getNewsStatusCreater' + error);
    }
  };

export const updateStatusThunkCreater =
  (status: string) => async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
    try {  
      const res = await meAPI.updateStatus(status);
      dispatch(actions.updateStatus(res.status));
    } catch (error) {
      throw new Error('Error in updateNewsStatusCreater' + error);
    }
  };

export const setImageProfile = (url: string) => async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
      const avatar = await meAPI.setAvatar(url)
      dispatch(actions.setImageProfile(avatar))
      }
   catch (error) {
      throw new Error('Error in setImageProfile' + error)
   }
};

export const getImageProfile = () => async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
      const avatar = await meAPI.getAvatar()
      dispatch(actions.setImageProfile(avatar))
      }
   catch (error) {
      throw new Error('Error in getImageProfile' + error)
   }
};

export const getProfileData = () => async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
      const res = await meAPI.getProfileInfo()
      dispatch(actions.setDataProfile(res))
      }
   catch (error) {
      throw new Error('Error in getProfileData' + error)
   }
};

export const setProfileData = (data: ProfileType) => async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
      const res = await meAPI.setProfileInfo(data)
      dispatch(actions.setDataProfile(res))
      }
   catch (error) {
      throw new Error('Error in setProfileData' + error)
   }
};


