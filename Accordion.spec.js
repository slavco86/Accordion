import { mount, createLocalVue } from '@vue/test-utils';
import Accordion from '@/components/Accordion.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import { ticketListData } from '../store/modules/dataMocks';

describe('Accordion.vue', () => {
  const items = ticketListData;
  const localVue = createLocalVue();

  localVue.use(ExpansionPanel);

  const wrapper = mount(Accordion, {
    propsData: {
      items,
    },
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('iterates over the items list', () => {
    expect(wrapper.findAll({ name: 'ExpansionPanel' }).length).toBe(
      items.length
    );
  });

  describe('Internal state management', () => {
    const renderedExpansionPanelInstance = wrapper
      .findAll({ name: 'ExpansionPanel' })
      .at(1);

    it('contains an activator to toggle state', () => {
      expect(
        renderedExpansionPanelInstance.find('.accordion__activator').exists()
      ).toBe(true);
    });

    it('activator toggles state when clicked', () => {
      const activator = renderedExpansionPanelInstance.find(
        '.accordion__activator'
      );
      activator.trigger('click');

      expect(wrapper.vm.$data.state[1]).toBe(true);
    });

    it('sets the state in reactive manner that prompts expansion panel to open', () => {
      expect(
        renderedExpansionPanelInstance
          .find('.expansion-panel__content')
          .exists()
      ).toBe(true);
    });
  });
});
