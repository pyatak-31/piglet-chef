<template>
    <div>
        create

        <ui-button @click="create">aadd</ui-button>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({ middleware: ["auth"], pageTransition: { name: 'page' }});
    
    const { create } = useTools();
</script>

<style scoped>

</style>