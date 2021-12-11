import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import courseEditorReducer from "./courseEditorReducer";
import courseListReducer from "./courseListReducer"
import problemListReducer from "./problemListReducer";
import loginReducer from "./loginReducer"
import createClassroomReducer from "./createClassroomReducer"
import thunk from 'redux-thunk';
import userPageReducer from "./userPageReducer";
import problemPageReducer from "./problemPageReducer"
import createProblemReducer from "./createProblemReducer";
import classroomPageReducer from "./classroomPageReducer";
import createCoursePlanReducer from "./createCoursePlanReducer";
import coursePlanEditorReducer from "./coursePlanEditorReducer";
import applyClassroomPageReducer from "./applyClassroomPageReducer";
import courseDetailPageReducer from "./courseDetailPageReducer";
import coursePlanListReducer from "./coursePlanListReducer";

const store = createStore(combineReducers({
    reducer,
    courseEditorReducer,
    courseListReducer,
    problemListReducer,
    loginReducer,
    userPageReducer,
    problemPageReducer,
    createProblemReducer,
    classroomPageReducer,
    createClassroomReducer,
    createCoursePlanReducer,
    coursePlanEditorReducer,
    applyClassroomPageReducer,
    courseDetailPageReducer,
    coursePlanListReducer
  }), applyMiddleware(thunk))

export { store }