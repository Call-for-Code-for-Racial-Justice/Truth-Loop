import React from 'react'
import {render, screen} from '../testUtils.js'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import HomeRoute from './HomeRoute'
import * as policyListDuck from '../store/policyList.duck'

const mockStore = configureMockStore()

describe('Home component tests', () => {
  beforeEach(() => {
    jest.spyOn(policyListDuck, 'fetchPoliciesFromServer').mockImplementation(() => {
      return {type: 'anything', payload: []}
    })
  })
  describe('after initial rendering', () => {
    beforeEach(() => {
      const store = mockStore({
        privacy: { privacyCancelled: false, privacyAccepted: false},
        policyList: { items: [] }
      })
      render(<Provider store={store}><HomeRoute/></Provider>)
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
        // eslint-disable-next-line camelcase
        policyList: { items: [{ id: 1, title: '', summary: '', date_introduced: '2016-11-03T04:47:00.000Z'}]},
      })
      render(<Provider store={store}><HomeRoute/></Provider>)
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
        policyList: { items: [] },
      })
      render(<Provider store={store}><HomeRoute/></Provider>)
    })
    it('should show the pleaseAcceptPrivacyStatement notification', () => {
      expect(screen.queryByTestId('pleaseAcceptPrivacyStatement')).toBeInTheDocument()
    })
  })
})
