import React from 'react'
import CategoryTable from './CategoryTable'
import { render, screen } from '@testing-library/react'

describe('CategoryTable Tests', () => {
  describe('When loading items', () => {
    beforeEach(() => {
      render(<CategoryTable categories={[]} isLoading={true} />)
    })
    it('should show progressBar', () => {
      expect(screen.getByRole('progressbar')).toBeVisible()
    })
    it('should disable add button', () => {
      expect(screen.getByRole('link', { name: 'Add Category' })).toHaveAttribute(
        'aria-disabled',
        'true'
      )
    })
  })
  describe('When done loading items', () => {
    beforeEach(() => {
      render(<CategoryTable categories={[]} isLoading={false} />)
    })
    it('should not show progressBar', () => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
    it('should disable add button', () => {
      expect(screen.getByRole('link', { name: 'Add Category' })).not.toHaveAttribute(
        'aria-disabled',
        'true'
      )
    })
  })
  describe('When first rendering with empty array', () => {
    beforeEach(() => {
      render(<CategoryTable categories={[]} />)
    })
    it('should show empty data', () => {
      expect(screen.getByText('No categories available')).toBeVisible()
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 1 item', () => {
    beforeEach(() => {
      render(<CategoryTable categories={[{ id: '1' }]} />)
    })
    it('should show header row', () => {
      expect(screen.getByTestId('CategoriesHeaderRow')).toBeInTheDocument()
    })
    it('should show 1 item', () => {
      expect(screen.getAllByTestId('CategoriesRow').length).toBe(1)
    })
    it('should show add button', () => {
      expect(screen.getByTestId('AddIcon')).toBeVisible()
    })
  })
  describe('When first rendering with 2 items', () => {
    beforeEach(() => {
      render(
        <CategoryTable
          categories={[
            {
              id: '1',
              title: 'title 1',
              description: 'desc 1',
              created: '2016-11-03T04:47:00.000Z',
              updated: '2016-11-03T04:47:00.000Z',
            },
            {
              id: '2',
              title: 'title 1',
              description: 'desc 1',
              created: '2016-11-03T04:47:00.000Z',
              updated: '2016-11-03T04:47:00.000Z',
            },
          ]}
        />
      )
    })
    it('should show header row', () => {
      expect(screen.getByTestId('CategoriesHeaderRow')).toBeInTheDocument()
    })
    it('should show 2 items', () => {
      expect(screen.getAllByTestId('CategoriesRow').length).toBe(2)
    })
  })
})
