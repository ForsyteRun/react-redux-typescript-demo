import { profileReduser } from "./profileReduser";
import { usersReduser } from "./usersReduser";
import { initialReducer } from "./initialReducer";
import { authReduser } from "./authReduser";
import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { myProfileReducer } from "./myProfileReducer";

const rootReduser = combineReducers({
  profile: profileReduser,
  users: usersReduser,
  init: initialReducer,
  auth: authReduser,
  myProfile: myProfileReducer,
});


const composeEnhancers =
//@ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);


export type AppState = ReturnType<typeof rootReduser>;

export const store = createStore(rootReduser, enhancer);
//@ts-ignore
window._store_ = store;

export type AppDispatch = typeof store.dispatch


