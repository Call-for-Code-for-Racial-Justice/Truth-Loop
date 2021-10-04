import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import {Provider} from 'react-redux'
import {Route, Router} from 'react-router-dom'
import configureMockStore from 'redux-mock-store'
import RecordRoute from './RecordRoute'

const mockStore = configureMockStore()

describe('RecordRoute tests', () => {
  describe('When showing RecordRoute with no policyId', () => {
    beforeEach(() => {
      const store = mockStore({})
      const history = createMemoryHistory()
      render(<Provider store={store}><Router history={history}>
        <Route><RecordRoute/></Route>
      </Router></Provider>)
    })
    it('should show the policy not found', () => {
      expect(screen.getByTestId('noPolicyFound')).toBeInTheDocument()
    })
  })
  describe('When loading the route for valid policy', () => {
    beforeEach(() => {
      const store = mockStore({})
      const history = createMemoryHistory()
      history.push('/policy/1234')
      render(
        <Provider store={store}>
          <Router history={history}>
            <Route path={'/policy/:policyId'}><RecordRoute/></Route>
          </Router>
        </Provider>
      )
    })
    it('should NOT show the webcam', () => {
      expect(screen.queryByTestId('webcam')).not.toBeInTheDocument()
    })
    it('should show the video player', () => {
      expect(screen.getByTestId('videoPlayer')).toBeInTheDocument()
    })
    it('should provide the start recording option', () => {
      expect(screen.getByTestId('startRecording')).toBeInTheDocument()
    })
    it('should NOT provide the stop recording option', () => {
      expect(screen.queryByTestId('stopRecording')).not.toBeInTheDocument()
    })
  })
  describe('When starting the recording', () => {
    beforeEach(() => {
      const store = mockStore({})
      const history = createMemoryHistory()
      history.push('/policy/1234')
      render(
        <Provider store={store}>
          <Router history={history}>
            <Route path={'/policy/:policyId'}><RecordRoute/></Route>
          </Router>
        </Provider>
      )
      fireEvent.click(screen.getByTestId('startRecording'))
    })
    it('should show the webcam', () => {
      expect(screen.getByTestId('webcam')).toBeInTheDocument()
    })
    it('should NOT show the video player', () => {
      expect(screen.queryByTestId('videoPlayer')).not.toBeInTheDocument()
    })
    it('should provide the stop recording option', () => {
      expect(screen.getByTestId('stopRecording')).toBeInTheDocument()
    })
    it('should NOT provide the start recording option', () => {
      expect(screen.queryByTestId('startRecording')).not.toBeInTheDocument()
    })
  })
})