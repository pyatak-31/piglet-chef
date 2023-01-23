<template>
    <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        v-html="path"
    ></svg>
</template>

<script lang="ts">export default { name: 'AppIcon' }</script>

<script setup lang="ts">
    import { icons } from './icons';

    interface IconProps {
        name: string;
    }

    const props = defineProps<IconProps>();

    const path = ref<string>(icons[props.name as keyof typeof icons]);
</script>

<style scoped>

</style>