import React from 'react'
import { render, screen } from '@testing-library/react'
import IntersectionsTable from './IntersectionsTable'

describe('IntersectionsTable Tests', () => {
  describe('When first rendering with empty array', () => {
    beforeEach(() => {
      render(
        <IntersectionsTable
          rows={[]}
          headCells={[{ id: 'id', label: 'ID' }]}
          caption={'Hello Widgets'}
          label={'Widgets'}
        />
      )
    })
    it('should show empty data', () => {
      expect(screen.getByText('No intersections')).toBeVisible()
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 1 item', () => {
    beforeEach(() => {
      render(
        <IntersectionsTable
          rows={[{ id: 123, label: 'Widget 123' }]}
          headCells={[{ id: 'id', label: 'ID' }]}
          label={'Widgets'}
        />
      )
    })
    it('should show header row', () => {
      expect(screen.getByTestId('WidgetsHeaderRow')).toBeInTheDocument()
    })
    it('should show 1 item', () => {
      expect(screen.getAllByTestId('WidgetsRow').length).toBe(1)
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 2 items', () => {
    beforeEach(() => {
      render(
        <IntersectionsTable
          rows={[
            { id: 123, label: 'Widget 123' },
            { id: 234, label: 'Widget 234' },
          ]}
          headCells={[{ id: 'id', label: 'ID' }]}
          label={'Widgets'}
        />
      )
    })
    it('should show header row', () => {
      expect(screen.getByTestId('WidgetsHeaderRow')).toBeInTheDocument()
    })
    it('should show 2 items', () => {
      expect(screen.getAllByTestId('WidgetsRow').length).toBe(2)
    })
  })
})
