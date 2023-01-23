<template>
    <div>
        <div class="loader"></div>
    </div>
</template>

<script lang="ts">export default { name: 'AppLoader' }</script>

<script setup lang="ts">

</script>

<style lang="scss">
    .loader {
        position: relative;
        display: block;
        width: 150px;
        height: 150px;
        border: 3px solid transparent;
        border-top-color: $primary;
        border-radius: 50%;
        animation: spin 2s linear infinite;
        
        &:before {
            content: "";
            top: 5px;
            right: 5px;
            bottom: 5px;
            left: 5px;
            position: absolute;
            border: 3px solid transparent;
            border-top-color: $warning;
            border-radius: 50%;
            animation: spin 3s linear infinite;
        }

        &:after {
            content: "";
            position: absolute;
            top: 15px;
            left: 15px;
            bottom: 15px;
            right: 15px;
            border: 3px solid transparent;
            border-top-color: $success;
            border-radius: 50%;
            animation: spin 1.5s linear infinite;
        }
    }


    @keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>