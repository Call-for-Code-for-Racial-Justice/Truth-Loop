import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import Home from './Home'

const mockStore = configureMockStore()

describe('Home component tests', () => {
  describe('after initial rendering', () => {
    beforeEach(() => {
      const store = mockStore({
        privacy: { privacyCancelled: false, privacyAccepted: false},
      })
      render(<Provider store={store}><Home/></Provider>)
    })
    it('should show the PrivacyNotice', () => {
      expect(screen.queryByTestId('privacyNotice')).toBeInTheDocument()
    })
    it('should not show the pleaseAcceptPrivacyStatement notification', () => {
      expect(screen.queryByTestId('pleaseAcceptPrivacyStatement')).toBeNull()
    })
    it('should not show the PolicyTable', () => {
      expect(screen.queryByTestId('policyTable')).toBeNull()
    })
  })

  describe('when user has accepted the PrivacyNotice', () => {
    beforeEach(() => {
      const store = mockStore({
        privacy: { privacyCancelled: false, privacyAccepted: true},
        policyList: { items: [{id: 1}], itemCount: 1},
      })
      render(<Provider store={store}><Home/></Provider>)
    })
    it('should not show the PrivacyNotice', () => {
      expect(screen.queryByTestId('privacyNotice')).toBeNull()
    })
    it('should show the PolicyTable', () => {
      expect(screen.queryByTestId('policyTable')).toBeInTheDocument()
    })
  })

  describe('when user has cancelled the PrivacyNotice', () => {
    beforeEach(() => {
      const store = mockStore({
        privacy: { privacyCancelled: true, privacyAccepted: false},
      })
      render(<Provider store={store}><Home/></Provider>)
    })
    it('should show the pleaseAcceptPrivacyStatement notification', () => {
      expect(screen.queryByTestId('pleaseAcceptPrivacyStatement')).toBeInTheDocument()
    })
  })
})
