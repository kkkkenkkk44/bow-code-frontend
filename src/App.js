import React, { Component, useEffect } from "react";
import './App.css';
import MainPage from "./pages/MainPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import CreateProblemPage from "./pages/CreateProblemPage";
import CreateClassroomPage from "./pages/CreateClassroomPage";
import CreateSingleClassroomPage from "./pages/CreateSingleClassroomPage";
import CreateMultipleClassroomPage from "./pages/CreateMultipleClassroomPage";
import RedirectToProblemPage from "./pages/RedirectToProblemPage"
import CreateCoursePlanPage from "./pages/CreateCoursePlanPage";
import CourseListPage from "./pages/CourseListPage";
import ProblemListPage from "./pages/ProblemListPage"
import ClassroomPage from "./pages/ClassroomPage"
import CourseEditorPage from "./pages/CourseEditorPage";
import CoursePlanEditorPage from "./pages/CoursePlanEditorPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignUpPage from "./pages/SignUpPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import BlockDetailPage from "./pages/BlockDetailPage";
import RegisterPage from "./pages/RegisterPage"
import ProblemPage from "./pages/ProblemPage";
import ApplyClassroomPage from "./pages/ApplyClassroomPage";
import { Redirect, Route, Switch } from "react-router";
import { auth } from "./actions/login"
import UserPage from "./pages/UserPage";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.loginReducer.isLogin);
  const user = useSelector(state => state.loginReducer.user);

  useEffect(() => {
    dispatch(auth())
  }, [])
  return (
    <Switch>
      <Route exact strict path="/course/:CourseID" render={props => <Redirect to={`${props.location.pathname}/`}/>} />
      {isLogin && <Redirect from='/home' to='/user' />}
      <Route path='/home' component={MainPage} />
      <Route path='/courseList' component={CourseListPage} />
      <Route path='/problemList' component={ProblemListPage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/logout' component={LogoutPage} />
      <Route path='/signup' component={SignUpPage} />
      <Route path='/user' component={UserPage} />
      <Route path='/createCourse' component={CreateCoursePage} />
      <Route path='/courseEditor/problem/:ProblemID' component={RedirectToProblemPage} />
      <Route path='/courseEditor/:CourseID' component={CourseEditorPage} />
      <Route path='/course/:CourseID/problem/:ProblemID' component={RedirectToProblemPage} />
      <Route path='/course/:CourseID/:index' component={BlockDetailPage} />
      <Route path='/course/:CourseID/' component={CourseDetailPage} />
      <Route path='/createClassroom' component={CreateClassroomPage} />
      <Route path='/createSingleClassroom' component={CreateSingleClassroomPage} />
      <Route path='/createMultipleClassroom' component={CreateMultipleClassroomPage} />
      <Route path='/createCoursePlan' component={CreateCoursePlanPage} />
      <Route path='/problem/:ProblemID' component={ProblemPage} />
      <Route path='/coursePlanEditor/:CoursePlanID' component={CoursePlanEditorPage} />
      <Route path='/createProblem' component={CreateProblemPage} />
      <Route path='/classroom/:ClassroomID/course/:CourseID/problem/:ProblemID' component={ProblemPage} />
      <Route path='/classroom/:ClassroomID/course/:CourseID/:index' component={BlockDetailPage} />
      <Route path='/classroom/:ClassroomID/course/:CourseID' component={CourseDetailPage} />
      <Route path='/classroom/:ClassroomID/problem/:ProblemID' component={ProblemPage} />
      <Route path='/classroom/:ClassroomID' component={ClassroomPage}/>
      <Route path="/apply/:ClassroomID" component={ApplyClassroomPage} />
      <Route path='/register' component={RegisterPage} />
      <Redirect from='/' to='/home' />
    </Switch>
  );
}

export default App;
