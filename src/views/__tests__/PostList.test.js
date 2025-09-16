import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import PostList from '../PostList.vue';
import axios from 'axios';

// Mock the axios library to prevent actual API calls
vi.mock('axios');

describe('PostList.vue', () => {

  // Test case for successful API call
  it('displays a list of posts on successful API response', async () => {
    // Define the mock data we want the API to return
    const mockPosts = [
      { id: 1, title: 'Post 1', content: 'Content of post 1' },
      { id: 2, title: 'Post 2', content: 'Content of post 2' },
    ];
    
    // Configure the mock axios.get to return our mock data
    axios.get.mockResolvedValue({ data: mockPosts });

    // Mount the component
    const wrapper = shallowMount(PostList);
    
    // Wait for the asynchronous API call to complete
    await new Promise(resolve => setTimeout(resolve, 0)); // A simple way to wait for the next tick

    // Assert that the loading state is gone
    expect(wrapper.find('p').text()).not.toContain('Loading posts...');

    // Assert that the posts are rendered
    const postTitles = wrapper.findAll('h2').map(h2 => h2.text());
    expect(postTitles).toEqual(['Post 1', 'Post 2']);
  });

  // Test case for a failed API call
  it('displays an error message on API failure', async () => {
    // Configure the mock axios.get to reject with an error
    axios.get.mockRejectedValue(new Error('Network Error'));

    const wrapper = shallowMount(PostList);

    await new Promise(resolve => setTimeout(resolve, 0));

    // Assert that the error message is displayed
    expect(wrapper.find('div.text-red-600').exists()).toBe(true);
    expect(wrapper.find('div.text-red-600').text()).toContain('Network Error');
  });

});
