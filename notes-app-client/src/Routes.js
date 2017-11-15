import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import NotFound from "./containers/NotFound/NotFound"
import Login from "./containers/Login/Login"

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact render={(props) => <div>Signup</div>} />
        <Route component={NotFound}/>
    </Switch>;