<template>
    <div>
        login
        <span v-if="isLoading">....</span>
        <p v-if="token">
            {{ token }}
        </p>

        <span v-if="error">{{ error }}</span>

        <button @click="login">login</button>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({ middleware: ["auth"] });
    const { login, error, token, isLoading } = useAuth()
    // login()
</script>

<style scoped>

</style>