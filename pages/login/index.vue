import layout from "nuxt/dist/app/components/layout";

<template>
    <NuxtLayout name="auth">
        <div>
            <ui-title rank="1">
                Войти
            </ui-title>
            
            <ui-input
                id="email"
                type="text"
                class="login-form__el"
                label="Email"
                placeholder="Введите email"
                required
                v-model="data.email"
            />

            <ui-input
                id="password"
                type="password"
                class="login-form__el"
                label="Пароль"
                placeholder="Введите пароль"
                required
                v-model="data.password"
            />
            <span v-if="isLoading">....</span>
            <p v-if="token">
                {{ token }}
            </p>
    
            <span v-if="error">{{ error }}</span>
    
            <button @click="login">login</button>
            <button @click="logout">logout</button>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
    definePageMeta({ middleware: ["auth"], layout: false });
    const { data, error, token, isLoading, login, logout } = useAuth()
    // login()
</script>

<style scoped lang="scss">
    .login {
        @include font(black, 25px, 27px, 400);
    }
</style>