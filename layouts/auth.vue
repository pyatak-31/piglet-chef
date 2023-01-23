<template>
    <div class="auth-layout">
        <div class="auth-layout__content-side">
            <slot />           
        </div>

        <div class="auth-layout__decor-side"></div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
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