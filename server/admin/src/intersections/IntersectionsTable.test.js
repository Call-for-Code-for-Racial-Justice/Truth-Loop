import React from 'react'
import { render, screen } from '@testing-library/react'
import IntersectionsTable from './IntersectionsTable'

describe('IntersectionsTable Tests', () => {
  describe('When loading items', () => {
    beforeEach(() => {
      render(
        <IntersectionsTable
          rows={[]}
          isLoading={true}
          headCells={[{ id: 'id', label: 'ID' }]}
          caption={'Hello Widgets'}
          label={'Widgets'}
          artifactId={1}
          reloadArtifact={() => {}}
          intersectionUrl={'example.com/intersection'}
          itemsUrl={'example.com/item'}
          itemHeaders={[{ id: 'id', label: 'ID' }]}
        />
      )
    })
    it('should show progressBar', () => {
      expect(screen.getByRole('progressbar')).toBeVisible()
    })
  })
  describe('When first rendering with empty array', () => {
    beforeEach(() => {
      render(
        <IntersectionsTable
          rows={[]}
          isLoading={false}
          headCells={[{ id: 'id', label: 'ID' }]}
          caption={'Hello Widgets'}
          label={'Widgets'}
          artifactId={1}
          reloadArtifact={() => {}}
          intersectionUrl={'example.com/intersection'}
          itemsUrl={'example.com/item'}
          itemHeaders={[{ id: 'id', label: 'ID' }]}
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
          isLoading={false}
          headCells={[{ id: 'id', label: 'ID' }]}
          label={'Widgets'}
          artifactId={1}
          reloadArtifact={() => {}}
          intersectionUrl={'example.com/intersection'}
          itemsUrl={'example.com/item'}
          itemHeaders={[{ id: 'id', label: 'ID' }]}
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
          isLoading={false}
          headCells={[{ id: 'id', label: 'ID' }]}
          label={'Widgets'}
          artifactId={1}
          reloadArtifact={() => {}}
          intersectionUrl={'example.com/intersection'}
          itemsUrl={'example.com/item'}
          itemHeaders={[{ id: 'id', label: 'ID' }]}
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
