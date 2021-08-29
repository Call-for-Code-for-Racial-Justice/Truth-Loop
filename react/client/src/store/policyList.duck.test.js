import reducer, {POLICY_LIST_ITEM_DETAILS_UPDATE, POLICY_LIST_ITEMS_UPDATE} from './policyList.duck'
import mockedPolicyDataList from '../mockdata/CURRENT_LIST_RESULT'

describe('policyList reducer tests', () => {
  let state, initialState
  beforeEach(() => {
    initialState = { items: [], selectedItemDetails: null }
  })

  describe('POLICY_LIST_ITEMS_UPDATE tests', () => {
    describe('when passing new items', () => {
      beforeEach(() => {
        state = reducer(initialState, {type: POLICY_LIST_ITEMS_UPDATE, payload: ['a', 'b']})
      })
      it('should update items', () => {
        expect(state.items).toEqual(['a', 'b'])
      })
    })
    describe('when passing null as payload', () => {
      beforeEach(() => {
        state = reducer(initialState, {type: POLICY_LIST_ITEMS_UPDATE, payload: null})
      })
      it('should not update items', () => {
        expect(state.items).toEqual([])
      })
    })
    describe('when passing undefined as payload', () => {
      beforeEach(() => {
        state = reducer(initialState, {type: POLICY_LIST_ITEMS_UPDATE, payload: undefined})
      })
      it('should not update items', () => {
        expect(state.items).toEqual([])
      })
    })
  })

  describe('POLICY_LIST_ITEM_DETAILS_UPDATE tests', () => {
    describe('when passing new itemDetails', () => {
      beforeEach(() => {
        state = reducer({ ...initialState, selectedItemDetails: 'Test Details' }, {type: POLICY_LIST_ITEM_DETAILS_UPDATE, payload: 'updated details'})
      })
      it('should update selectedItemDetails', () => {
        expect(state.selectedItemDetails).toEqual('updated details')
      })
    })
    describe('when passing null as payload', () => {
      beforeEach(() => {
        state = reducer({ ...initialState, selectedItemDetails: 'Test Details' }, {type: POLICY_LIST_ITEM_DETAILS_UPDATE, payload: null})
      })
      it('should not update selectedItemDetails', () => {
        expect(state.selectedItemDetails).toEqual('Test Details')
      })
    })
    describe('when passing undefined as payload', () => {
      beforeEach(() => {
        state = reducer({ ...initialState, selectedItemDetails: 'Test Details' }, {type: POLICY_LIST_ITEM_DETAILS_UPDATE, payload: undefined})
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
      expect(state.items).toEqual(mockedPolicyDataList)
      expect(state.selectedItemDetails).toEqual(null)
    })
  })
})