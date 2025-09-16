import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Login from '../Login.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Mock the axios library
vi.mock('axios');

// Mock the vue-router's useRouter function
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

describe('Login.vue', () => {
  it('submits the form and navigates on successful login', async () => {
    // Mock the router's push method
    const mockRouter = { push: vi.fn() };
    useRouter.mockReturnValue(mockRouter);

    // Mock a successful API response with dummy token data
    axios.post.mockResolvedValue({
      data: { access: 'dummy-access-token', refresh: 'dummy-refresh-token' },
    });

    const wrapper = shallowMount(Login);

    // Set the form input values
    await wrapper.find('#username').setValue('testuser');
    await wrapper.find('#password').setValue('testpassword');

    // Simulate form submission
    await wrapper.find('form').trigger('submit');

    // Assert that the axios.post method was called with the correct data
    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/token/', {
      username: 'testuser',
      password: 'testpassword',
    });

    // Assert that the router's push method was called to navigate
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for the async call to resolve
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('displays an error message on API failure', async () => {
    // Mock the router
    useRouter.mockReturnValue({ push: vi.fn() });

    // Mock a failed API call with a 401 Unauthorized status
    axios.post.mockRejectedValue({
      response: {
        status: 401,
        data: { detail: 'No active account found with the given credentials' }
      }
    });

    const wrapper = shallowMount(Login);

    await wrapper.find('#username').setValue('wronguser');
    await wrapper.find('#password').setValue('wrongpassword');
    await wrapper.find('form').trigger('submit');

    // Wait for the async call
    await new Promise(resolve => setTimeout(resolve, 0));

    // Assert that the error message is displayed
    const errorMessage = wrapper.find('.text-red-600').text();
    expect(errorMessage).toContain('Invalid credentials');
  });
});
