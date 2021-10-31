import fetchPolicy from './fetchPolicy'
import policy from './mockdata/CURRENT_FULL_RETRIEVAL_OF_ARTIFACT_1'

describe('fetchPolicy tests', () => {
  let expectedPolicy
  describe('mock data flag is set', () => {
    beforeEach(async () => {
      process.env.REACT_APP_MOCK_DATA = 'true'
      expectedPolicy = await fetchPolicy(1)
    })
    it('should return the mocked policy', () => {
      expect(expectedPolicy).toEqual(policy)
    })
  })
  describe('mock data flag is any string', () => {
    beforeEach(async () => {
      process.env.REACT_APP_MOCK_DATA = 'false'
      expectedPolicy = await fetchPolicy(1)
    })
    it('should return the mocked policy', () => {
      expect(expectedPolicy).toEqual(policy)
    })
  })
  describe('when not using mock data', () => {
    let globalFetchSpy
    beforeEach(async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ some: 'thing' }),
        })
      )
      globalFetchSpy = jest.spyOn(global, 'fetch')
      process.env.REACT_APP_MOCK_DATA = ''
      process.env.REACT_APP_SERVER_URL = 'https://example.com'
      expectedPolicy = await fetchPolicy(1)
    })
    it('should call the legislativeArtifacts endpoint', () => {
      expect(globalFetchSpy).toHaveBeenLastCalledWith(
        'https://example.com/api/v1/legislativeArtifacts/fullDetail/1'
      )
    })
    it('should return an object', () => {
      expect(expectedPolicy).toEqual({ some: 'thing' })
    })
  })
})
