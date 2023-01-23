<template>
    <div>
        Mina
        <nuxt-link to="/login">fdfdffd</nuxt-link>
        <nuxt-link to="/test">test</nuxt-link>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });
</script>

<style scoped>

</style>