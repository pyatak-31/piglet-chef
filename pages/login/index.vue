import layout from "nuxt/dist/app/components/layout";

<template>
    <NuxtLayout name="auth">
        <div class="login">
            <ui-title rank="1">
                Войти
            </ui-title>

            <snippet-login-form />
        </div>
    </NuxtLayout>
</template>

<script lang="ts">export default { name: 'LoginPage' }</script>

<script setup lang="ts">
    definePageMeta({ middleware: ["auth"], layout: false });
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