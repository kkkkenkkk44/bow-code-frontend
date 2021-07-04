import React, { Component } from "react";
import './App.css';
import MainPage from "./pages/MainPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import CourseListPage from "./pages/CourseListPage";
import CourseEditorPage from "./pages/CourseEditorPage";
import { Redirect, Route, Switch } from "react-router";
import { shallowEqual, useSelector } from "react-redux";
import {CourseID, isSuccessful} from "./components/CreateCourseForm.js";



require('dotenv').config();

function App() {


  return (
    <Switch>
      <Route path='/home' component={MainPage}/>
      <Route path='/courseList' component={CourseListPage}/>
      <Route path='/createCourse' component={CreateCoursePage} />
      <Route path='/courseEditor/:CourseID' component={CourseEditorPage} />
      <Redirect from='/' to='/home'/>
    </Switch>
  );
}

export default App;
