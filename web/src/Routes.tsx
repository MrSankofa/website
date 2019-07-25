import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Opening from "./containers/Opening";

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/opening" exact component={Opening} />
  </Switch>
);
