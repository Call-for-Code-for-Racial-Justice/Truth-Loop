import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

describe('App component tests', () => {
  describe('after rendering the app', () => {
    beforeEach(() => {
      render(<App />)
    })
    it('shows the welcome prompt', () => {
      expect(screen.getByText(/Welcome to TruthLoop!/)).toBeInTheDocument()
    })
    it('shows the Home Link', () => {
      expect(screen.getByRole('link', {name: /Home/})).toBeInTheDocument()
    })
    it('shows the Policy 1234 Link', () => {
      expect(screen.getByRole('link', {name: /Policy/})).toBeInTheDocument()
    })
    it('shows the Record for policy 123 Link', () => {
      expect(screen.getByRole('link', {name: /Record/})).toBeInTheDocument()
    })
    describe('when selecting the Policy route', () => {
      beforeEach(() => {
        userEvent.click(screen.getByRole('link', {name: /Policy/}))
      })
      it('should render the Policy view', () => {
        expect(screen.getByText(/Policy Detail for 1234/i)).toBeInTheDocument()
      })
    })
    describe('when selecting the Record route', () => {
      beforeEach(() => {
        userEvent.click(screen.getByRole('link', {name: /Record/}))
      })
      it('should render the Record view', () => {
        expect(screen.getByText(/Record for Policy 1234/i)).toBeInTheDocument()
      })
    })
  })
})
