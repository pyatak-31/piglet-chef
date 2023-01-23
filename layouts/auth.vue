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
        grid-template-columns: 1fr;
        min-height: 100vh;

        @media (min-width: $md) {
            grid-template-columns: 1fr 1fr;
        }

        &__content-side {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px;
        }

        &__decor-side {
            display: none;
            
            @media (min-width: $md) {
                display: block;
                background-image:  url('/assets/images/auth.jpg');
                background-position: 100%;
                background-repeat: no-repeat;

            }

            @media (min-width: 1300px) {
                background-image:  url('/assets/images/auth2.png');
                background-position:  0%;
            }

            @media (min-width: 2000px) {
                background-image: url('/assets/images/auth.jpg'), url('/assets/images/auth2.png');
                background-position: 100%, 0%;
            }
        }
    }
</style>