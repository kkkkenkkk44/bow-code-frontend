import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import courseListReducer from "./courseListReducer"
import loginReducer from "./loginReducer"
import thunk from 'redux-thunk';
import userPageReducer from "./userPageReducer";

const store = createStore(combineReducers({
    reducer,
    courseListReducer,
    loginReducer,
    userPageReducer
  }), applyMiddleware(thunk))

export { store }