<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

    <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded">
      {{ error }}
    </div>

    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label
          for="username"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Username</label
        >
        <input
          id="username"
          v-model="username"
          type="text"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your username"
        />
      </div>

      <div class="mb-6">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Password</label
        >
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :disabled="isLoading"
      >
        <span v-if="isLoading">Logging in...</span>
        <span v-else>Login</span>
      </button>
    </form>
  </div>
</template>

<script setup>
const { login, isLoading, error } = useAuth();

const username = ref("");
const password = ref("");

const handleLogin = () => {
  login(username.value, password.value);
};
</script>
