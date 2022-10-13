import { Dispatch } from "redux";
import { ActionType } from "../types/types";
import { getHeaderThunkCreater } from "./authReduser";

const initialState = {
  isInitial: false,
};

export type InitialState = typeof initialState;
type Actions = ReturnType<ActionType<typeof actions>>

export const initialReducer = (
  state: InitialState = initialState,
  action: Actions
): InitialState => {
  switch (action.type) {
    case 'minin/initialReduser/IS_INITIAL':
      return {
        ...state,
        isInitial: true,
      };
    default:
      return state;
  }
};

export default initialReducer;

const actions = {
  initialAC: () => ({type: 'minin/initialReduser/IS_INITIAL'} as const)
}


export const getInitialThunkCreater =
  () => async (dispatch: Dispatch<Actions>, getState: () => InitialState) => {
    try {
      await getHeaderThunkCreater();
      dispatch(actions.initialAC());
    } catch (error) {
      throw new Error("Error in getInitialThunkCreater" + error);
    }
  };
