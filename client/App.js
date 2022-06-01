import React, { useEffect, Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";

import { Login, Signup } from "./components/AuthForm";
import Profile from "./components/Profile";
import { me } from "./store";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Landing from "./components/Landing";
import { fetchRestaurants } from "./store/restaurants";
import { createContext, useState } from "react";
import ReactSwitch from 'react-switch';

export const ThemeContext = createContext(null);

const App = (props) => {
  const { isLoggedIn, fetchRestaurants, loadInitialData } = props;

  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  useEffect(() => {
    loadInitialData();
    fetchRestaurants();
  }, []);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <div id={theme}>
      <Navbar />
      <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
      {isLoggedIn ? (
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/landing" component={Landing} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      )}
    </div>
    </ThemeContext.Provider>
  );
};

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
    fetchRestaurants: () => dispatch(fetchRestaurants()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(App));
