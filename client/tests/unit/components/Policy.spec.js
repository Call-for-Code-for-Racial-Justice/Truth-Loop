import { mount } from '@vue/test-utils';
import PolicyListItem from "../../../src/components/Policy";

const factory = (values = { propsData: {} }) => mount(PolicyListItem, { ...values });

describe('Policy tests', () => {
  describe('rendering tests', () => {
    it('should display appropriate title', () => {
      const wrapper = factory({ propsData: { title: 'Policy Title' } });
      expect(wrapper.find('.title').text()).toEqual('Policy Title');
    });
    it('should display appropriate summary', () => {
      const wrapper = factory({ propsData: { summary: 'Policy Summary' } });
      expect(wrapper.find('.summary').text()).toEqual('Policy Summary');
    });
    it('should display appropriate Intro Date', () => {
      const wrapper = factory({ propsData: { date_introduced: '2020-06-01T11:30:00.000Z' } });
      expect(wrapper.find('.introdate').text()).toEqual('Introduced: 6-1-2020');
    });
  });

  describe('computed tests', () => {
    describe('rowType tests', () => {
      it('should return "sentiment-bar-1 odd" if row_num is 0', () => {
        const wrapper = factory({ propsData: { row_num: 0 } });
        expect(wrapper.vm.rowType).toEqual('sentiment-bar-1 odd');
      });
      it('should return "sentiment-bar-1 even" if row_num is 1', () => {
        const wrapper = factory({ propsData: { row_num: 1 } });
        expect(wrapper.vm.rowType).toEqual('sentiment-bar-1 even');
      });
      it('should return "sentiment-bar-1 odd" if row_num is 2', () => {
        const wrapper = factory({ propsData: { row_num: 2 } });
        expect(wrapper.vm.rowType).toEqual('sentiment-bar-1 odd');
      });
    });
    describe('getIntroDt tests', () => {
      it('should return formatted date', () => {
        const wrapper = factory({ propsData: { date_introduced: '2020-06-01T11:30:00.000Z' } });
        expect(wrapper.vm.getIntroDt).toEqual('6-1-2020');
      });
    });
  });

  describe('router tests', () => {
    let mocks;
    beforeEach(() => {
      mocks = {
        $router: {
          push: jest.fn(),
        },
      };
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should go to the policy details matching the id', () => {
      const wrapper = mount(PolicyListItem, { mocks, propsData: { id: '1234' } });
      wrapper.find('.policy-card .bx--row.r2').trigger('click');
      expect(mocks.$router.push).toHaveBeenCalledWith({ path: '/policy/1234' });
    });
  });
});
