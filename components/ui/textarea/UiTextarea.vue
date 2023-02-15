<template>
    <div class="form-input">
        <textarea
            :id="id"
            class="form-input__field"
            :class="{
                'form-input__field--error': error,
                'form-input__field--disable-resize': !enableResize,
            }"
            :required="required"
            v-bind="$attrs"
            :value="modelValue"
            @input="onChange($event)"
        ></textarea>

        <label
            :for="id"
            class="form-input__label"
            v-if="label"
        >
            {{ label }}<span v-if="required">*</span>
        </label>

        <small
            class="form-input__error"
            v-if="error"
        >
            {{ error }}
        </small>
    </div>
</template>

<script lang="ts">export default { name: 'UiTextarea' };</script>

<script setup lang="ts">
    interface textareaProps {
        id?: string;
        label?: string;
        modelValue: string;
        required?: boolean,
        error?: string;
        enableResize?: boolean;
    };

    const props = defineProps<textareaProps>();

    const emit = defineEmits(['update:modelValue']);

    const onChange = (event: Event) => {
        let value: string = (event.target as HTMLInputElement).value;
        emit('update:modelValue', value);
    };
</script>

<style scoped lang="scss">
$text-color: $dark;
$placeholder-color: $grey-1;
$border-color: $grey-2;
$border-color-focus: $primary-50;
$border-color-error: $danger;

.form-input {
    display: flex;
    flex-direction: column;

    &__label {
        align-self: flex-start;
        order: 0;
        margin-bottom: 5px;
        padding-left: 0px;
        @include font($text-color, 16px, 24px, 400);
        cursor: pointer;
        transition: padding-left .3s, font-weight .3s;
    }

    &__field {
        order: 1;
        width: 100%;
        padding: 8px 16px;
        @include font($text-color, 14px, 20px, 400);
        border: 1px solid $border-color;
        border-radius: 4px;

        &::placeholder {
            color: $placeholder-color;
        }

        &:focus {
            border-color: $border-color-focus;

            & + .form-input__label {
                padding-left: 16px;
                font-weight: 700;
            }
        }

        &--error {
            border-color: $border-color-error;
        }

        &--disable-resize {
            resize: none;
        }
    }

    &__error {
        order: 3;
        margin-top: 2px;
        @include font($border-color-error, 12px, 16px, 400);
    }
}
</style>