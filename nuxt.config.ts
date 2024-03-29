// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  pages: true,
  typescript: {
    strict: true,
    shim: false,
  },
});
