import  profileReduser  from './profileReduser';
import  statusReduser  from './statusReduser';
import  initialReducer  from './initialReducer';
import  authReduser  from './authReduser';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import { myProfileReducer } from './myProfileReducer';

const rootReduser = combineReducers({
   profile: profileReduser, 
   status: statusReduser,
   init: initialReducer,
   auth: authReduser, 
   myProfile: myProfileReducer,
});

export type AppState = ReturnType<typeof rootReduser>;

export const store = createStore(rootReduser, applyMiddleware(thunk));

