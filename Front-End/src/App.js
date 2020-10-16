import React from "react";
import FormikUserRegistrationForm from "./components/Registration";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./utils/PrivateRoute";
import SignUp from "./components/SignUp";
import { CssBaseline } from "@material-ui/core";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from 'redux-logger'


import { userReducer, childReducer } from "./store/reducers";

const rootReducer = combineReducers({
  user: userReducer,
  children: childReducer

})


const store = createStore(rootReducer, applyMiddleware(thunk, logger));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CssBaseline />

        <Router>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route path="/" component={Login} />
          </Switch>
        </Router>

        {/* <Dashboard /> */}
        {/* <SignUp/> */}
      </div>
    </Provider>
  );
}

export default App;
