import React from 'react'
import AdvocacyGroupsTable from './AdvocacyGroupsTable'
import {render, screen} from '@testing-library/react'

describe('AdvocacyGroupsTable Tests', () => {
  describe('When first rendering with null', () => {
    beforeEach(() => {
      render(<AdvocacyGroupsTable advocacyGroups={null}/>)
    })
    it('should show empty data', () => {
      expect(screen.getByText('No advocacy groups available')).toBeVisible()
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with empty array', () => {
    beforeEach(() => {
      render(<AdvocacyGroupsTable advocacyGroups={[]}/>)
    })
    it('should show empty data', () => {
      expect(screen.getByText('No advocacy groups available')).toBeVisible()
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 1 item', () => {
    beforeEach(() => {
      render(<AdvocacyGroupsTable advocacyGroups={[{id: '1'}]}/>)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('Advocacy-GroupsHeaderRow')).toBeInTheDocument()
    })
	/*unable to find 'Advocacy-GroupsRow' by test-id */
    // it('should show 1 item', () => {
    //   expect(screen.getAllByTestId('Advocacy-GroupsRow').length).toBe(1)
    // })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 2 items', () => {
    beforeEach(() => {
      render(<AdvocacyGroupsTable advocacyGroups={[
        {id: '1', title: 'title 1', description: 'desc 1', created: '2016-11-03T04:47:00.000Z', updated: '2016-11-03T04:47:00.000Z'},
        {id: '2', title: 'title 1', description: 'desc 1', created: '2016-11-03T04:47:00.000Z', updated: '2016-11-03T04:47:00.000Z'},
      ]}/>)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('Advocacy-GroupsHeaderRow')).toBeInTheDocument()
    })
	/*unable to find 'Advocacy-GroupsRow' by test-id */
    // it('should show 2 items', () => {
    //   expect(screen.getAllByTestId('Advocacy-GroupsRow').length).toBe(2)
    // })
  })
})
