import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import App from './App'

const mockStore = configureMockStore()

describe('App component tests', () => {
  describe('after rendering the app', () => {
    beforeEach(() => {
      const store = mockStore({ privacy: {} })
      render(<Provider store={store}><App /></Provider>)
    })
    it('shows the main content', () => {
      expect(screen.getByTestId('mainContent')).toBeInTheDocument()
    })
  })
})
