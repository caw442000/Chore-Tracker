import React from 'react';
import FormikUserRegistrationForm from "./components/Registration"
import './App.css';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login'
import PrivateRoute from './utils/PrivateRoute'
import SignUp from './components/SignUp';
import { CssBaseline } from '@material-ui/core';




function App() {
  return (
    <div className="App">
        <CssBaseline />

        <Router>
            <Switch>
              <Route exact path = '/signup' component= {SignUp} />
              <PrivateRoute exact path = '/dashboard' component = {Dashboard} />
              <Route path = '/' component = {Login} />

            </Switch>
        </Router>

        {/* <Dashboard /> */}
        {/* <SignUp/> */}


    </div>
  );
}

export default App;
