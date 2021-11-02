import React from 'react'
import { fireEvent } from '@testing-library/react'
import { render, screen } from '../testUtils.js'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import PrivacyNotice from './PrivacyNotice'

const mockStore = configureMockStore()

describe('PrivacyNotice component tests', () => {
  describe('if the Privacy has been accepted', () => {
    beforeEach(async () => {
      const store = mockStore({ privacy: { privacyAccepted: true } })
      render(
        <Provider store={store}>
          <PrivacyNotice />
        </Provider>
      )
    })
    it('should hide the privacyNotice', async () => {
      expect(screen.queryByTestId('privacyNotice')).toHaveClass(
        'privacyNoticeClosed'
      )
    })
  })
  describe('if the Privacy has NOT been accepted', () => {
    beforeEach(async () => {
      const store = mockStore({ privacy: { privacyAccepted: false } })
      render(
        <Provider store={store}>
          <PrivacyNotice />
        </Provider>
      )
    })
    it('should show the privacyNotice', () => {
      expect(screen.queryByTestId('privacyNotice')).toHaveClass(
        'privacyNoticeOpen'
      )
    })
    describe('Accepting the policy', () => {
      beforeEach(() => {
        fireEvent.click(screen.queryByRole('button', { name: /Accept/ }))
      })
      it('should hide the privacyNotice', async () => {
        expect(screen.queryByTestId('privacyNotice')).toHaveClass(
          'privacyNoticeClosed'
        )
      })
    })
    describe('Cancelling the policy', () => {
      beforeEach(() => {
        fireEvent.click(screen.queryByRole('button', { name: /Cancel/ }))
      })
      it('should hide the privacyNotice', () => {
        expect(screen.queryByTestId('privacyNotice')).toHaveClass(
          'privacyNoticeClosed'
        )
      })
    })
    describe('Closing the policy', () => {
      beforeEach(() => {
        fireEvent.click(screen.queryByTitle('Close'))
      })
      it('should hide the privacyNotice', () => {
        expect(screen.queryByTestId('privacyNotice')).toHaveClass(
          'privacyNoticeClosed'
        )
      })
    })
  })
})
