import layout from "nuxt/dist/app/components/layout";

<template>
    <div class="login">
        <ui-title rank="1">
            Войти
        </ui-title>

        <module-login-form />
    </div>
</template>

<script lang="ts">export default { name: 'LoginPage' }</script>

<script setup lang="ts">
    definePageMeta({ middleware: ["auth"], layout: 'auth' });
    useHead({
        title: 'Войти',
        meta: [
            { name: 'description', content: 'Войти в приложение' }
        ],
    });
</script>

<style lang="scss">
    .login {
        position: relative;
        width: 100%;
        
        @media (min-width: $sm) {
            width: 400px;
        }

        &__form {
            margin-top: 30px;
        }
    }
</style>