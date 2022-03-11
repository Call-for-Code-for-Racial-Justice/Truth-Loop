import React from 'react'
import { render, screen } from '@testing-library/react'
import ArtifactRoute from './ArtifactRoute'

describe('ArtifactsRoute Tests', () => {
  beforeAll(() => {
    jest.spyOn(window, 'fetch')
  })
  describe('When first rendering', () => {
    beforeEach(() => {
      window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [{ some: 'item' }],
      })
      render(<ArtifactRoute />)
    })
    it('should request items', () => {
      expect(window.fetch).toBeCalledTimes(1)
    })
    it('should render the table', () => {
      expect(screen.getByTestId('ArtifactsTable')).toBeInTheDocument()
    })
  })
})
