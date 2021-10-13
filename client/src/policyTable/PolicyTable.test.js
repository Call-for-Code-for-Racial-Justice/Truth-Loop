import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import PolicyTable from './PolicyTable'

const mockStore = configureMockStore()

describe('PolicyTable component tests', () => {
  describe('when policy list is empty', () => {
    beforeEach(() => {
      const store = mockStore({
		appSettings:{filters: {location:[], category:[]}},
        policyList: { items: []},
      })
      render(<Provider store={store}><PolicyTable/></Provider>)
    })
    it('should show empty policy table', () => {
      expect(screen.queryByTestId('emptyPolicyTable')).toBeInTheDocument()
    })
  })
  describe('when policy list has one item', () => {
    beforeEach(() => {
      const store = mockStore({
		appSettings:{filters: {location:[], category:[]}},
        // eslint-disable-next-line camelcase
        policyList: { items: [{ id: 1, title: '', summary: '', date_introduced: '2016-11-03T04:47:00.000Z'}]},
      })
      render(<Provider store={store}><PolicyTable/></Provider>)
    })
    it('should show policy table', () => {
      expect(screen.queryByTestId('policyTable')).toBeInTheDocument()
    })
    it('should show 1 policy item', () => {
      expect(screen.queryAllByTestId('policyItem')).toHaveLength(1)
    })
  })
})