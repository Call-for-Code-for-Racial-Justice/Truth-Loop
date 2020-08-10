import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./screens/Home";
import CategoryRoutesContext from "./context/CategoryRoutesContext"
import './App.css';

function App() {

  
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
        <CategoryRoutesContext />
      </Router>
    </div>
  );
}

export default App;
