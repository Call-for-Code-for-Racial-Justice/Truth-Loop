import React, { useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,withRouter
} from "react-router-dom";
import Header from '../components/organisms/Header/Header'
import PolicyLanding from "../components/organisms/PolicyLanding/policyLanding"
import Testimonials from '../components/organisms/Testimonials/Testimonials'

import "../App.css";

const Policies = ({ pathName, category }) => {

    return (
      <div className="container">
        <header className="App-header">
          <Header category={category}/>
          <Router>
            <PolicyLanding pathName={pathName} />
            <Route exact path={pathName} component={Testimonials} />
          </Router>
        </header>
      </div>
    );
};

export default Policies;
