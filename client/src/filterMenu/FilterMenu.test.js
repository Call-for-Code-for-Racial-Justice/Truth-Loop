import React from 'react'
import { render, screen } from '@testing-library/react'
import FilterMenu from './FilterMenu'

describe('wheck rendering of the filterMenu',()=>{
    it('check rendering of menu as show is true', ()=>{
        render(<FilterMenu show={true}/>)
        expect(screen.queryByText('Filter by:')).toBeInTheDocument()
        expect(screen.getByTestId('filterSelection')).toBeInTheDocument()
   })
})
