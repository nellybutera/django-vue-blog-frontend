<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold text-gray-900">Blog App</router-link>
        <nav class="space-x-4">
          <router-link to="/posts" class="text-gray-600 hover:text-gray-900">Posts</router-link>
          <router-link to="/posts/create" class="text-gray-600 hover:text-gray-900">Create Post</router-link>
          <router-link to="/login" class="text-gray-600 hover:text-gray-900">Login</router-link>
        </nav>
      </div>
    </header>

    <main class="flex-grow py-10">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>

    <footer class="bg-gray-200 py-4 text-center text-gray-700">
      <p>© 2025 Blog App</p>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
