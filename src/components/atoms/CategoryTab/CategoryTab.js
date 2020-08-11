import React from "react";
import { Link } from 'react-router-dom';
import "./CategoryButton.css";


const CategoryTab = ({categoryId, category}) => {

  return(
      <div className="column">
          <Link className="ctg-button__title" to={categoryId}>
          <div className="ctg-button">
            <h3>{category}</h3>
            </div>
          </Link>
      </div>
)
  };

export default CategoryTab;