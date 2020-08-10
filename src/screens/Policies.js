import React, { useReducer } from "react";
import Header from '../components/organisms/Header/Header'

import "../App.css";

const Policies = ({ category }) => {

    return (
      <div className="container">
        <header className="App-header">
          <Header category={category}/>
        </header>
      </div>
    );
};

export default Policies;
