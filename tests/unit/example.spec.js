import { mount } from '@vue/test-utils';
import AllView from '@/views/AllView.vue';

describe('AllView', () => {
  it('renders the correct header text', () => {
    const wrapper = mount(AllView);
    const header = wrapper.find('.header');
    expect(header.text()).toBe('Meine Übungen.');
  });
});
