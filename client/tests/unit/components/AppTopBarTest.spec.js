import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AppTopBar from "../../../src/components/AppTopBar";

const localVue = createLocalVue();
localVue.use(Vuex);

const factory = (values = { appTitle: '', hasBack: false, hasSettings: false }) => {
  const getters = {
    'appsettingstore/getAppTitle': () => values.appTitle,
    'appsettingstore/getTopBarSettings': () => ({ hasBack: values.hasBack, hasSettings: values.hasSettings }),
  };
  const store = new Vuex.Store({ getters });
  return shallowMount(AppTopBar, { store, localVue });
};

describe('AppTopBar.vue', () => {
  it('should render correct title', () => {
    const wrapper = factory({ appTitle: 'Hello World' });
    expect(wrapper.find('.title').text()).toEqual('Hello World');
  });

  it('should show the back component', () => {
    const wrapper = factory({ hasBack: true });
    expect(wrapper.find('.back').exists()).toBeTruthy();
  });

  it('should NOT show the back component', () => {
    const wrapper = factory({ hasBack: false });
    expect(wrapper.find('.back').exists()).toBeFalsy();
  });

  it('should show the settings component', () => {
    const wrapper = factory({ hasSettings: true });
    expect(wrapper.find('.right-panel').exists()).toBeTruthy();
  });

  it('should NOT show the settings component', () => {
    const wrapper = factory({ hasSettings: false });
    expect(wrapper.find('.right-panel').exists()).toBeFalsy();
  });
});
