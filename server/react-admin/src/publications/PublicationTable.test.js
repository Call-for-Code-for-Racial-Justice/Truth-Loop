import React from 'react'
import PublicationTable from './PublicationTable'
import {render, screen} from '@testing-library/react'

describe('PublicationTable Tests', () => {
  describe('When first rendering with null', () => {
    beforeEach(() => {
      render(<PublicationTable publications={null}/>)
    })
    it('should show empty data', () => {
      expect(screen.getByText('No publications available')).toBeVisible()
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with empty array', () => {
    beforeEach(() => {
      render(<PublicationTable publications={[]}/>)
    })
    it('should show empty data', () => {
      expect(screen.getByText('No publications available')).toBeVisible()
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 1 item', () => {
    beforeEach(() => {
      render(<PublicationTable publications={[{id: '1'}]}/>)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('PublicationsHeaderRow')).toBeInTheDocument()
    })
    it('should show 1 item', () => {
      expect(screen.getAllByTestId('PublicationsRow').length).toBe(1)
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 2 items', () => {
    beforeEach(() => {
      render(<PublicationTable publications={[
        {id: '1', title: 'title 1', description: 'desc 1', created: '2016-11-03T04:47:00.000Z', updated: '2016-11-03T04:47:00.000Z'},
        {id: '2', title: 'title 1', description: 'desc 1', created: '2016-11-03T04:47:00.000Z', updated: '2016-11-03T04:47:00.000Z'},
      ]}/>)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('PublicationsHeaderRow')).toBeInTheDocument()
    })
    it('should show 2 items', () => {
      expect(screen.getAllByTestId('PublicationsRow').length).toBe(2)
    })
  })
})
