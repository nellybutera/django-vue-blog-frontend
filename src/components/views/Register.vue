<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-64px)] bg-muted">
    <div class="w-full max-w-md p-8 space-y-8 bg-surface rounded-2xl shadow-lg">
      <h2 class="text-center text-3xl font-extrabold text-foreground">
        Create Account
      </h2>

      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            v-model="fullName"
            required
            class="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <input
            type="text"
            placeholder="Username"
            v-model="username"
            required
            class="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            required
            class="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            required
            class="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div v-if="error" class="text-destructive text-sm text-center">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-md transition duration-300"
          :class="{'opacity-50 cursor-not-allowed': loading}"
        >
          <span v-if="loading">Registering...</span>
          <span v-else>Register</span>
        </button>

        <p class="mt-4 text-center text-sm text-foreground/70">
          Already have an account?
          <router-link to="/login" class="text-primary hover:underline">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const fullName = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);
const router = useRouter();

const register = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register/', {
      full_name: fullName.value,
      username: username.value,
      email: email.value,
      password: password.value,
    });
    console.log('Registration successful!', response.data);
    router.push('/login');
  } catch (err) {
    error.value = 'Registration failed. Please try again.';
    console.error('Registration error:', err);
  } finally {
    loading.value = false;
  }
};
</script>
