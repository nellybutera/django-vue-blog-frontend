<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-surface shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold text-foreground">
          Blog App
        </router-link>
        <nav class="space-x-4">
          <router-link 
            to="/posts" 
            class="text-foreground/70 hover:text-foreground"
          >
            Posts
          </router-link>
          <router-link 
            to="/posts/create" 
            class="text-foreground/70 hover:text-foreground"
          >
            Create Post
          </router-link>
          <router-link 
            to="/login" 
            class="text-foreground/70 hover:text-foreground"
          >
            Login
          </router-link>
        </nav>
      </div>
    </header>

    <main class="flex-grow py-10">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>

    <footer class="bg-muted py-4 text-center text-foreground/70">
      <p>© 2025 Blog App</p>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
