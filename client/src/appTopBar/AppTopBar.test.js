import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import AppTopBar from './AppTopBar'
describe('top-bar component test', ()=>{
    describe('after initial rendering', ()=>{
        it('checking that elements render',()=>{
            render(
                <MemoryRouter initialEntries={[{ pathname: '/', search: '?value=teresa_teng' }]}><AppTopBar /></MemoryRouter>
            )
            expect(screen.queryByTestId('backButton')).toBeNull()
            expect(screen.queryByText('Truth-Loop')).toBeInTheDocument()
            expect(screen.getByTestId('settingsButton')).toBeInTheDocument()
        })
    })
    describe('after moving away from home "/"',()=>{
        it('checking that elements render', ()=>{
            render(
                <MemoryRouter initialEntries={[{ pathname: '/policy/1', search: '?value=teresa_teng' }]}><AppTopBar /></MemoryRouter>
            )
            expect(screen.queryByTestId('backButton')).toBeInTheDocument()
            fireEvent.click(screen.queryByTestId('backButton'))
            expect(screen.queryByText('Truth-Loop')).toBeInTheDocument()
            expect(screen.queryByTestId('settingsButton')).toBeInTheDocument()
        })
    })
})