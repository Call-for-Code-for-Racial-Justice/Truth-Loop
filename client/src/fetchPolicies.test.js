import fetchPolicies from './fetchPolicies'
import MOCK_POLICY_LIST from './mockdata/CURRENT_LIST_RESULT'

describe('fetchPolicies tests', () => {
  let actualPolicies
  describe('mock data flag is set', () => {
    beforeEach(async () => {
      process.env.REACT_APP_MOCK_DATA = 'true'
      actualPolicies = await fetchPolicies()
    })
    it('should return the mocked policy', () => {
      expect(actualPolicies).toEqual(MOCK_POLICY_LIST)
    })
  })
  describe('mock data flag is any string', () => {
    beforeEach(async () => {
      process.env.REACT_APP_MOCK_DATA = 'false'
      actualPolicies = await fetchPolicies()
    })
    it('should return the mocked policy', () => {
      expect(actualPolicies).toEqual(MOCK_POLICY_LIST)
    })
  })
  describe('when not using mock data', () => {
    let globalFetchSpy
    beforeEach(async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([{ some: 'thing' }]),
        })
      )
      globalFetchSpy = jest.spyOn(global, 'fetch')
      process.env.REACT_APP_MOCK_DATA = ''
      process.env.REACT_APP_SERVER_URL = 'https://example.com'
      actualPolicies = await fetchPolicies()
    })
    it('should call the legislativeArtifacts endpoint', () => {
      expect(globalFetchSpy).toHaveBeenLastCalledWith(
        'https://example.com/api/v1/legislativeArtifacts'
      )
    })
    it('should return an object', () => {
      expect(actualPolicies).toEqual([{ some: 'thing' }])
    })
  })
})
