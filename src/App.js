import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import MainPage from "./pages/MainPage";
import { Redirect, Route, Switch } from "react-router";
import { shallowEqual, useSelector } from "react-redux";

function App() {

  
  return (
    <Switch>
      <Route path='/home' component={MainPage}/>
      <Redirect from='/' to='/home'/>
    </Switch>
  );
}

export default App;
