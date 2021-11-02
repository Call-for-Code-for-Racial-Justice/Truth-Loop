import React from 'react'
import ArtifactTable from './ArtifactTable'
import { render, screen } from '@testing-library/react'

describe('ArtifactTable Tests', () => {
  describe('When loading items', () => {
    beforeEach(() => {
      render(<ArtifactTable artifacts={[]} isLoading={true} />)
    })
    it('should show progressBar', () => {
      expect(screen.getByRole('progressbar')).toBeVisible()
    })
    it('should disable add button', () => {
      expect(screen.getByRole('link', { name: 'Add Artifact' })).toHaveAttribute(
        'aria-disabled',
        'true'
      )
    })
  })
  describe('When done loading items', () => {
    beforeEach(() => {
      render(<ArtifactTable artifacts={[]} isLoading={false} />)
    })
    it('should not show progressBar', () => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
    it('should disable add button', () => {
      expect(screen.getByRole('link', { name: 'Add Artifact' })).not.toHaveAttribute(
        'aria-disabled',
        'true'
      )
    })
  })
  describe('When first rendering with empty array', () => {
    beforeEach(() => {
      render(<ArtifactTable artifacts={[]} />)
    })
    it('should show empty data', () => {
      expect(screen.getByText('No artifacts available')).toBeVisible()
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 1 item', () => {
    beforeEach(() => {
      render(<ArtifactTable artifacts={[{ id: '1' }]} />)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('ArtifactsHeaderRow')).toBeInTheDocument()
    })
    it('should show 1 item', () => {
      expect(screen.getAllByTestId('ArtifactsRow').length).toBe(1)
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 2 items', () => {
    beforeEach(() => {
      render(
        <ArtifactTable
          artifacts={[
            { id: 1, title: 'some title 1', summary: 'some summary', aNullValue: null },
            { id: 2, title: 'some title 2', summary: 'some summary 2' },
          ]}
        />
      )
    })
    it('should show header row', () => {
      expect(screen.getByTestId('ArtifactsHeaderRow')).toBeInTheDocument()
    })
    it('should show 2 items', () => {
      expect(screen.getAllByTestId('ArtifactsRow').length).toBe(2)
    })
  })
})
