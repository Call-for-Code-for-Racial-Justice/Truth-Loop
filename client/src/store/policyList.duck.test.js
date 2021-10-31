import reducer, {
  POLICY_LIST_ITEM_DETAILS_UPDATE,
  FETCH_POLICIES_FULFILLED,
} from './policyList.duck'

describe('policyList reducer tests', () => {
  let state, initialState
  beforeEach(() => {
    initialState = { items: [], selectedItemDetails: null }
  })

  describe('FETCH_POLICIES_FULFILLED tests', () => {
    describe('when passing new items', () => {
      beforeEach(() => {
        state = reducer(initialState, {
          type: FETCH_POLICIES_FULFILLED,
          payload: ['a', 'b'],
        })
      })
      it('should update items', () => {
        expect(state.items).toEqual(['a', 'b'])
      })
    })
    describe('when passing null as payload', () => {
      beforeEach(() => {
        state = reducer(initialState, {
          type: FETCH_POLICIES_FULFILLED,
          payload: null,
        })
      })
      it('should not update items', () => {
        expect(state.items).toEqual([])
      })
    })
    describe('when passing undefined as payload', () => {
      beforeEach(() => {
        state = reducer(initialState, {
          type: FETCH_POLICIES_FULFILLED,
          payload: undefined,
        })
      })
      it('should not update items', () => {
        expect(state.items).toEqual([])
      })
    })
  })

  describe('POLICY_LIST_ITEM_DETAILS_UPDATE tests', () => {
    describe('when passing new itemDetails', () => {
      beforeEach(() => {
        state = reducer(
          { ...initialState, selectedItemDetails: 'Test Details' },
          { type: POLICY_LIST_ITEM_DETAILS_UPDATE, payload: 'updated details' }
        )
      })
      it('should update selectedItemDetails', () => {
        expect(state.selectedItemDetails).toEqual('updated details')
      })
    })
    describe('when passing null as payload', () => {
      beforeEach(() => {
        state = reducer(
          { ...initialState, selectedItemDetails: 'Test Details' },
          { type: POLICY_LIST_ITEM_DETAILS_UPDATE, payload: null }
        )
      })
      it('should not update selectedItemDetails', () => {
        expect(state.selectedItemDetails).toEqual('Test Details')
      })
    })
    describe('when passing undefined as payload', () => {
      beforeEach(() => {
        state = reducer(
          { ...initialState, selectedItemDetails: 'Test Details' },
          { type: POLICY_LIST_ITEM_DETAILS_UPDATE, payload: undefined }
        )
      })
      it('should not update selectedItemDetails', () => {
        expect(state.selectedItemDetails).toEqual('Test Details')
      })
    })
  })

  describe('when no initial state exists', () => {
    beforeEach(() => {
      state = reducer(undefined, {})
    })
    it('should return the default state', () => {
      expect(state.items).toEqual([])
      expect(state.selectedItemDetails).toEqual(null)
    })
  })
})
