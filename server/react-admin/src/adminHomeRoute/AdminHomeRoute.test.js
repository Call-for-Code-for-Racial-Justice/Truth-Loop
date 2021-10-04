import React from 'react'
import { render, screen } from '@testing-library/react'

import AdminHomeRoute from './AdminHomeRoute'

describe('AdminHomeRoute component tests', () => {
  describe('after initial rendering', () => {
    beforeEach(() => {
      render(<AdminHomeRoute/>)
    })
    it('shows the main content', () => {
      expect(screen.getByTestId('adminHomeContent')).toBeInTheDocument()
    })
  })
})
