import React from 'react'

import classes from './Testimonial.module.css'
import img from '../../../assets/Images/defaultImg.jpg'

const testimonial = (props) => {
  return (
    <div className={classes.Testimonial}>
      <div className={classes.Video}>
        <img style={{ width: '100%', height: '100%'}} alt='testimonial' src={img}></img>
      </div>
      <div className={classes.Info}>
        <p>{props.name}</p>
        <p>{props.policy} | {props.subPolicy}</p>
        <p className={classes.Date}>{props.date}</p>
      </div>
    </div>
  );
}

export default testimonial;