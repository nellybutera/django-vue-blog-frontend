<template>
  <div class="space-y-6">
    <h1 class="text-4xl font-bold text-gray-900">All Posts</h1>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-10">
      <p class="text-gray-500 text-lg">Loading posts...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-10 text-red-600">
      <p>Error: {{ error }}</p>
      <p>Could not load posts. Please try again later.</p>
    </div>

    <!-- No Posts Found State -->
    <div v-else-if="!posts || posts.length === 0" class="text-center py-10 text-gray-500">
      <p>No posts have been published yet.</p>
    </div>

    <!-- Posts List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-800">{{ post.title }}</h2>
        <p class="text-gray-600 mt-2 line-clamp-3">{{ post.content }}</p>
        <router-link :to="`/posts/${post.id}`" class="text-blue-600 hover:underline mt-4 inline-block">Read more</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reactive state for our data
const posts = ref([]);
const loading = ref(true);
const error = ref(null);

// Lifecycle hook to fetch data when the component is mounted
onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/posts/');
    posts.value = response.data;
  } catch (err) {
    error.value = err.message || 'An unknown error occurred.';
    console.error("Error fetching posts:", err);
  } finally {
    loading.value = false;
  }
});
</script>
