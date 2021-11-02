import React from 'react'
import { screen, render } from '@testing-library/react'
import SideNavTab from './SideNavTab'

describe('SideNav tests', () => {
  describe('checking visiblilty of sidenavtab', () => {
    beforeEach(() => {
      render(<SideNavTab link="categories" label="Categories" />)
    })
    it('sidenavtab items should be visible', () => {
      expect(screen.getByTestId('side-nav-item')).toBeInTheDocument()
      expect(screen.queryByText('Categories')).toBeVisible()
      expect(screen.getByText('Add Categories')).toBeInTheDocument()
    })
  })
  describe('checking visiblilty of sidenavtab for rest api link', () => {
    beforeEach(() => {
      render(<SideNavTab link="api-docs" label="API Docs" />)
    })
    it('sidenavtab should be in document', () => {
      expect(screen.getByTestId('rest-api')).toBeInTheDocument()
      expect(screen.getByText('REST API Docs')).toBeInTheDocument()
    })
  })
})
