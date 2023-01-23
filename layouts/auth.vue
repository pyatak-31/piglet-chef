<template>
    <main class="auth-layout">
        <section class="auth-layout__content-side">
            <slot />           
        </section>

        <section class="auth-layout__decor-side"></section>
    </main>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
    .auth-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 100vh;

        &__content-side {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__decor-side {
            background-color: rgb(204, 165, 165);
        }
    }
</style>