<template>
    <nuxt-link
        class="menu-link"
        :class="{ 'active': isParent(to) }"
        :to="to"
        no-prefetch
        :exact="isMainPage(to)"
        @click="onClick"
    >
        <i class="menu-link__icon">
            <app-icon :name="iconName" />
        </i>
        {{ name }}
    </nuxt-link>  
</template>

<script setup lang="ts">
    interface MenuLinkProps {
        to?: string;
        name: string;
        iconName: string;
    };

    const props = defineProps<MenuLinkProps>();

    const emit = defineEmits(['onClick']);

    const route = useRoute();

    const isMainPage = (routeItem: string | undefined) => {
        return routeItem === '/';
    }

    const isParent = (routeItem: string | undefined) => {
        if (routeItem === '/') {
            return false;
        } else if (routeItem && route.fullPath.includes(routeItem)) {
            return true;
        }
    };

    const onClick = () => { emit('onClick') };
</script>

<style scoped lang="scss">
    .menu-link {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px 25px;
        @include font($grey-1, 20px, 23px, 400);
        cursor: pointer;
        transition: color $transition;

        &.active {
            color: $primary;
            background-color: $primary-20;
        }

        &__icon {
            display: inline-block;
            min-width: 24px;
            width: 24px;
            min-height: 24px;
            height: 24px;
        }
    }
</style>