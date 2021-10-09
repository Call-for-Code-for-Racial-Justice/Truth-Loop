import React from 'react'
import { render, screen } from '@testing-library/react'
import PublicationRoute from './PublicationRoute'

describe('PublicationRoute Tests', () => {
  beforeAll(() => {
    jest.spyOn(window, 'fetch')
  })
  describe('When first rendering', () => {
    beforeEach(() => {
      window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ([{some: 'item'}])
      })
      render(<PublicationRoute/>)
    })
    it('should request items', () => {
      expect(window.fetch).toBeCalledTimes(1)
    })
    it('should render the table', () => {
      expect(screen.queryByTestId('publicationTable')).toBeInTheDocument()
    })
    it('should render an add option', () => {
      expect(screen.queryByTestId('addPublication')).toBeInTheDocument()
    })
  })
})
