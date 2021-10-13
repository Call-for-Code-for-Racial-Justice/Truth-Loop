import React from 'react'
import { render, screen } from '@testing-library/react'

import {AppliedFilters} from './AppliedFilters'

describe('check rendering of AppliedFilters', () => {
	it('check that main div is in the document', () => {
		render(<AppliedFilters states={['bubbles']} categories={['test']} />)
		expect(screen.queryByTestId('applied-filters')).toBeInTheDocument()
		expect(screen.queryByText('bubbles')).toBeInTheDocument()
		expect(screen.queryByText('test')).toBeInTheDocument()
	}) 

})