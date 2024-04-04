import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useRouter, useRoute } from 'vue-router';
import Leaderboard from '@/components/StartQuiz/Leaderboard.vue';
import { createRouter, createWebHistory } from 'vue-router';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

describe('Leaderboard', () => {
  const leaderboardData = [
    {
      "user": {
        "id": 11,
        "username": "user1"
      },
      "score": 3
    },
  ];

  it('renders correctly with props', () => {
    const wrapper = mount(Leaderboard, {
      props: {
        leaderboard: leaderboardData,
      },
    });
    
    expect(wrapper.findAll('tr').length).toBe(leaderboardData.length);
  });

  it('displays a gold medal for the top scorer', () => {
    const wrapper = mount(Leaderboard, {
      props: {
        leaderboard: leaderboardData,
      },
    });
    const firstEntryMedal = wrapper.find('tr:first-child .gold-medal');
    expect(firstEntryMedal.exists()).toBe(true);
  });

  it('navigates to user profile on username click', async () => {
    const mockRouter = {
      push: vi.fn(),
    };
    vi.mocked(useRouter).mockReturnValue(mockRouter);

    const wrapper = mount(Leaderboard, {
      props: {
        leaderboard: leaderboardData,
      },
      global: {
        mocks: {
          useRouter: () => mockRouter,
        },
      },
    });

    await wrapper.find('.name').trigger('click');
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'user', params: { id: leaderboardData[0].user.id } });
  });
});
