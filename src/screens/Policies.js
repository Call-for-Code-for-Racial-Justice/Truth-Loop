import React, { useReducer } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from '../components/organisms/Header/Header'
import PolicyLanding from "../components/organisms/PolicyLanding/policyLanding"

import "../App.css";

const Policies = ({ pathName, category }) => {

    return (
      <div className="container">
        <header className="App-header">
          <Header category={category}/>
          <Router>
            <PolicyLanding pathName={pathName} />
          </Router>
        </header>
      </div>
    );
};

export default Policies;
