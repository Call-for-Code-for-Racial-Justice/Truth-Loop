import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Policies from '../../screens/Policies'

// import "../App.css";
// const cBank = require("../policyBank/PolicyBank");

const PolicyRoutes = ({categoryId, category}) => {
    const pathName = `/${categoryId}`;

  return(
      <div>
          <Route exact path={pathName} render={(props) => <Policies {...props} pathName={pathName} category={category}/>} />
      </div>
)
  };

export default PolicyRoutes;