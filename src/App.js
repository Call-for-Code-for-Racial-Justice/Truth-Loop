import React from 'react';
import Header from './components/organisms/Header/Header'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./screens/Home";
import CategoryRoutesContext from "./context/CategoryRoutesContext"
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <Header category={"Explore"}/>
      </header> */}
      <Router>
        <Route path="/" exact component={Home} />
        {/* <CategoryRoutesContext /> */}
      </Router>
    </div>
  );
}

export default App;
