import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import AdminTableToolbar from './AdminTableToolbar'

describe('AdminTableToolbar tests', () => {
  describe('when searchText is present', () => {
    beforeEach(() => {
      render(<AdminTableToolbar handleSearchRequest={() => {}} toolbarTitle={'Has Search Text'}/>)
      const searchInput = screen.getByPlaceholderText('Search...')
      fireEvent.change(searchInput, {target: {value: 'Something to search for'}})
      })
    it('should show the table title', () => {
      expect(screen.getByText('Has Search Text')).toBeVisible()
    })
    it('should show the ClearIcon', () => {
      expect(screen.getByTestId('ClearIcon')).toBeVisible()
    })
    it('should show the SearchIcon', () => {
      expect(screen.getByTestId('SearchIcon')).toBeVisible()
    })
  })
  describe('when no searchText is present', () => {
    beforeEach(() => {
      render(<AdminTableToolbar handleSearchRequest={() => {}} toolbarTitle={'No Search Text'}/>)
    })
    it('should show the table title', () => {
      expect(screen.getByText('No Search Text')).toBeVisible()
    })
    it('should NOT show the ClearIcon', () => {
      expect(screen.queryByTestId('ClearIcon')).not.toBeVisible()
    })
    it('should show the SearchIcon', () => {
      expect(screen.getByTestId('SearchIcon')).toBeVisible()
    })
  })
})
