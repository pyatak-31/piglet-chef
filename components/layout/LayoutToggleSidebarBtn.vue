<template>
    <button
        class="toggle-menu-btn"
        :title="isOpenSidebar ? 'Закрыть' : 'Открыть'"
        :aria-label="isOpenSidebar ? 'Закрыть боковую панель' : 'Открыть боковую панель'"
        @click="onToggle"
    >
        <app-icon
            class="toggle-menu-btn__icon"
            :class="{ 'toggle-menu-btn__icon--close': !isOpenSidebar }"
            name="carretLeft"
        />
    </button>
</template>

<script lang="ts">export default { name: 'LayoutToggleSidebarBtn' }</script>

<script setup lang="ts">
    import {} from '#app';

    interface SidebarProps {
        isOpenSidebar: boolean;
    }

    const props = defineProps<SidebarProps>();
    
    const emit = defineEmits(['onToggle']);

    const onToggle = () => { emit('onToggle') };
</script>

<style scoped lang="scss">
    .toggle-menu-btn {
        width: 30px;
        background-color: $primary;
        color: $white;
        transition: box-shadow .3s, background-color .3s;

        &:hover,
        &:focus {
            background-color: $primary-hover;
            box-shadow: $shadow-primary;
        }

        &__icon {
            transition: transform .5s;

            &--close {
                transform: rotateY(180deg);
            }
        }
    }   
</style>