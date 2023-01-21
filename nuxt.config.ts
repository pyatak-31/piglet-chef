// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        FIREBASE_API_KEY: process.env.API_KEY,
        public: {}
    },
});
