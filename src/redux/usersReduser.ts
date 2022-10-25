import { Dispatch } from "redux";
import { usersApi } from '../api/getUsers';
import { followUnFollowHelper } from "../common/helperReduser";
import { ActionsType, UserData } from '../types/types';
;

const initialState = {
  users: [] as Array<UserData>,
  userProfile: {} as UserData,
  pageSize: 3 as number,
  offset: 0 as number,
  totalUserCount: 10 as number,
  currentPage: 1 as number,
  amountPagi: 5 as number,
  isLoading: false,
  followingProgress: [] as Array<number>,
  btnDisable: false,
  filter: {
    users: '' as string,
    follow: null as boolean | null
  }
};

type InitialState = typeof initialState;
export type FilterType = typeof initialState.filter;
type Actions = ActionsType<typeof actions>

//reduser - logic of statusPage
export const usersReduser = (
  state: InitialState = initialState,
  action: Actions
): InitialState => {
  switch (action.type) {
    case 'minin/statusReduser/FOLLOW':
      return {
        ...state,
        users: followUnFollowHelper(state.users, action.userId, true),
      };
    case 'minin/statusReduser/UNFOLLOW':
      return {
        ...state,
        users: followUnFollowHelper(state.users, action.userId, false),
      };
    case 'minin/statusReduser/SETUSERS':
      return {
        ...state,
        users: action.users
      };
    case "minin/statusReduser/filter":
      return {
        ...state,
        filter: action.filter
      };
    case 'minin/statusReduser/CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.pageId,
      };
    case 'minin/statusReduser/userProfile':
      return Object.assign({}, state, {userProfile: action.profile} )
      ;
    case 'minin/statusReduser/total_pages':
      return {
        ...state,
        totalUserCount: action.numPages,
      };
    case 'minin/statusReduser/toggle_loading':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case 'minin/statusReduser/isBtnDisable':
      return {
        ...state,
        btnDisable: action.btnDisable,
      };
    case 'minin/statusReduser/IS_FOLLOWING_PROGRESS':
       return {
          ...state,
          followingProgress: action.followingProgress
             ? [...state.followingProgress, action.id]
             : state.followingProgress.filter((el: number) => el !== action.id)
       }
    default:
      return state;
  }
};

export default usersReduser;

//action-creaters
export const actions = {
  followAC: (userId: number) => ({type: 'minin/statusReduser/FOLLOW', userId}as const),
  unFollowAC: (userId: number) => ({type: 'minin/statusReduser/UNFOLLOW', userId}as const),
  setUsers: (users: Array<UserData>) => ({type: 'minin/statusReduser/SETUSERS', users}as const),
  currentPage: (pageId: number) => ({type: 'minin/statusReduser/CURRENT_PAGE', pageId}as const),
  userProfile: (profile: UserData) => ({type: 'minin/statusReduser/userProfile', profile}as const),
  totalPages: (numPages: number) => ({type: 'minin/statusReduser/total_pages', numPages}as const), 
  toggleLoading: (isLoading: boolean) => ({type: 'minin/statusReduser/toggle_loading', isLoading}as const),
  isBtnDisable: (btnDisable: boolean) => ({type: 'minin/statusReduser/isBtnDisable', btnDisable}as const),
  isFollowing: (followingProgress: boolean, id: number) => ({type: 'minin/statusReduser/IS_FOLLOWING_PROGRESS', id, followingProgress} as const),
  filterUsers: (filter: FilterType) => ({type: 'minin/statusReduser/filter', filter} as const),
};


//thunk-creaters
type DispatchType = Dispatch<Actions>;
type StateType = () => InitialState;

export const getUsersThunkCreater =
  (pageSize: number, offset: number) =>
  async (dispatch: DispatchType, getState: StateType) => {
    try {
      dispatch(actions.toggleLoading(false));
      const users = await usersApi.getUsers(pageSize, offset);
      dispatch(actions.setUsers(users));
      //dispatch(actions.totalPages(users.));
      dispatch(actions.toggleLoading(false));
    } catch (error) {
      throw new Error('Error in getUsersThunkCreater' + error);
    }
  };

export const getUserProfileThunkCreater = (id: number) => 
async (dispatch: DispatchType, getState: StateType) => {
  try {
    const data = await usersApi.getUserProfile(id)
    dispatch(actions.userProfile(data))
  } catch (error) {
    throw new Error('Error in getUserProfileThunkCreater' + error);
  }
}

export const getPageChangeThunkCreater =
  (pageSize: number, pageNumber: number, offset: number,  filter?: FilterType) =>
  async (dispatch: DispatchType, getState: StateType) => {
    try {
      dispatch(actions.currentPage(pageNumber));
      dispatch(actions.toggleLoading(true));
      let res = await usersApi.getUsers(pageSize, offset, filter?.users, filter?.follow);
      if(filter)  {
        dispatch(actions.filterUsers(filter))
     }
      dispatch(actions.setUsers(res));
      dispatch(actions.toggleLoading(false)); 
    } catch (error) {
      throw new Error('Error in getPageChangeThunkCreater' + error);
    }
  };

export const getFollowThunkCreater =
  (userId: number) => async (dispatch: DispatchType, getState: StateType) => {
    try {
      dispatch(actions.isFollowing(true, userId))
      const res = await usersApi.setFollow(userId);
      dispatch(actions.followAC(res.id));
      dispatch(actions.isFollowing(false, userId))
    } catch (error) {
      throw new Error('Error in getFollowThunkCreater' + error);
    }
  };

export const getUnFollowThunkCreater =
  (userId: number) => async (dispatch: DispatchType, getState: StateType) => {
    try {
      dispatch(actions.isFollowing(true, userId))
      const res = await usersApi.setUnFollow(userId);
      dispatch(actions.unFollowAC(res.id));
      dispatch(actions.isFollowing(false, userId))
    } catch (error) {
      throw new Error('Error in getUnFollowThunkCreater' + error);
    }
};

