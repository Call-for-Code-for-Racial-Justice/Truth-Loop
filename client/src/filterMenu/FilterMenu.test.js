import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import * as appSettings from '../store/appSettings.duck'
import FilterMenu from './FilterMenu'

const mockStore = configureMockStore()
describe('check rendering of the filterMenu',()=>{
	beforeEach(() => {
		jest.spyOn(appSettings, 'updateAppSettings').mockImplementation(() => {
			return {type:'anything'}
		})
		const store = mockStore({
			appSettings: {
				filters:{
					location:[],
					category:[]
				}
			}
		})
		render(<Provider store={store}><FilterMenu show={true}/></Provider>)
	})
    it('check rendering of menu as show is true', ()=>{
        expect(screen.queryByText('Filter:')).toBeInTheDocument()
        expect(screen.getByTestId('filterSelection')).toBeInTheDocument()
		expect(screen.queryByText('State:')).toBeInTheDocument()
		expect(screen.queryByTestId('state-selection')).toBeTruthy()
		expect(screen.queryByTestId('category-selection')).toBeTruthy()
		expect(screen.queryByText('Category:')).toBeInTheDocument()
		expect(screen.queryByText('Apply')).toBeInTheDocument()
		expect(screen.queryByText('Clear')).toBeInTheDocument()
   })
})
