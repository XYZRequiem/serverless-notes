import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import NotFound from "./containers/NotFound/NotFound"
import Login from "./containers/Login/Login"
import Signup from './containers/Signup/Signup'
import NewNote from './containers/NewNote/NewNote'
import Notes from './containers/Notes/Notes'
import AppliedRoute from './components/AppliedRoute'

export default ({childProps}) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute path="/notes/new" exact component={NewNote} props={childProps} />
        <AppliedRoute path="/notes/:id" exact component={Notes} props={childProps} />
        <AppliedRoute component={NotFound}/>
    </Switch>;