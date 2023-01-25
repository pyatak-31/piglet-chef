<template>
    <app-form
        class="login__form"
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

        <span
            class="login-form__error"
            v-if="error"
        >
            {{ error }}
        </span>

        <div class="login-form__buttons">
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
                aria-label="Вставить данные авторизации в форму"
                @on-click="addValidData"
            >
                <template #left-icon>
                    <app-icon name="flask" />
                </template>
            </ui-button>
        </div>
    </app-form>
</template>

<script lang="ts">export default { name: 'SnippetLoginForm' }</script>

<script setup lang="ts">
    import {} from '#app';
    const { data, error, isLoading, isEmptyData, login } = useAuth();
    const addValidData = () => {
        data.value = {
            email: 'admin@mail.ru',
            password: '123456',
        }
    };
</script>

<style lang="scss">
    .login-form {
        &__el {
            & + & {
                margin-top: 18px;
            }
        }

        &__error {
            display: inline-block;
            margin-top: 20px;
            @include font($danger, 18px, 21px, 700);
        }

        &__submit-btn {
            margin-top: 30px;
        }

        &__buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            margin-top: 30px;
        }
    }
</style>