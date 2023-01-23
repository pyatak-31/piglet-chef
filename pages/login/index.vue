import layout from "nuxt/dist/app/components/layout";

<template>
    <NuxtLayout name="auth">
        <div class="login">
            <ui-title rank="1">
                Войти
            </ui-title>

            <app-form
                :is-loading="isLoading"
                @on-submit="login"
            >
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
        
                <span v-if="error">{{ error }}</span>
        
                <ui-button
                    type="submit"
                    :disabled="isEmptyData"
                >
                    Войти
                </ui-button>

                <ui-button
                    theme="success"
                    size="default"
                    outline
                    rounded
                    @on-click="addValidData"
                >
                    <template #left-icon>
                        <app-icon name="flask" />
                    </template>
                </ui-button>
            </app-form>
        </div>
    </NuxtLayout>
</template>

<script lang="ts">export default { name: 'LoginPage' }</script>

<script setup lang="ts">
    definePageMeta({ middleware: ["auth"], layout: false });
    const { data, error, isLoading, isEmptyData, login } = useAuth();
    const addValidData = () => {
        data.value = {
            email: '1@m.ru',
            password: '123456',
        }
    }
</script>

<style lang="scss">
    
</style>