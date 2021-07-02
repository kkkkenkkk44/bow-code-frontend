import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import courseReducer from "./courseReducer"
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
    reducer,
    courseReducer,
  }), applyMiddleware(thunk))

export { store }