
import { ActionType } from '../types/types';
import { Dispatch } from "redux";
import { followUnFollowHelper } from "../common/helperReduser";
import { UserData } from '../types/types';
import { usersApi } from '../api/getUsers';
import { meAPI } from '../api/meApi';

const initialState = {
  users: [] as Array<UserData>,
  pageSize: 5 as number,
  totalUserCount: 50 as number,
  currentPage: 1 as number,
  amountPagi: 5 as number,
  isLoading: false,
  followingProgress: [] as Array<number>,
  status: "enter status" as string,
};

type InitialState = typeof initialState;
type Actions = ReturnType<ActionType<typeof actions>>

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
        users: [...state.users, ...action.users],
      };
    case 'minin/statusReduser/CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.pageId,
      };
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
    case 'minin/statusReduser/IS_FOLLOWING_PROGRESS':
       return {
          ...state,
          followingProgress: action.followingProgress
             ? [...state.followingProgress, action.id]
             : state.followingProgress.filter((el: number) => el !== action.id)
       }
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
  totalPages: (numPages: number) => ({type: 'minin/statusReduser/total_pages', numPages}as const), 
  toggleLoading: (isLoading: boolean) => ({type: 'minin/statusReduser/toggle_loading', isLoading}as const),
  isFollowing: (followingProgress: boolean, id: number) => ({type: 'minin/statusReduser/IS_FOLLOWING_PROGRESS', id, followingProgress} as const),
  getStatus: (status: string) => ({type: 'minin/statusReduser/GET_STATUS', status}as const),
  updateStatus: (status: string) => ({type: 'minin/statusReduser/UPDATE_STATUS', status}as const),
};


//thunk-creaters
type DispatchType = Dispatch<Actions>;
type StateType = () => InitialState;

export const getUsersThunkCreater =
  (pageSize: number, currentPage: number) =>
  async (dispatch: DispatchType, getState: StateType) => {
    try {
      dispatch(actions.toggleLoading(false));
      const res = await usersApi.getUsers(pageSize, currentPage);
      dispatch(actions.setUsers(res.data.data.users));
      dispatch(actions.totalPages(res.data.headers['x-total-count']));
      dispatch(actions.toggleLoading(false));
    } catch (error) {
      throw new Error('Error in getUsersThunkCreater' + error);
    }
  };

export const getPageChangeThunkCreater =
  (pageSize: number, page: number) =>
  async (dispatch: DispatchType, getState: StateType) => {
    try {
      dispatch(actions.currentPage(page));
      dispatch(actions.toggleLoading(true));
      let res = await usersApi.getUsers(pageSize, page);
      dispatch(actions.setUsers(res.data.data.users));
      dispatch(actions.toggleLoading(false)); 
    } catch (error) {
      throw new Error('Error in getPageChangeThunkCreater' + error);
    }
  };

export const getNewsThunkCreater =
  () => async (dispatch: DispatchType, getState: StateType) => {
    try {
      let res = await meAPI.getStatus();
      dispatch(actions.getStatus(res.status)); 
    } catch (error) {
      throw new Error('Error in getNewsThunkCreater' + error);
    }
  };

export const updateNewsThunkCreater =
  (status: string) => async (dispatch: DispatchType, getState: StateType) => {
    try {
      await meAPI.updateStatus(status);
      dispatch(actions.updateStatus(status));
    } catch (error) {
      throw new Error('Error in updateNewsThunkCreater' + error);
    }
  };

export const getFollowThunkCreater =
  (followingProgress: boolean, userId: number) => async (dispatch: DispatchType, getState: StateType) => {
    try {
      await usersApi.setFollow(userId);
      dispatch(actions.followAC(userId));
      dispatch(actions.isFollowing(followingProgress, userId))
    } catch (error) {
      throw new Error('Error in getFollowThunkCreater' + error);
    }
  };

export const getUnFollowThunkCreater =
  (followingProgress: boolean, userId: number) => async (dispatch: DispatchType, getState: StateType) => {
    try {
      await usersApi.setUnFollow(userId);
      dispatch(actions.unFollowAC(userId));
      dispatch(actions.isFollowing(followingProgress, userId))
    } catch (error) {
      throw new Error('Error in getUnFollowThunkCreater' + error);
    }
};
