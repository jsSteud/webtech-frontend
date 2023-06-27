import { mount } from '@vue/test-utils';
import AllView from '@/views/AllView.vue';
import NavBar from '@/components/NavBar.vue';

describe('AllView', () => {
  it('renders the correct header text', () => {
    const wrapper = mount(AllView);
    const header = wrapper.find('.header');
    expect(header.text()).toBe('Meine Übungen.');
  });
});

describe('NavBar', () => {
  it('should render all three nav items', () => {
    const wrapper = mount(NavBar);

    const bar = wrapper.find('#planLink')
    expect(bar.text()).toBe('Trainingsplan')

  });
});
