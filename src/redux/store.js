import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import courseListReducer from "./courseListReducer"
//import courseReducer from "./courseReducer"
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
    reducer,
    courseListReducer,
  }), applyMiddleware(thunk))

export { store }