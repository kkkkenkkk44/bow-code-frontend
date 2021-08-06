import React, { Component, useEffect } from "react";
import './App.css';
import MainPage from "./pages/MainPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import CreateProblemPage from "./pages/CreateProblemPage";
import CourseListPage from "./pages/CourseListPage";
import ProblemListPage from "./pages/ProblemListPage"
import CourseEditorPage from "./pages/CourseEditorPage";
import ClassroomManagerPage from "./pages/ClassroomManagerPage"
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignUpPage from "./pages/SignUpPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import BlockDetailPage from "./pages/BlockDetailPage";
import ProblemPage from "./pages/ProblemPage";
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
      <Route path='/home' component={MainPage} />
      <Route path='/courseList' component={CourseListPage} />
      <Route path='/problemList' component={ProblemListPage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/logout' component={LogoutPage} />
      <Route path='/signup' component={SignUpPage} />
      <Route path='/user' component={UserPage} />
      <Route path='/createCourse' component={CreateCoursePage} />
      <Route path='/courseEditor/:CourseID' component={CourseEditorPage} />
      <Route path='/course/:CourseID/:index' component={BlockDetailPage} />
      <Route path='/course/:CourseID' component={CourseDetailPage} />
      <Route path='/problem/:ProblemID' component={ProblemPage} />
      <Route path='/createProblem' component={CreateProblemPage} />
      <Route path='/classroomManager/:ClassroomID' component={ClassroomManagerPage}/>
      <Redirect from='/' to='/home' />
    </Switch>
  );
}

export default App;
