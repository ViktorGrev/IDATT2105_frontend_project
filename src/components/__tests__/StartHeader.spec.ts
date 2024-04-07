import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeaderComponent from '@/components/StartQuiz/StartHeader.vue' // Adjust the import path according to your file structure

describe('HeaderComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(HeaderComponent, {
      props: {
        title: 'Test Title',
        questions: 10,
        avgScore: 100 + "",
        difficulty: "MEDIUM",
        creator: 'Test Creator',
      },
    })

    // Assert the rendered text of the component
    expect(wrapper.text()).toContain('Test Title')
    expect(wrapper.text()).toContain('10 questions')
    expect(wrapper.text()).toContain('Average score: 100')
    expect(wrapper.text()).toContain('Made by: Test Creator')

    // You can also assert the existence of specific classes or elements
    expect(wrapper.find('.header').exists()).toBe(true)
    expect(wrapper.find('.topHeader').exists()).toBe(true)
    expect(wrapper.find('.bottomHeader').exists()).toBe(true)
    expect(wrapper.find('.title').text()).toBe('Test Title')
    expect(wrapper.find('.amountQuestion').text()).toBe('10 questions')
    expect(wrapper.find('.views').text()).toBe('Average score: 100')
    expect(wrapper.find('.creator').text()).toBe('Made by: Test Creator')
  })
})
