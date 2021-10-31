import React from 'react'
import { fireEvent } from '@testing-library/react'
import { render, screen } from '../testUtils.js'
import PolicyTableItem from './PolicyTableItem'
import * as transformDate from '../transformDate'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

describe('PolicyTableItem component tests', () => {
  let transformDateSpy, historyPushSpy
  describe('when rendering an item', () => {
    beforeEach(() => {
      transformDateSpy = jest.spyOn(transformDate, 'default')
      const history = createMemoryHistory()
      historyPushSpy = jest.spyOn(history, 'push')

      render(
        <Router history={history}>
          <PolicyTableItem
            id={1}
            summary={'Test Summary'}
            title={'Test Title'}
            dateIntroduced={'2016-11-03T04:47:00.000Z'}
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
    it('should show the title', () => {
      expect(screen.getByTestId('summary')).toBeInTheDocument()
    })
    it('should show the summary', () => {
      expect(screen.getByTestId('title')).toBeInTheDocument()
    })

    describe('when selecting an item', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByTestId('policyTableItem1'))
      })
      it('should route to PolicyRoute', () => {
        expect(historyPushSpy).toHaveBeenCalledWith('/policy/1')
      })
    })
  })
  describe('rowType tests', () => {
    describe('when rowNum 0', () => {
      beforeEach(() => {
        render(
          <PolicyTableItem
            id={1}
            summary={'Test Summary'}
            title={'Test Title'}
            dateIntroduced={'2016-11-03T04:47:00.000Z'}
            rowNumber={0}
          />
        )
      })
      it('should have sentiment-bar-1 class', () => {
        expect(screen.getByTestId('sentimentBarRow0')).toHaveClass(
          'sentiment-bar-1'
        )
      })
      it('should have odd class', () => {
        expect(screen.getByTestId('sentimentBarRow0')).toHaveClass('odd')
      })
    })
    describe('when rowNum 1', () => {
      beforeEach(() => {
        render(
          <PolicyTableItem
            id={1}
            summary={'Test Summary'}
            title={'Test Title'}
            dateIntroduced={'2016-11-03T04:47:00.000Z'}
            rowNumber={1}
          />
        )
      })
      it('should have sentiment-bar-1 class', () => {
        expect(screen.getByTestId('sentimentBarRow1')).toHaveClass(
          'sentiment-bar-1'
        )
      })
      it('should have odd class', () => {
        expect(screen.getByTestId('sentimentBarRow1')).toHaveClass('even')
      })
    })
    describe('when rowNum 2', () => {
      beforeEach(() => {
        render(
          <PolicyTableItem
            id={1}
            summary={'Test Summary'}
            title={'Test Title'}
            dateIntroduced={'2016-11-03T04:47:00.000Z'}
            rowNumber={2}
          />
        )
      })
      it('should have sentiment-bar-1 class', () => {
        expect(screen.getByTestId('sentimentBarRow2')).toHaveClass(
          'sentiment-bar-1'
        )
      })
      it('should have odd class', () => {
        expect(screen.getByTestId('sentimentBarRow2')).toHaveClass('odd')
      })
    })
  })
})
