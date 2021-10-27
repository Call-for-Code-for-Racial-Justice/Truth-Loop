import React from 'react'
import VideoTestimonialTable from './VideoTestimonialTable'
import {render, screen} from '@testing-library/react'

describe('TestimonialTable Tests', () => {

  describe('When loading items', () => {
    beforeEach(() => {
      render(<VideoTestimonialTable testimonials={[]} isLoading={true}/>)
    })
    it('should show progressBar', () => {
      expect(screen.getByRole('progressbar')).toBeVisible()
    })
    it('should disable add button', () => {
      expect(screen.getByRole('link', {name: 'Add testimonial'})).toHaveAttribute('aria-disabled', 'true')
    })
  })
  describe('When done loading items', () => {
    beforeEach(() => {
      render(<VideoTestimonialTable testimonials={[]} isLoading={false}/>)
    })
    it('should not show progressBar', () => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
    it('should disable add button', () => {
      expect(screen.getByRole('link', {name: 'Add testimonial'})).not.toHaveAttribute('aria-disabled', 'true')
    })
  })
  describe('When first rendering with empty array', () => {
    beforeEach(() => {
      render(<VideoTestimonialTable testimonials={[]}/>)
    })
    it('should show empty data', () => {
      expect(screen.getByText('No video testimonials available')).toBeVisible()
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 1 item', () => {
    beforeEach(() => {
      render(<VideoTestimonialTable testimonials={[{id: '1'}]}/>)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('TestimonialsHeaderRow')).toBeInTheDocument()
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 2 items', () => {
    beforeEach(() => {
      render(<VideoTestimonialTable testimonials={[
        {id: '1', subject: 'subject 1', comment: 'comment 1', created: '2016-11-03T04:47:00.000Z', updated: '2016-11-03T04:47:00.000Z'},
        {id: '2', subject: 'subject 1', comment: 'comment 2', created: '2016-11-03T04:47:00.000Z', updated: '2016-11-03T04:47:00.000Z'},
      ]}/>)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('TestimonialsHeaderRow')).toBeInTheDocument()
    })
  })
})
