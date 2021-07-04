import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import courseReducer from "./courseReducer"
import loginReducer from "./loginReducer"
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
    reducer,
    courseReducer,
    loginReducer
  }), applyMiddleware(thunk))

export { store }