import { profileReduser } from "./profileReduser";
import { usersReduser } from "./usersReduser";
import { initialReducer } from "./initialReducer";
import { authReduser } from "./authReduser";
import {
  applyMiddleware,
  combineReducers,
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

export type AppState = ReturnType<typeof rootReduser>;

export const store = createStore(rootReduser, applyMiddleware(thunk));
