import React, { Component } from 'react';


import Testimonial from '../Testimonial/Testimonial';
import Header from '../VideoHeader/VideoHeader';

class Testimonials extends Component {
  state = {
    testimonialsArr: [
      {
        id: '64d4bd69-9334-4d92-8e2e-ec95107c19f9',
        name: 'Lulu Blake',
        date: '05-24-2020',
        testimonial: 'video',
        policy: 'HR.1619',
        subPolicy: 'HR.2042',
      }, {
        id: '97c177d6-c734-4845-9e90-8d456513729c',
        name: 'Testimonial 08',
        date: '07-13-2020',
        testimonial: 'video',
        policy: 'HR.1619',
        subPolicy: 'HR.2042',
      }, {
        id: 'c695c839-8893-40b5-b625-948f0042bc29',
        name: 'Ryan Knight',
        date: '07-13-2020',
        testimonial: 'video',
        policy: 'HR.1619',
        subPolicy: 'HR.2042',
      }, {
        id: 'f87a2b68-e7b6-491d-9657-9c4342712bc7',
        name: 'Tom Baker',
        date: '07-13-2020',
        testimonial: 'video',
        policy: 'HR.1619',
        subPolicy: 'HR.2042',
      },
    ],
    category: 'Health',
    seeAll: false,
  };

  seeAllTestimonialHandler = () => {
    this.setState({ seeAll: true })
  }

  generateTestimonialsList = (arr) => {
    return arr.map(t => {
      return (
        <Testimonial
          key={t.id}
          testimonial={t.testimonial}
          name={t.name}
          policy={t.policy}
          subPolicy={t.subPolicy}
          date={t.date}
        />
      )}
    )
  }

  render () {
    let testimonials = this.state.seeAll 
      ? this.generateTestimonialsList(this.state.testimonialsArr) 
      : this.generateTestimonialsList(this.state.testimonialsArr.slice(0, 3));

    return (
      <div style={{overflowY: 'scroll'}}>
        <Header
          seeAll={this.state.seeAll}
          category={this.state.category}
          length={this.state.testimonialsArr.length}
          clicked={this.seeAllTestimonialHandler}
        />
        {testimonials}
      </div>
    );
  }
};

export default Testimonials;