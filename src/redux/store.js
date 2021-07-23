import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import courseEditorReducer from "./courseEditorReducer";
import courseListReducer from "./courseListReducer"
import problemListReducer from "./problemListReducer";
import loginReducer from "./loginReducer"
import thunk from 'redux-thunk';
import userPageReducer from "./userPageReducer";

const store = createStore(combineReducers({
    reducer,
    courseEditorReducer,
    courseListReducer,
    problemListReducer,
    loginReducer,
    userPageReducer
  }), applyMiddleware(thunk))

export { store }