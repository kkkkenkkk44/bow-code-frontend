import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import courseReducer from "./courseReducer"
import courseEditorReducer from "./courseEditorReducer";
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
    reducer,
    courseReducer,
    courseEditorReducer,
  }), applyMiddleware(thunk))

export { store }