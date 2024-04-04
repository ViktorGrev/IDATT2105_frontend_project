// src/components/__tests__/Menu.spec.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Menu from '@/components/BaseComponents/Menu.vue'; // Adjust your import path as necessary

// Mocking useRouter by providing a mock function for push
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Menu.vue', () => {
  // Mock function to track router pushes
  const mockRouterPush = vi.fn();

  beforeEach(() => {
    // Clear mock history and sessionStorage before each test
    mockRouterPush.mockClear();
    sessionStorage.clear();
  });

  it('shows login and signup links when not logged in', async () => {
    // Simulate not being logged in
    const wrapper = mount(Menu, {
      global: {
        mocks: {
          $router: {
            push: mockRouterPush,
          },
        },
      },
    });

    // Check for Login and Sign up links
    expect(wrapper.text()).toContain('Login');
    expect(wrapper.text()).toContain('Sign up');
    expect(wrapper.find('.drop-menu').exists()).toBe(false);
  });

  it('shows user dropdown menu when logged in', async () => {
    // Simulate being logged in
    sessionStorage.setItem('userToken', '123');
    const wrapper = mount(Menu, {
      global: {
        mocks: {
          $router: {
            push: mockRouterPush,
          },
        },
      },
    });

    // Check for user dropdown menu
    expect(wrapper.find('.drop-menu').exists()).toBe(true);
    expect(wrapper.text()).not.toContain('Login');
    expect(wrapper.text()).not.toContain('Sign up');
  });

  // Add more tests as necessary to cover other functionalities
});
