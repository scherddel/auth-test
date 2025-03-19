// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  nitro: {
    // Configure CORS for the Nitro server
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization'
        }
      }
    }
  }
})