import { mount } from '@vue/test-utils';
import AllView from '@/views/AllView.vue';
import Navbar from '@/components/Navbar.vue';

describe('AllView', () => {
  it('renders the correct header text', () => {
    const wrapper = mount(AllView);
    const header = wrapper.find('.header');
    expect(header.text()).toBe('Meine Übungen.');
  });
});

describe('Navbar', () => {
  it('should render all three nav items', () => {
    const wrapper = mount(Navbar);

    const bar = wrapper.find('#planLink')
    expect(bar.text()).toBe('Trainingsplan')

  });
});
