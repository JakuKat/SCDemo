import { combineReducers } from "redux";
import tasksReducer from "./tasksSlice";
import modalReducer from "./modalsSlice";

const appReducer = combineReducers({
  tasksReducer,
  modalReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
