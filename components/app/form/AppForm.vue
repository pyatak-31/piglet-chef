<template>
    <form
        class="form"
        @submit.prevent="onSubmit"
    >
        <slot />

        <page-loader
            class="form__loader"
            v-if="isLoading"
        />
    </form>
</template>

<script lang="ts">export default { name: 'AppForm' }</script>

<script setup lang="ts">
    import {} from '#app';

    interface FormProps {
        isLoading?: boolean;
    }

    const props = withDefaults(defineProps<FormProps>(), {
        isLoading: false
    });

    const emits = defineEmits<{
        (e: 'onSubmit'): void
    }>();

    const onSubmit = () => {
        emits('onSubmit');
    };
</script>

<style lang="scss">
    .form {
        position: relative;

        // &__el {
        //     & + & {
        //         margin-top: 18px;
        //     }
        // }

        // &__submit-btn {
        //     margin-top: 30px;
        // }

        &__loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>