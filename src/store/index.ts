import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const configureAppStore = () => {
  const reduxSagaMonitorOptions = {};

  const store = configureStore({
    reducer,
    devTools: true,
  });

  return store;
};
const store = configureAppStore();

export { store };

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
