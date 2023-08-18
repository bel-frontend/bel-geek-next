import * as apiHelpers from "react_redux_api";
import notificationsReducer from "@/modules/notification";
import { authReducer } from "@/modules/auth";
import { ViewPortReducer } from "@/modules/viewport";
import { cookiesReducer } from "@/modules/cookies";
import { combineReducers } from "redux";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";

const {
  modules: { apiDefaultReducer },
} = apiHelpers;

export interface State {
  tick: string;
}

const reducer = (state: State = { tick: "init" }, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case "TICK":
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  api: apiDefaultReducer,
  auth: authReducer,
  notification: notificationsReducer,
  viewport: ViewPortReducer,
  cookies: cookiesReducer,
  hydrate: reducer,
});
