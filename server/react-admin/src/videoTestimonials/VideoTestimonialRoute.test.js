import React from 'react'
import { render, screen } from '@testing-library/react'
import VideoTestimonialRoute from './VideoTestimonialRoute'

describe('VideoTestimonialRoute Tests', () => {
  beforeAll(() => {
    jest.spyOn(window, 'fetch')
  })
  describe('When first rendering', () => {
    beforeEach(() => {
      window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [{ some: 'item' }],
      })
      render(<VideoTestimonialRoute />)
    })
    it('should request items', () => {
      expect(window.fetch).toBeCalledTimes(1)
    })
    it('should render the table', () => {
      expect(screen.getByTestId('TestimonialTable')).toBeInTheDocument()
    })
  })
})
