import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import courseEditorReducer from "./courseEditorReducer";
import courseListReducer from "./courseListReducer"
import loginReducer from "./loginReducer"
import thunk from 'redux-thunk';
import userPageReducer from "./userPageReducer";
import problemPageReducer from "./problemPageReducer"

const store = createStore(combineReducers({
    reducer,
    courseEditorReducer,
    courseListReducer,
    loginReducer,
    userPageReducer,
    problemPageReducer
  }), applyMiddleware(thunk))

export { store }