import { Dispatch } from 'redux';
import { usersApi } from '../api/getUsers';
import { ActionType, UserData } from '../types/types';

const initialState = {
   isFollow: false,
   users: [] as Array<UserData>,
   profileInfo: {
      lookinForJob: null as string | null,
      lookinForJobDiiscription: null as string | null,
      fullName: null as string | null,
      id: 1,
      image: null as string | null
   }
};

type InitialState = typeof initialState;
type Actions = ReturnType<ActionType<typeof actions>>

export const profileReduser = (state: InitialState = initialState, action: Actions):InitialState => {
   switch (action.type) {
      case 'typescript/SET_USERS':
         return {
            ...state, users: [...state.users, action.users ] as Array<UserData>
         }
      default:
         return state;
   }
};

const actions = {
   setUsers: (users: Array<UserData>) => ({type: 'typescript/SET_USERS', users} as const),
};

export const setFollowUnFollow = (pageSize: number, currentPage: number) => 
async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
   try {
      let users = await usersApi.getUsers(pageSize, currentPage);
      dispatch(actions.setUsers(users))   
   } catch (error) {
      throw new Error('Error in setFollowUnFollow' + error); 
   } 
};

// export const setPhotoProfile = (url: string) => 
// async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
//    try {
//       //api
//       dispatch(actions.setImageProfile(url))
//    } catch (error) {
//       throw new Error('Error in setPhotoProfile' + error); 
//    }
// };

export default profileReduser;