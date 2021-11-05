import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import AdminApp from './AdminApp'

describe('App component tests', () => {
  describe('after rendering the app', () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
          <AdminApp />
        </MemoryRouter>
      )
    })
    it('shows the main content', () => {
      expect(screen.getByTestId('mainContent')).toBeInTheDocument()
    })
  })
})
