import React from 'react'
import { fireEvent } from '@testing-library/react'
import { render, screen } from '../testUtils.js'
import PolicyDetail from './PolicyDetail'
import * as transformDate from '../transformDate'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

describe('PolicyDetail component tests', () => {
  let transformDateSpy, historyPushSpy
  describe('when rendering an item', () => {
    beforeEach(() => {
      transformDateSpy = jest.spyOn(transformDate, 'default')
      const history = createMemoryHistory()
      historyPushSpy = jest.spyOn(history, 'push')
      render(
        <Router history={history}>
          {/* eslint-disable-next-line camelcase */}
          <PolicyDetail
            policy={{
              id: '105',
              title: 'test title',
              summary: 'test summary',
              officials: [],
              date_introduced: '2016-11-03T04:47:00.000Z',
              status: 'some status',
              link_to_full_text: 'https://example.com',
              related: [],
            }}
          />
        </Router>
      )
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('should show the date', () => {
      expect(screen.getByTestId('dateIntroduced')).toBeInTheDocument()
    })
    it('should transform the date', () => {
      expect(transformDateSpy).toBeCalledWith('2016-11-03T04:47:00.000Z')
    })
    describe('when opting to Tell My Story', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByTestId('tellMyStoryButton'))
      })
      it('should route to PolicyRoute', () => {
        expect(historyPushSpy).toHaveBeenCalledWith('/policy/105/record')
      })
    })
  })
})
