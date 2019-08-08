import { shallowMount } from '@vue/test-utils';
import ExpansionPanel from '@/components/ExpansionPanel.vue';

describe('ExpansionPanel.vue', () => {
  const show = false;
  const wrapper = shallowMount(ExpansionPanel, {
    propsData: {
      show,
    },
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("doesn't show content when not active", () => {
    expect(wrapper.find('.expansion-panel__content').exists()).toBe(false);
  });

  it('renders content when prop changes', () => {
    wrapper.setProps({ show: true });
    expect(wrapper.find('.expansion-panel__content').exists()).toBe(true);
  });
});
