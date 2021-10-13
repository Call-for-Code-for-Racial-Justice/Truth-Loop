import React from 'react'
import { render, screen } from '@testing-library/react'
import PolicyTable from './PolicyTable'

describe('PolicyTable component tests', () => {
  describe('when policy list is empty', () => {
    beforeEach(() => {
      render(<PolicyTable policies={[]}/>)
    })
    it('should show empty policy table', () => {
      expect(screen.queryByTestId('emptyPolicyTable')).toBeInTheDocument()
    })
  })
  describe('when policy list has one item', () => {
    beforeEach(() => {
      render(<PolicyTable policies={[{ id: 1, title: '', summary: '', date_introduced: '2016-11-03T04:47:00.000Z'}]}/>)
    })
    it('should show policy table', () => {
      expect(screen.queryByTestId('policyTable')).toBeInTheDocument()
    })
    it('should show 1 policy item', () => {
      expect(screen.queryAllByTestId('policyItem')).toHaveLength(1)
    })
  })
})
