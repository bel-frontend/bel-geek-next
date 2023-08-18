import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

import rootSaga from "./saga";
import rootReducer from "./reducers";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: storage,
  throttle: 100,
  version: 0,
  whitelist: ["auth", "locale", "sidebar", "cookies"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const SagaMiddleware = createSagaMiddleware();

//@ts-ignore
SagaMiddleware.run(rootSaga);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ thunk: false }).prepend(SagaMiddleware);
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export const wrapper = createWrapper<AppStore>(makeStore);
