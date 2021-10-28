import React from 'react'
import OfficialsTable from './OfficialsTable'
import {render, screen} from '@testing-library/react'

describe('OfficialsTable Tests', () => {
  describe('When loading items', () => {
    beforeEach(() => {
      render(<OfficialsTable officials={[]} isLoading={true}/>)
    })
    it('should show progressBar', () => {
      expect(screen.getByRole('progressbar')).toBeVisible()
    })
    it('should disable add button', () => {
     expect(screen.getByRole('link', {name: 'Add Officials'})).toHaveAttribute('aria-disabled', 'true')
    })
  })
  describe('When done loading items', () => {
    beforeEach(() => {
      render(<OfficialsTable officials={[]} isLoading={false}/>)
    })
    it('should not show progressBar', () => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
    it('should disable add button', () => {
     expect(screen.getByRole('link', {name: 'Add Officials'})).not.toHaveAttribute('aria-disabled', 'true')
    })
  })
  describe('When first rendering with empty array', () => {
    beforeEach(() => {
      render(<OfficialsTable officials={[]}/>)
    })
    it('should show empty data', () => {
      expect(screen.getByText('No officials available')).toBeVisible()
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 1 item', () => {
    beforeEach(() => {
      render(<OfficialsTable officials={[{id: '1'}]}/>)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('OfficialsHeaderRow')).toBeInTheDocument()
    })
    it('should show 1 item', () => {
      expect(screen.getAllByTestId('OfficialsRow').length).toBe(1)
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 2 items', () => {
    beforeEach(() => {
      render(<OfficialsTable officials={[
        {id: '1', name: 'name 1', title: 'title 1', email_address: 'email 1', phone_number: 'phone 1', website_url:'url 1', created: '2016-11-03T04:47:00.000Z', updated: '2016-11-03T04:47:00.000Z'},
        {id: '2', name: 'name 2', title: 'title 2', email_address: 'email 2', phone_number: 'phone 2', website_url:'url 2', created: '2016-11-03T04:47:00.000Z', updated: '2016-11-03T04:47:00.000Z'},
      ]}/>)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('OfficialsHeaderRow')).toBeInTheDocument()
    })
    it('should show 2 items', () => {
      expect(screen.getAllByTestId('OfficialsRow').length).toBe(2)
    })
  })
})
