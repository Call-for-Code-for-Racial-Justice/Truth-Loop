import React from 'react'
import {render, screen} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import {Route, Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'
import * as policyDuck from '../store/policy.duck'

import PolicyRoute from './PolicyRoute'

const mockStore = configureMockStore()
let fetchCurrentPolicySpy

describe('PolicyRoute component tests', () => {
  beforeEach(() => {
    fetchCurrentPolicySpy = jest.spyOn(policyDuck, 'fetchCurrentPolicy').mockImplementation(() => {
      return {type: 'anything'}
    })
  })
  describe('when PolicyRoute fetch status returns an empty object', () => {
    beforeEach(() => {
      const store = mockStore({policy: {currentPolicy: null, status: ''}})
      const history = createMemoryHistory()
      render(<Provider store={store}><Router history={history}><PolicyRoute/></Router></Provider>)
    })
    it('should show empty policy notice', () => {
      expect(screen.getByTestId('emptyPolicy')).toBeInTheDocument()
    })
  })
  describe('when PolicyRoute fetch status is not idle, pending, or error', () => {
    beforeEach(() => {
      const store = mockStore({policy: {currentPolicy: 'Some error', status: ''}})
      const history = createMemoryHistory()
      render(<Provider store={store}><Router history={history}><PolicyRoute/></Router></Provider>)
    })
    it('should show empty policy notice', () => {
      expect(screen.getByTestId('emptyPolicy')).toBeInTheDocument()
    })
  })
  describe('when PolicyRoute fetch resulted in an error', () => {
    beforeEach(() => {
      const store = mockStore({
        policy: {currentPolicy: 'Some error', status: 'error'},
      })
      const history = createMemoryHistory()
      render(<Provider store={store}><Router history={history}><PolicyRoute/></Router></Provider>)
    })
    it('should show cannot load policy notice', () => {
      expect(screen.getByTestId('cannotLoadPolicy')).toBeInTheDocument()
    })
  })
  describe('when PolicyRoute fetch resulted is pending', () => {
    beforeEach(() => {
      const store = mockStore({
        policy: {currentPolicy: {}, status: 'pending'},
      })
      const history = createMemoryHistory()
      render(<Provider store={store}><Router history={history}><PolicyRoute/></Router></Provider>)
    })
    it('should show empty policy notice', () => {
      expect(screen.getByTestId('loadingPolicy')).toBeInTheDocument()
    })
  })

  describe('when PolicyRoute renders with policyId', () => {
    beforeEach(() => {
      const store = mockStore({
        policy: {currentPolicy: {}, status: 'idle'},
      })
      const history = createMemoryHistory()
      history.push('/policy/1234')
      render(
        <Provider store={store}>
          <Router history={history}><Route path={'/policy/:policyId'}><PolicyRoute/></Route></Router>
        </Provider>
      )
    })
    it('should show empty policy notice', () => {
      expect(screen.getByTestId('policyDetail')).toBeInTheDocument()
    })
  })
})