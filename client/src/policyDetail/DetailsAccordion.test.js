import React from 'react'
import {render, screen} from '@testing-library/react'
import DetailsAccordion from './DetailsAccordion'

describe('DetailsAccordion component tests', () => {
  describe('when no officials and sponsors', () => {
    beforeEach(() => {
      render(
        <DetailsAccordion officialsAndSponsors={[]} policyStatus={'Some status'} relatedPolicies={[]} summary={'test summary'}/>
      )
    })
    it('should show no officials or sponsors', () => {
      expect(screen.getByText('No officials or sponsors')).toBeVisible()
    })
  })
  describe('when one official', () => {
    beforeEach(() => {
      render(
        <DetailsAccordion officialsAndSponsors={[{id: 1, title: 'Capt. official'}]} policyStatus={'Some status'} relatedPolicies={[]} summary={'test summary'}/>
      )
    })
    it('should show one official', () => {
      expect(screen.getAllByTestId('officialsDetails').length).toBe(1)
    })
    it('should show official\'s title', () => {
      expect(screen.getByText('Title: Capt. official')).toBeVisible()
    })
  })
  describe('when two officials', () => {
    beforeEach(() => {
      render(
        <DetailsAccordion officialsAndSponsors={[
          {id: 1, title: 'Capt. official'},
          {id: 2, title: 'The other official'}
        ]}
                          policyStatus={'Some status'}
                          relatedPolicies={[]}
                          summary={'test summary'}/>
      )
    })
    it('should show two officials', () => {
      expect(screen.getAllByTestId('officialsDetails').length).toBe(2)
    })
    it('should first official\'s title', () => {
      expect(screen.getByText('Title: Capt. official')).toBeVisible()
    })
    it('should second official\'s title', () => {
      expect(screen.getByText('Title: The other official')).toBeVisible()
    })
  })
})