import React, { Fragment } from 'react';

import classes from './VideoHeader.module.css';

import 'carbon-components/css/carbon-components.min.css';

const header = (props) => {
  return (
    <div>
      {
        !props.seeAll ?
        (
          <Fragment>
            <h5 className={classes.Header}>RECENT TESTIMONIALS ({props.length})</h5>
            <button className={classes.SeeAllBtn} onClick={props.clicked}><b>See all</b></button>
          </Fragment>
          
        ) : (
          <Fragment>
            {/* <div className={classes.SeeAllHeader}>
              <h5>{props.category}</h5>
            </div> */}
          </Fragment>
        ) 
      }
    </div>
  );
}

export default header;