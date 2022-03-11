import React from 'react'
import GeographyTable from './GeographyTable'
import { render, screen } from '@testing-library/react'

describe('GeographyTable Tests', () => {
  describe('When loading items', () => {
    beforeEach(() => {
      render(<GeographyTable geographies={[]} isLoading={true} />)
    })
    it('should show progressBar', () => {
      expect(screen.getByRole('progressbar')).toBeVisible()
    })
    it('should disable add button', () => {
      expect(screen.getByRole('link', { name: 'Add Geography' })).toHaveAttribute(
        'aria-disabled',
        'true'
      )
    })
  })
  describe('When done loading items', () => {
    beforeEach(() => {
      render(<GeographyTable geographies={[]} isLoading={false} />)
    })
    it('should not show progressBar', () => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
    it('should disable add button', () => {
      expect(screen.getByRole('link', { name: 'Add Geography' })).not.toHaveAttribute(
        'aria-disabled',
        'true'
      )
    })
  })
  describe('When first rendering with empty array', () => {
    beforeEach(() => {
      render(<GeographyTable geographies={[]} />)
    })
    it('should show empty data', () => {
      expect(screen.getByText('No geospatial definitions available')).toBeVisible()
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 1 item', () => {
    beforeEach(() => {
      render(<GeographyTable geographies={[{ id: '1' }]} />)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('GeographiesHeaderRow')).toBeInTheDocument()
    })
    it('should show 1 item', () => {
      expect(screen.getAllByTestId('GeographiesRow').length).toBe(1)
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 2 items', () => {
    beforeEach(() => {
      render(
        <GeographyTable
          geographies={[
            {
              id: '1',
              name: 'title 1',
              short_name_ui: 'shortname 1',
              description: 'desc 1',
              created: '2016-11-03T04:47:00.000Z',
              updated: '2016-11-03T04:47:00.000Z',
            },
            {
              id: '2',
              name: 'title 2',
              short_name_ui: 'shortname 2',
              description: 'desc 2',
              created: '2016-11-03T04:47:00.000Z',
              updated: '2016-11-03T04:47:00.000Z',
            },
          ]}
        />
      )
    })
    it('should show header row', () => {
      expect(screen.getByTestId('GeographiesHeaderRow')).toBeInTheDocument()
    })
    it('should show 2 items', () => {
      expect(screen.getAllByTestId('GeographiesRow').length).toBe(2)
    })
  })
})
