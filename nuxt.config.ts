// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Piglet chef',
            meta: [
                { name: 'description', content: 'Кулинарные рецепты' },
            ],
            link: [
                { rel: "icon", type: "image/ico", href: "assets/favicon.ico" }
            ]
        },
        pageTransition: {
            name: 'page',
            mode: 'out-in' // default
          },
        //   layoutTransition: { name: 'layout', mode: 'out-in' }
       
    },
    
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

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/app.scss";',
                },
            },
        },
    },
    
    router: {
        options: {
            linkActiveClass: 'active',
            linkExactActiveClass: 'active'
        }
    },

});
