import reducer, {
  DEFAULT_STATE,
  PRIVACY_ACCEPTED_UPDATE,
  PRIVACY_CANCELLED_UPDATE,
} from './privacy.duck'

describe('privacy reducer tests', () => {
  let actualState, initialState
  beforeEach(() => {
    initialState = { ...DEFAULT_STATE }
  })
  describe('PRIVACY_ACCEPTED_UPDATE', () => {
    beforeEach(() => {
      initialState = { ...initialState, privacyAccepted: true }
    })
    describe('when payload is null', () => {
      beforeEach(() => {
        actualState = reducer(initialState, {
          type: PRIVACY_ACCEPTED_UPDATE,
          payload: null,
        })
      })
      it('should not change privacyAccepted', () => {
        expect(actualState.privacyAccepted).toBe(true)
      })
    })
    describe('when payload is undefined', () => {
      beforeEach(() => {
        actualState = reducer(initialState, {
          type: PRIVACY_ACCEPTED_UPDATE,
          payload: undefined,
        })
      })
      it('should not change privacyAccepted', () => {
        expect(actualState.privacyAccepted).toBe(true)
      })
    })
    describe('when payload is provided', () => {
      beforeEach(() => {
        actualState = reducer(initialState, {
          type: PRIVACY_ACCEPTED_UPDATE,
          payload: false,
        })
      })
      it('should not change privacyAccepted', () => {
        expect(actualState.privacyAccepted).toBe(false)
      })
    })
  })

  describe('PRIVACY_CANCELLED_UPDATE', () => {
    beforeEach(() => {
      initialState = { ...initialState, privacyCancelled: true }
    })
    describe('when payload is null', () => {
      beforeEach(() => {
        actualState = reducer(initialState, {
          type: PRIVACY_CANCELLED_UPDATE,
          payload: null,
        })
      })
      it('should not change privacyCancelled', () => {
        expect(actualState.privacyCancelled).toBe(true)
      })
    })
    describe('when payload is undefined', () => {
      beforeEach(() => {
        actualState = reducer(initialState, {
          type: PRIVACY_CANCELLED_UPDATE,
          payload: undefined,
        })
      })
      it('should not change privacyCancelled', () => {
        expect(actualState.privacyCancelled).toBe(true)
      })
    })
    describe('when payload is provided', () => {
      beforeEach(() => {
        actualState = reducer(initialState, {
          type: PRIVACY_CANCELLED_UPDATE,
          payload: false,
        })
      })
      it('should not change privacyCancelled', () => {
        expect(actualState.privacyCancelled).toBe(false)
      })
    })
  })

  describe('when no initial state exists', () => {
    beforeEach(() => {
      actualState = reducer(undefined, {})
    })
    it('should return the default state', () => {
      expect(actualState).toEqual({ ...DEFAULT_STATE })
    })
    it('should have a false privacyAccepted flag', () => {
      expect(actualState.privacyAccepted).toBe(false)
    })
    it('should have a false privacyCancelled flag', () => {
      expect(actualState.privacyCancelled).toBe(false)
    })
  })
})
