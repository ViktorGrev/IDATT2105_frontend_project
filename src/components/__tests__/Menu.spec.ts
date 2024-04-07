import { describe, it, expect, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { useRouter, useRoute } from 'vue-router';
import YourComponent from '@/components/BaseComponents/Menu.vue'; // Adjust the path to your component

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

// Define your test
it('', async () => {
  const mockRouter = {
    push: vi.fn(),
  };
  vi.mocked(useRouter).mockReturnValue(mockRouter);

  const pinia = createPinia();
    setActivePinia(pinia);

  const wrapper = mount(YourComponent, {
    global: {
      mocks: {
        $router: mockRouter,
        useRouter: () => mockRouter,
      },
    },
  });

  await wrapper.find('.logo').trigger('click');
  expect(mockRouter.push).toHaveBeenCalledWith({ name: 'home' });
});
