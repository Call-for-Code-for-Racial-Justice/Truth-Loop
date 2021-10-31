import React from 'react'
import LevelsTable from './LevelsTable'
import {render, screen} from '@testing-library/react'

describe('LevelsTable Tests', () => {
  describe('When loading items', () => {
    beforeEach(() => {
      render(<LevelsTable levels={[]} isLoading={true}/>)
    })
    it('should show progressBar', () => {
      expect(screen.getByRole('progressbar')).toBeVisible()
    })
    it('should disable add button', () => {
     expect(screen.getByRole('link', {name: 'Add Level'})).toHaveAttribute('aria-disabled', 'true')
    })
  })
  describe('When done loading items', () => {
    beforeEach(() => {
      render(<LevelsTable levels={[]} isLoading={false}/>)
    })
    it('should not show progressBar', () => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
    it('should disable add button', () => {
     expect(screen.getByRole('link', {name: 'Add Level'})).not.toHaveAttribute('aria-disabled', 'true')
    })
  })
  describe('When first rendering with empty array', () => {
    beforeEach(() => {
      render(<LevelsTable levels={[]}/>)
    })
    it('should show empty data', () => {
      expect(screen.getByText('No levels available')).toBeVisible()
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 1 item', () => {
    beforeEach(() => {
      render(<LevelsTable levels={[{id: '1'}]}/>)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('LevelsHeaderRow')).toBeInTheDocument()
    })
    it('should show 1 item', () => {
      expect(screen.getAllByTestId('LevelsRow').length).toBe(1)
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 2 items', () => {
    beforeEach(() => {
      render(<LevelsTable levels={[
        {id: '1', name: 'name 1', description: 'desc 1', created: '2016-11-03T04:47:00.000Z', updated: '2016-11-03T04:47:00.000Z'},
        {id: '2', name: 'name 2', description: 'desc 2', created: '2016-11-03T04:47:00.000Z', updated: '2016-11-03T04:47:00.000Z'},
      ]}/>)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('LevelsHeaderRow')).toBeInTheDocument()
    })
    it('should show 2 items', () => {
      expect(screen.getAllByTestId('LevelsRow').length).toBe(2)
    })
  })
})