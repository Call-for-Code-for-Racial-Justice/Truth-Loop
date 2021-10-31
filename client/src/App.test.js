import React from 'react'
import { render, screen } from './testUtils.js'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import App from './App'
import { fetchPoliciesFromServer } from './store/policyList.duck'
import * as policyListDuck from './store/policyList.duck'

const mockStore = configureMockStore()

describe('App component tests', () => {
  beforeEach(() => {
    jest
      .spyOn(policyListDuck, 'fetchPoliciesFromServer')
      .mockImplementation(() => {
        return { type: 'anything', payload: [] }
      })
  })
  describe('after rendering the app', () => {
    beforeEach(() => {
      const store = mockStore({ privacy: {}, policyList: { items: [] } })
      render(
        <Provider store={store}>
          <App />
        </Provider>
      )
    })
    it('shows the main content', () => {
      expect(screen.getByTestId('mainContent')).toBeInTheDocument()
    })
  })
})
