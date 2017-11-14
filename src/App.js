import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'

import asyncComponent from './components/AsyncComponent'

import logo from './logo.svg';
import './App.css';

const AsyncHome = asyncComponent(() => import("./containers/Home"))

class App extends Component {
  constructor(props) {
    super(props)

  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Route path="/" exact component={AsyncHome}/>
      </div>
    );
  }
}

export default App;
