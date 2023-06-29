import { mount } from '@vue/test-utils';
import AllView from '@/views/AllView.vue';
import NavBar from '@/components/NavBar.vue';
import LoginForm from "@/components/LoginForm.vue";


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

    const plan = wrapper.find('#planLink')
    const exercises = wrapper.find('#exercisesLink')
    const create = wrapper.find('#createLink')

    expect(plan.text()).toBe('Trainingsplan')
    expect(exercises.text()).toBe('Alle Übungen')
    expect(create.text()).toBe('Neue Übung')

  });
});

test('Register button click',  async () => {
  const wrapper = mount(LoginForm)

  await wrapper.find('a').trigger('click')
  expect(wrapper.find('a').text()).toBe('Log In')
  expect(wrapper.find('h3').text()).toBe('Registrieren')

})



