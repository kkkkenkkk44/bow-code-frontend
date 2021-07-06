import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import courseEditorReducer from "./courseEditorReducer";
import courseListReducer from "./courseListReducer"
import loginReducer from "./loginReducer"
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
    reducer,
    courseEditorReducer,
    courseListReducer,
    loginReducer
  }), applyMiddleware(thunk))

export { store }