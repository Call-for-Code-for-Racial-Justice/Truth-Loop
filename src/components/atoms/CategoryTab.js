import React from "react";
import { Link } from 'react-router-dom';
// import "../stylesheets/CategoryButton.css";


const CategoryTab = ({categoryId, category}) => {

  return(
      <div className="column">
          <Link to={"categoryId"}>
          <div className="ctg-button">
            {category}
            </div>
          </Link>
      </div>
)
  };

export default CategoryTab;