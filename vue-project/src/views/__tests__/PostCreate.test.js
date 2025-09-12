import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import PostCreate from '../PostCreate.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Mock the axios library
vi.mock('axios');

// Mock the vue-router's useRouter function
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

describe('PostCreate.vue', () => {
  it('submits the form data and navigates on success', async () => {
    // Mock the router's push method
    const mockRouter = {
      push: vi.fn(),
    };
    useRouter.mockReturnValue(mockRouter);
    
    // Mock a successful API response with a new post ID
    axios.post.mockResolvedValue({
      data: {
        id: 123,
        title: 'New Post',
        content: 'Test content',
      },
    });

    const wrapper = shallowMount(PostCreate);

    // Find the input and textarea elements and set their values
    await wrapper.find('#title').setValue('New Post');
    await wrapper.find('#content').setValue('Test content');

    // Simulate form submission
    await wrapper.find('form').trigger('submit');

    // Assert that the axios.post method was called with the correct data
    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/posts/', {
      title: 'New Post',
      content: 'Test content',
    });

    // Assert that the router's push method was called to navigate to the new post
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'post-detail',
      params: { id: 123 },
    });
  });

  it('displays an error message on API failure', async () => {
    // Mock the router's push method
    const mockRouter = { push: vi.fn() };
    useRouter.mockReturnValue(mockRouter);
    
    // Mock a failed API call
    axios.post.mockRejectedValue(new Error('API Error'));
    
    const wrapper = shallowMount(PostCreate);

    await wrapper.find('form').trigger('submit');
    
    // Assert that the error message is displayed
    const errorMessage = wrapper.find('.text-red-600').text();
    expect(errorMessage).toContain('Failed to create post');
  });
});
