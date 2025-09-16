<template>
  <div class="space-y-6 max-w-4xl mx-auto">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-20">
      <p class="text-gray-500 text-lg">Loading post details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20 text-red-600">
      <h1 class="text-2xl font-semibold mb-2">Error loading post</h1>
      <p>{{ error }}</p>
    </div>

    <!-- Post Details -->
    <div v-else-if="post" class="bg-white rounded-xl shadow-lg p-8 md:p-12">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-4">{{ post.title }}</h1>
      <p class="text-sm text-gray-500 mb-6">
        By {{ post.author.username }} on {{ new Date(post.created_at).toLocaleDateString() }}
      </p>
      <div class="prose max-w-none text-gray-700 leading-relaxed">
        <p>{{ post.content }}</p>
      </div>
    </div>

    <!-- Fallback if post is not found -->
    <div v-else class="text-center py-20 text-gray-500">
      <p class="text-lg">Post not found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

// Reactive state
const post = ref(null);
const loading = ref(true);
const error = ref(null);

// Access the current route object to get the post ID
const route = useRoute();
const postId = route.params.id;

onMounted(async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/posts/${postId}/`);
    post.value = response.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      error.value = "Post not found.";
    } else {
      error.value = err.message || 'An unknown error occurred.';
    }
    console.error("Error fetching post:", err);
  } finally {
    loading.value = false;
  }
});
</script>
