import React from "react";

import CategoryTabContext from '../context/CategoryTabContext'

const Home = () => {
  return(
    <div>
     <div className="container home">
      <div className="row">
          <CategoryTabContext />
      </div>
    </div>
    </div>
)
  };

export default Home;