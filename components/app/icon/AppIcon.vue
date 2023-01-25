<template>
    <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        :ariaLabelledby="ariaLabelledby?.id"
    >
        <title v-if="ariaLabelledby" :id="ariaLabelledby.id">{{ ariaLabelledby.title }}</title>
        <g v-html="path"></g>
    </svg>
</template>

<script lang="ts">export default { name: 'AppIcon' }</script>

<script setup lang="ts">
    import { icons } from './icons';

    interface AriaLabelledby {
        id: string;
        title: string;
    };

    interface IconProps {
        name: string;
        ariaLabelledby?: AriaLabelledby;
    };

    const props = defineProps<IconProps>();

    const path = ref<string>(icons[props.name as keyof typeof icons]);
</script>

<style scoped>

</style>