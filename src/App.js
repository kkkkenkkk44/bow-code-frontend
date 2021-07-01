import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import MainPage from "./pages/MainPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import { Redirect, Route, Switch } from "react-router";
import { shallowEqual, useSelector } from "react-redux";

function App() {


  return (
    <Switch>
      <Route path='/home' component={MainPage} />
      <Route path='/createCourse' component={CreateCoursePage} />
      <Redirect from='/' to='/home'/>
    </Switch>
  );
}

export default App;
