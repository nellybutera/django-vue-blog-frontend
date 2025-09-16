import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import PostDetail from '../PostDetail.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

// Mock the axios library
vi.mock('axios');

// Mock the vue-router's useRoute function
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

describe('PostDetail.vue', () => {
  // Test case for a successful API call
  it('displays the post details on a successful API response', async () => {
    // Mock the useRoute() call to return a specific ID
    useRoute.mockReturnValue({
      params: {
        id: 1,
      },
    });

    const mockPost = {
      id: 1,
      title: 'Test Post',
      content: 'This is the content of the test post.',
      author: { username: 'testuser' },
      created_at: '2023-01-01T00:00:00Z',
    };

    axios.get.mockResolvedValue({ data: mockPost });

    const wrapper = shallowMount(PostDetail);

    // Wait for the async API call to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    // Assert that the post title and content are rendered
    expect(wrapper.find('h1').text()).toContain('Test Post');
    expect(wrapper.find('.prose').text()).toContain('This is the content of the test post.');
  });

  // Test case for a failed API call (e.g., 404 Not Found)
  it('displays an error message when the post is not found', async () => {
    // Mock the useRoute() call to return a specific ID
    useRoute.mockReturnValue({
      params: {
        id: 999, // An ID that won't be found
      },
    });

    // Mock a 404 error from the API
    axios.get.mockRejectedValue({
      response: {
        status: 404,
      },
    });

    const wrapper = shallowMount(PostDetail);

    await new Promise(resolve => setTimeout(resolve, 0));

    // Assert that the "not found" error message is displayed
    expect(wrapper.find('div.text-red-600').exists()).toBe(true);
    expect(wrapper.find('div.text-red-600').text()).toContain('Post not found.');
  });
});
