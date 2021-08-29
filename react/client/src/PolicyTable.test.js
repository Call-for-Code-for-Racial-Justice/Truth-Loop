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
        policyList: { items: [], itemCount: 0},
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
        policyList: { items: [{ id: 1}], itemCount: 1},
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