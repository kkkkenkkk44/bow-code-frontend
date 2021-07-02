import React, { Component } from "react";
import './App.css';
import MainPage from "./pages/MainPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import CourseListPage from "./pages/CourseListPage";
import { Redirect, Route, Switch } from "react-router";
import { shallowEqual, useSelector } from "react-redux";
require('dotenv').config();

function App() {


  return (
    <Switch>
      <Route path='/home' component={MainPage}/>
      <Route path='/courseList' component={CourseListPage}/>
      <Route path='/createCourse' component={CreateCoursePage} />
      <Redirect from='/' to='/home'/>
    </Switch>
  );
}

export default App;
