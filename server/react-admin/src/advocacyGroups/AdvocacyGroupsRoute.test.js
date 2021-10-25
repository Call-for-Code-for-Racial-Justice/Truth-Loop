import React from 'react'
import { render, screen } from '@testing-library/react'
import AdvocacyGroupsRoute from './AdvocacyGroupsRoute'

describe('AdvocacyGroupsRoute Tests', () => {
  beforeAll(() => {
    jest.spyOn(window, 'fetch')
  })
  describe('When first rendering', () => {
    beforeEach(() => {
      window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ([{some: 'item'}])
      })
      render(<AdvocacyGroupsRoute />)
    })
    it('should request items', () => {
      expect(window.fetch).toBeCalledTimes(1)
    })
    it('should render the table', () => {
      expect(screen.getByTestId('AdvocacyGroupsTable')).toBeInTheDocument()
    })
  })
})
  
