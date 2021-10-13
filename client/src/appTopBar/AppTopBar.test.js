import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import * as appSettings from '../store/appSettings.duck'
import AppTopBar from './AppTopBar'

const mockStore = configureMockStore()

describe('top-bar component test', ()=>{ 
	beforeEach(()=>{
		jest.spyOn(appSettings, 'updateAppSettings').mockImplementation(() => {
			return {type:'anything'}
		})
	})
    describe('after initial rendering', ()=>{
        it('checking that elements render',()=>{
			const store = mockStore({
				appSettings: {
					filters:{
						location:[],
						category:[]
					}
				}
			})
            render(
            	<MemoryRouter initialEntries={[{ pathname: '/', search: '?value=teresa_teng' }]}><Provider store={store}><AppTopBar /></Provider></MemoryRouter>
            )
            expect(screen.queryByTestId('backButton')).toBeNull()
            expect(screen.queryByText('Truth-Loop')).toBeInTheDocument()
            expect(screen.getByTestId('settingsButton')).toBeInTheDocument()
        })
    })
    describe('after moving away from home "/"',()=>{
        it('checking that elements render', ()=>{
			const store = mockStore({
				appSettings: {
					filters:{
						location:[],
						category:[]
					}
				}
			})
            render(
                <MemoryRouter initialEntries={[{ pathname: '/policy/1', search: '?value=teresa_teng' }]}><Provider store={store}><AppTopBar /></Provider></MemoryRouter>
            )
            expect(screen.queryByTestId('backButton')).toBeInTheDocument()
            fireEvent.click(screen.queryByTestId('backButton'))
            expect(screen.queryByText('Truth-Loop')).toBeInTheDocument()
            expect(screen.queryByTestId('settingsButton')).toBeInTheDocument()
        })
    })
})