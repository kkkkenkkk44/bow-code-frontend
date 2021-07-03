import React, { Component } from "react";
import './App.css';
import MainPage from "./pages/MainPage";
import CourseListPage from "./pages/CourseListPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Redirect, Route, Switch } from "react-router";
import { shallowEqual, useSelector } from "react-redux";
require('dotenv').config();

function App() {
  return (
    <Switch>
      <Route path='/home' component={MainPage}/>
      <Route path='/courseList' component={CourseListPage}/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/signup' component={SignUpPage}/>
      <Redirect from='/' to='/home'/>
    </Switch>
  );
}

export default App;
