import React from 'react'
import { render, screen } from '@testing-library/react'
import RelatedPolicyDetails from './RelatedPolicyDetails'

describe('Test the rendering of the related policy component', () => {
  describe('test for empty relatedPolicy', () => {
    beforeEach(() => {
      render(<RelatedPolicyDetails />)
    })
    it('test when policy is empty', () => {
      expect(screen.getByTestId('relatedPolicy')).toBeInTheDocument()
    })
  })

  describe('test for populated relatedPolicy', () => {
    beforeEach(() => {
      render(<RelatedPolicyDetails policy={'Legislative Article 05'} id={5} />)
    })
    it('test when policy is empty', () => {
      expect(screen.getByTestId('relatedPolicy')).toBeInTheDocument()
      expect(screen.getByText('Legislative Article 05')).toBeVisible()
    })
  })
})
