<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-64px)] bg-muted">
    <div class="w-full max-w-md p-8 space-y-8 bg-surface rounded-2xl shadow-lg">
      <h2 class="text-center text-3xl font-extrabold text-foreground">
        Sign in to your account
      </h2>

      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autocomplete="username"
              required
              v-model="username"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder:text-foreground/50 text-foreground rounded-t-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Username"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder:text-foreground/50 text-foreground rounded-b-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div v-if="error" class="text-destructive text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            :class="{'opacity-50 cursor-not-allowed': loading}"
          >
            <span v-if="loading">Logging in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>

        <p class="mt-4 text-center text-sm text-foreground/70">
          Don't have an account?
          <router-link to="/register" class="text-primary hover:underline">
            Register
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);
const router = useRouter();

const login = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/token/', {
      username: username.value,
      password: password.value,
    });
    console.log('Login successful!', response.data);
    router.push('/');
  } catch (err) {
    error.value = 'Invalid credentials. Please try again.';
    console.error('Login error:', err);
  } finally {
    loading.value = false;
  }
};
</script>
