import React from "react";
import Header from '../components/organisms/Header/Header'

import CategoryTabContext from '../context/CategoryTabContext'

const Home = () => {
  return(
    <div className="container">
      <header className="App-header">
        <Header category={"Explore"}/>
      </header>
     <div className="container home">
      <div className="row">
          <CategoryTabContext />
      </div>
    </div>
    </div>
)
  };

export default Home;