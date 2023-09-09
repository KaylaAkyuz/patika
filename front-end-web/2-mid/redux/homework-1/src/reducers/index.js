import { combineReducers } from "redux";
import notesReducer from "./noteSlice";
import filterReducer from "./filterSlice";

const rootReducer = combineReducers({
  notes: notesReducer,
  filter: filterReducer,
});

export default rootReducer;
