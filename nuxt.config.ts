// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        public: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
            ACCESS_TOKEN: 'access-token',
            REFRESH_TOKEN: 'refresh-token',
        }
    },
    modules: [
        '@pinia/nuxt',
        'vite-plugin-vue-type-imports/nuxt',
    ],
});
