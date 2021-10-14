import React from 'react'
import { render, screen } from '@testing-library/react'
import PolicyTable from './PolicyTable'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const mockStore = configureMockStore()

describe('PolicyTable component tests', () => {
	describe('when policy list is empty', () => {
		beforeEach(() => {
			const store = mockStore({
				appSettings: { filters: { location: [], category: [] } },
			})
			render(<Provider store={store}><PolicyTable policies={[]} /></Provider>)
		})
		it('should show empty policy table', () => {
			expect(screen.queryByTestId('emptyPolicyTable')).toBeInTheDocument()
		})
	})
	describe('when policy list has one item', () => {
		beforeEach(() => {
			const store = mockStore({
				appSettings: { filters: { location: [], category: [] } },
			})
			render(<Provider store={store}><PolicyTable policies={[{ id: 1, title: '', summary: '', date_introduced: '2016-11-03T04:47:00.000Z' }]} /></Provider>)
		})
		it('should show policy table', () => {
			expect(screen.queryByTestId('policyTable')).toBeInTheDocument()
		})
		it('should show 1 policy item', () => {
			expect(screen.queryAllByTestId('policyItem')).toHaveLength(1)
		})
	})
})
