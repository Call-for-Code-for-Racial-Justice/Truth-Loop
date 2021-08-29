import React from 'react'
import {render, screen} from '@testing-library/react'
import PolicyTableItem from './PolicyTableItem'
import * as transformDate from './transformDate'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('PolicyTableItem component tests', () => {
  let transformDateSpy, historyPushSpy
  describe('when rendering an item', () => {
    beforeEach(() => {
      transformDateSpy = jest.spyOn(transformDate, 'default')
      const history = createMemoryHistory()
      historyPushSpy = jest.spyOn(history, 'push')

      render(
        <Router history={history}>
          <PolicyTableItem id={1} summary={'Test Summary'} title={'Test Title'}
                           dateIntroduced={'2016-11-03T04:47:00.000Z'}/>
        </Router>
      )
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('should show the date', () => {
      expect(screen.getByTestId('date-introduced')).toBeInTheDocument()
    })
    it('should transform the date', () => {
      expect(transformDateSpy).toBeCalledWith('2016-11-03T04:47:00.000Z')
    })
    it('should show the title', () => {
      expect(screen.getByTestId('summary')).toBeInTheDocument()
    })
    it('should show the summary', () => {
      expect(screen.getByTestId('title')).toBeInTheDocument()
    })

    describe('when selecting an item', () => {
      beforeEach(() => {
        userEvent.click(screen.getByTestId('policyTableItem1'))
      })
      it('should route to PolicyRoute', () => {
        expect(historyPushSpy).toHaveBeenCalledWith('/policy/1')
      })
    })
  })
})