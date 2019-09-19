import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../view/Home/Home";
import Book from "../view/Book/Book";
import About from "../view/About/About";
import Details from "../view/Details/Details";
import User from "../view/User/User";

const Main = ({className}) => {
  return (<div className={className}>
      <Switch>
        <Route path="/home/:category" component={Home}></Route>
        <Route path="/user/:uid" component={User}></Route>
        <Route path="/book" component={Book}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/details/:id" component={Details}></Route>
        <Route path="/" 
          render={() => <Redirect to="/home/index"></Redirect>}
        ></Route>
      </Switch>
    </div>
  );
}

export default Main;