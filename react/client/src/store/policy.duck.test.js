import reducer, {DEFAULT_STATE, FETCH_CURRENT_POLICY_FULFILLED} from './policy.duck'

describe('policy reducer tests', () => {
  let actualState, initialState
  beforeEach(() => {
    initialState = {...DEFAULT_STATE}
  })

  describe('FETCH_CURRENT_POLICY_FULFILLED action tests', () => {
    beforeEach(() => {
      initialState = {...initialState, currentPolicy: {some: 'policy'}}
    })
    describe('when passing a new currentPolicy', () => {
      beforeEach(() => {
        actualState = reducer(initialState, {type: FETCH_CURRENT_POLICY_FULFILLED, payload: {different: 'policy'}})
      })
      it('should update the currentPolicy', () => {
        expect(actualState.currentPolicy).toEqual({different: 'policy'})
      })
    })
    describe('when passing null for currentPolicy', () => {
      beforeEach(() => {
        actualState = reducer(initialState, {type: FETCH_CURRENT_POLICY_FULFILLED, payload: null})
      })
      it('should not update the currentPolicy', () => {
        expect(actualState.currentPolicy).toEqual({some: 'policy'})
      })
    })
    describe('when passing undefined for currentPolicy', () => {
      beforeEach(() => {
        actualState = reducer(initialState, {type: FETCH_CURRENT_POLICY_FULFILLED, payload: undefined})
      })
      it('should not update the currentPolicy', () => {
        expect(actualState.currentPolicy).toEqual({some: 'policy'})
      })
    })
  })

  describe('when no initial state exists', () => {
    beforeEach(() => {
      actualState = reducer(undefined, {})
    })
    it('should return the default state', () => {
      expect(actualState).toEqual({...DEFAULT_STATE})
    })
    it('should have a null currentPolicy', () => {
      expect(actualState.currentPolicy).toEqual(null)
    })
  })
})