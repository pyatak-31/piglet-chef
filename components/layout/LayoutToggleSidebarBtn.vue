<template>
    <ui-button
        class="toggle-menu-btn"
        :title="isOpenSidebar ? 'Закрыть' : 'Открыть'"
        :aria-label="isOpenSidebar ? 'Закрыть боковую панель' : 'Открыть боковую панель'"
        @on-click="onToggle"
    >
        <template #left-icon>
            <app-icon
                class="toggle-menu-btn__icon"
                :class="{ 'toggle-menu-btn__icon--close': !isOpenSidebar }"
                name="carretLeft"
            />
        </template>
    </ui-button>
</template>

<script lang="ts">export default { name: 'LayoutToggleSidebarBtn' }</script>

<script setup lang="ts">
    import {} from '#app';

    interface SidebarProps {
        isOpenSidebar: boolean;
    }

    const props = defineProps<SidebarProps>();
    
    const emits = defineEmits<{
        (e: 'onToggle'): void
    }>();

    const onToggle = () => {
        emits('onToggle');
    }
</script>

<style scoped lang="scss">
    .toggle-menu-btn {
        width: 30px;
        padding: 0;
        border-radius: 0;

        &__icon {
            transition: transform .3s;

            &--close {
                transform: rotateY(180deg);
            }
        }
    }   
</style>