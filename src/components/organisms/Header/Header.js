import React from 'react';
import 'carbon-components/css/carbon-components.min.css';
import { Search } from 'carbon-components-react';
import "./Header.css";

const Header = ({ category }) => {
    return (
        <div className="top-page-header">
            <div className="top-page-header__title">
                <h2>{category}</h2>
            </div>
            {/* <div className="search-bar">
                <Search light size='lg'
                        id="search-1"
                        placeHolderText="Search areas of interest"
                        />
            </div> */}
        </div>
    );
}

export default Header;