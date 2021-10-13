import React from 'react'
import AdminTable from './AdminTable'
import {render, screen} from '@testing-library/react'

describe('AdminTable Tests', () => {
  describe('When first rendering with 1 item', () => {
    beforeEach(() => {
      render(<AdminTable rows={[{id: '1'}]} headCells={[{id: 'id', label: 'ID'}]} caption={'Hello Widgets'} tableLabel={'Widgets'}/>)
    })
    it('should show a caption', () => {
      expect(screen.getByTestId('WidgetsCaption')).toHaveTextContent('Hello Widgets')
    })
    it('should show header row', () => {
      expect(screen.getByTestId('WidgetsHeaderRow')).toBeInTheDocument()
    })
    it('should show 1 item', () => {
      expect(screen.getAllByTestId('WidgetsRow').length).toBe(1)
    })
  })
  describe('When first rendering with 2 items', () => {
    beforeEach(() => {
      render(<AdminTable
        rows={[{id: '1', title: 'title 1'}, {id: '2', title: 'title 2'}]}
        headCells={[{id: 'id', label: 'ID'}]}
        caption={'Other Widgets, hello'} tableLabel={'OtherWidgets'}
      />)
    })
    it('should show a caption', () => {
      expect(screen.getByTestId('OtherWidgetsCaption')).toHaveTextContent('Other Widgets, hello')
    })
    it('should show header row', () => {
      expect(screen.getByTestId('OtherWidgetsHeaderRow')).toBeInTheDocument()
    })
    it('should show 2 items', () => {
      expect(screen.getAllByTestId('OtherWidgetsRow').length).toBe(2)
    })
  })
})
