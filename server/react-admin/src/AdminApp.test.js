import React from 'react'
import { render, screen } from '@testing-library/react'

import AdminApp from './AdminApp'

describe('App component tests', () => {
  describe('after rendering the app', () => {
    beforeEach(() => {
      render(<AdminApp />)
    })
    it('shows the main content', () => {
      expect(screen.getByTestId('mainContent')).toBeInTheDocument()
    })
  })
})
