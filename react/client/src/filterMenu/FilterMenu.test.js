import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterMenu from './FilterMenu'

describe('wheck rendering of the filterMenu',()=>{
    it('check rendering of menu as show is true', ()=>{
        render(<FilterMenu show={true}/>)
        expect(screen.queryByText('Filter by:')).toBeInTheDocument()
        expect(screen.getByTestId('filterSelection')).toBeInTheDocument()
   }) 
})
