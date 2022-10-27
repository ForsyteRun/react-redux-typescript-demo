import { ActionsType } from './../types/types';

const initialState = {
  filter: {
    last10: false
  }
};

type InitialState = typeof initialState;
type Actions = ActionsType<typeof actions>

export const postsReduser = (state: InitialState = initialState, action: Actions): InitialState => {{}
  switch (action.type) {
    case 'redux/filter_LAST10':
      return Object.assign({}, state, {last10: action.last10})  
    default:
      return state
  }
};

const actions = {
  filterAC: (last10: boolean) => ({type: 'redux/filter_LAST10', last10} as const)
}
