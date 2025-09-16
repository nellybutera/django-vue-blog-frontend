<template>
  <div class="space-y-6 max-w-2xl mx-auto">
    <h1 class="text-4xl font-bold text-gray-900 text-center">Create a New Post</h1>

    <form @submit.prevent="createPost" class="bg-white rounded-xl shadow-lg p-8">
      <div class="mb-6">
        <label for="title" class="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          id="title"
          v-model="post.title"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div class="mb-6">
        <label for="content" class="block text-gray-700 font-semibold mb-2">Content</label>
        <textarea
          id="content"
          v-model="post.content"
          rows="10"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <div class="flex items-center justify-end space-x-4">
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-3 font-semibold rounded-lg transition-colors duration-200"
          :class="{'bg-blue-600 text-white hover:bg-blue-700': !loading, 'bg-gray-400 text-gray-600 cursor-not-allowed': loading}"
        >
          {{ loading ? 'Creating...' : 'Create Post' }}
        </button>
      </div>

      <div v-if="error" class="mt-4 text-center text-red-600">
        <p>{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const post = ref({
  title: '',
  content: '',
});

const loading = ref(false);
const error = ref(null);

const createPost = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/posts/', post.value);
    
    // Redirect to the newly created post's detail page
    router.push({ name: 'post-detail', params: { id: response.data.id } });
  } catch (err) {
    error.value = 'Failed to create post. Please try again.';
    console.error('Error creating post:', err);
  } finally {
    loading.value = false;
  }
};
</script>
