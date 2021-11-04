import React from 'react'
import { screen, render } from '@testing-library/react'
import SideNav from './SideNav'

describe('SideNav tests', () => {
  describe('checking visiblilty of sidenav when open is false', () => {
    beforeEach(() => {
      const open = false
      render(
        <SideNav open={open} handleClose={() => (open = false)} handleOpen={() => (open = true)} />
      )
    })
    it('sidenav should be closed', () => {
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
      expect(screen.queryByText('Levels')).not.toBeVisible()
      expect(screen.getByTestId('home')).not.toBeVisible()
      expect(screen.getByTestId('open-nav')).toBeVisible()
    })
  })
  describe('checking visiblilty of sidenav when open is true', () => {
    beforeEach(() => {
      const open = true
      render(
        <SideNav open={open} handleClose={() => (open = false)} handleOpen={() => (open = true)} />
      )
    })
    it('sidenav should be open', () => {
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
      expect(screen.getByText('Levels')).toBeVisible()
      expect(screen.getByTestId('close-nav')).toBeVisible()
      expect(screen.getByTestId('home')).toBeVisible()
      expect(screen.getByTestId('open-nav')).not.toBeVisible()
    })
  })
})
