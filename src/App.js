import React, { Component, useEffect } from "react";
import './App.css';
import MainPage from "./pages/MainPage";
import CourseListPage from "./pages/CourseListPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Redirect, Route, Switch } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { auth } from "./actions/login"
require('dotenv').config();

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
      <Route path='/login' component={LoginPage} />
      <Route path='/signup' component={SignUpPage} />
      <Redirect from='/' to='/home' />
    </Switch>
  );
}

export default App;
