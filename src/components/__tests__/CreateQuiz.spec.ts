import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import MyComponent from '@/components/CreateQuiz/CreateQuiz.vue';

// Mock axios globally
vi.mock('axios', () => ({
    default: {
      post: vi.fn(() => Promise.resolve({ data: 'Mock response' })),
    },
    // If you're using named exports as well, add them here
  }));

describe('MyComponent', () => {
  it('adds a new question', async () => {
    const wrapper = mount(MyComponent);
    await wrapper.vm.addQuestion('multipleChoice');
    expect(wrapper.vm.questions.length).toBe(2); // Assuming 1 question exists by default
  });

  it('deletes a question', async () => {
    const wrapper = mount(MyComponent);
    // Add a question first to delete it
    await wrapper.vm.addQuestion('multipleChoice');
    await wrapper.vm.deleteQuestion(2);
    expect(wrapper.vm.questions.length).toBe(1);
  });

  it('adds and removes a tag', async () => {
    const wrapper = mount(MyComponent);
    wrapper.vm.quizTagInput = 'newTag';
    await wrapper.vm.addTag();
    expect(wrapper.vm.quizTags.includes('newTag')).toBe(true);

    await wrapper.vm.removeTag('newTag');
    expect(wrapper.vm.quizTags.includes('newTag')).toBe(false);
  });

  it('creates a quiz', async () => {
    const wrapper = mount(MyComponent);
    wrapper.vm.quizTitle = 'Test Quiz';
    wrapper.vm.quizDescription = 'This is a test description';
    wrapper.vm.quizTags = ['tag1', 'tag2'];
    wrapper.vm.quizCategory = 'MATH';

    // Simulate form submission or button click for creating quiz
    await wrapper.vm.createQuiz();
    
    // Check if axios.post was called correctly
    expect(vi.mocked(axios.post)).toHaveBeenCalledWith(
      'http://localhost:8080/api/quiz',
      expect.anything(),
      expect.anything()
    );
  });
});
