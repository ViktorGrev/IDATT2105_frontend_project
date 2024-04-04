import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import QuestionEditBox from '@/components/CreateQuiz/QuestionEditBox.vue'; // Adjust the import path according to your file structure

describe('YourComponent', () => {
  it('emits updateQuestion when updateQuestionText is called', async () => {
    const wrapper = mount(QuestionEditBox, {
      props: {
        question: { id: 1, questionText: 'Initial Text' },
        index: 0,
      },
    });

    wrapper.vm.updateQuestionText('Updated Text');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()).toHaveProperty('updateQuestion');
    expect(wrapper.emitted('updateQuestion')[0]).toEqual([{ id: 1, questionText: 'Updated Text' }]);
  });

  it('emits deleteQuestion when deleteQuestion is called', async () => {
    const wrapper = mount(QuestionEditBox, {
      props: {
        question: { id: 1 },
        index: 0,
      },
    });

    wrapper.vm.deleteQuestion();
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()).toHaveProperty('deleteQuestion');
    expect(wrapper.emitted('deleteQuestion')[0]).toEqual([1]);
  });

  it('emits setCorrectAnswer with the correct payload when updateCorrectAnswer is called', async () => {
    const wrapper = mount(QuestionEditBox, {
      props: {
        question: { id: 1 },
        index: 0,
      },
    });

    wrapper.vm.updateCorrectAnswer(2); // Assuming answerIndex is 2
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()).toHaveProperty('setCorrectAnswer');
    expect(wrapper.emitted('setCorrectAnswer')[0]).toEqual([1, 2]);
  });

  it('emits handleImageUpload with the correct payload when uploadImage is called', async () => {
    const wrapper = mount(QuestionEditBox, {
      props: {
        question: { id: 1 },
        index: 0,
      },
    });
    const mockEvent = new Event('change'); // Mock the change event

    wrapper.vm.uploadImage(mockEvent);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()).toHaveProperty('handleImageUpload');
    expect(wrapper.emitted('handleImageUpload')[0][0]).toEqual(mockEvent);
    expect(wrapper.emitted('handleImageUpload')[0][1]).toEqual(1);
  });

  // Additional tests can be added to check for proper rendering based on props
});
