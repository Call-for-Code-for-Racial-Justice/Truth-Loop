import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import * as appSettings from './store/appSettings.duck'
import App from './App'
import {fetchPoliciesFromServer} from './store/policyList.duck'
import * as policyListDuck from './store/policyList.duck'

const mockStore = configureMockStore()

describe('App component tests', () => {
  beforeEach(() => {
    jest.spyOn(policyListDuck, 'fetchPoliciesFromServer').mockImplementation(() => {
      return {type: 'anything', payload: []}
    })
	jest.spyOn(appSettings, 'updateAppSettings').mockImplementation(() => {
		return {type: 'anything', payload: []}
	})
  })
  describe('after rendering the app', () => {
    beforeEach(() => {
      const store = mockStore({ appSettings:{filters:{location:[], category:[]}}, privacy: {}, policyList: { items: [] } })
      render(<Provider store={store}><App /></Provider>)
    })
    it('shows the main content', () => {
      expect(screen.getByTestId('mainContent')).toBeInTheDocument()
    })
  })
})
