import React from 'react'
import AdminTable from './AdminTable'
import {render, screen} from '@testing-library/react'

describe('AdminTable Tests', () => {
  describe('When loading items', () => {
    beforeEach(() => {
      render(<AdminTable rows={[]}
                         isLoading={true}
                         headCells={[{id: 'id', label: 'ID'}]}
                         caption={'Hello Widgets'}
                         tableLabel={'Widgets'}/>)
    })
    it('should show progressBar', () => {
      expect(screen.getByRole('progressbar')).toBeVisible()
    })
  })
  describe('When done loading items', () => {
    beforeEach(() => {
      render(<AdminTable rows={[]}
                         isLoading={false}
                         headCells={[{id: 'id', label: 'ID'}]}
                         caption={'Hello Widgets'}
                         tableLabel={'Widgets'}/>)
    })
    it('should not show progressBar', () => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
  })
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
  describe('when provided an onEditItem function', () => {
    beforeEach(() => {
      render(<AdminTable
        rows={[{id: '1', title: 'title 1'}]}
        headCells={[{id: 'id', label: 'ID'}]}
        caption={'Other Widgets, hello'} tableLabel={'OtherWidgets'}
        onEditItem={() => {}}
      />)
    })
    it('should show an edit icon', () => {
      expect(screen.getByTestId('EditIcon')).toBeVisible()
    })
  })
  describe('when provided no onEditItem function', () => {
    beforeEach(() => {
      render(<AdminTable
        rows={[{id: '1', title: 'title 1'}]}
        headCells={[{id: 'id', label: 'ID'}]}
        caption={'Other Widgets, hello'} tableLabel={'OtherWidgets'}
      />)
    })
    it('should not show an edit icon', () => {
      expect(screen.queryByTestId('EditIcon')).not.toBeInTheDocument()
    })
  })
  describe('when provided an onDeleteItem function', () => {
    beforeEach(() => {
      render(<AdminTable
        rows={[{id: '1', title: 'title 1'}]}
        headCells={[{id: 'id', label: 'ID'}]}
        caption={'Other Widgets, hello'} tableLabel={'OtherWidgets'}
        onDeleteItem={() => {}}
      />)
    })
    it('should show an edit icon', () => {
      expect(screen.getByTestId('DeleteIcon')).toBeVisible()
    })
  })
  describe('when provided no onDeleteItem function', () => {
    beforeEach(() => {
      render(<AdminTable
        rows={[{id: '1', title: 'title 1'}]}
        headCells={[{id: 'id', label: 'ID'}]}
        caption={'Other Widgets, hello'} tableLabel={'OtherWidgets'}
      />)
    })
    it('should not show an edit icon', () => {
      expect(screen.queryByTestId('DeleteIcon')).not.toBeInTheDocument()
    })
  })
})
