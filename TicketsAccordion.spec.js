import { shallowMount } from '@vue/test-utils';
import TicketsAccordion from '@/components/tickets/TicketsAccordion.vue';
import { ticketListData } from '../../store/modules/dataMocks';

describe('TicketstAccordion.vue', () => {
  const ticketsData = ticketListData;
  const wrapper = shallowMount(TicketsAccordion, {
    propsData: {
      ticketsData,
    },
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
