import reducer, {DEFAULT_STATE, POLICY_CURRENT_POLICY_UPDATED} from './policy.duck'

describe('policy reducer tests', () => {
  let actualState, initialState
  beforeEach(() => {
    initialState = {...DEFAULT_STATE}
  })

  describe('POLICY_CURRENT_POLICY_UPDATED action tests', () => {
    beforeEach(() => {
      initialState = {...initialState, currentPolicy: {some: 'policy'}}
    })
    describe('when passing a new currentPolicy', () => {
      beforeEach(() => {
        actualState = reducer(initialState, {type: POLICY_CURRENT_POLICY_UPDATED, payload: {different: 'policy'}})
      })
      it('should update the currentPolicy', () => {
        expect(actualState.currentPolicy).toEqual({different: 'policy'})
      })
    })
    describe('when passing null for currentPolicy', () => {
      beforeEach(() => {
        actualState = reducer(initialState, {type: POLICY_CURRENT_POLICY_UPDATED, payload: null})
      })
      it('should not update the currentPolicy', () => {
        expect(actualState.currentPolicy).toEqual({some: 'policy'})
      })
    })
    describe('when passing undefined for currentPolicy', () => {
      beforeEach(() => {
        actualState = reducer(initialState, {type: POLICY_CURRENT_POLICY_UPDATED, payload: undefined})
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