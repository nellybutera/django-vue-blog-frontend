<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-100 font-sans antialiased text-gray-800">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-lg py-4 px-6 md:px-12 flex justify-between items-center">
      <div class="text-2xl font-bold text-blue-600">
        <router-link to="/">Vue Blog</router-link>
      </div>
      <div class="space-x-4 md:space-x-6">
        <router-link to="/" class="text-gray-600 hover:text-blue-600 transition-colors duration-200">Home</router-link>
        <router-link to="/posts" class="text-gray-600 hover:text-blue-600 transition-colors duration-200">Posts</router-link>
        <router-link to="/login" class="text-gray-600 hover:text-blue-600 transition-colors duration-200">Login</router-link>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="container mx-auto mt-8 p-4 md:p-8">
      <router-view></router-view>
    </main>
  </div>
</template>


<style>
/* Basic styling for the router-link active state */
.router-link-active {
  color: #3b82f6;
  font-weight: 600;
}
</style>
