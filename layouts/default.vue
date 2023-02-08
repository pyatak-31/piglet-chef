<template>
    <div
        class="main-layout"
        :key="$route.fullPath"
    >
        <NuxtLoadingIndicator color="red" />
        
        <layout-toggle-sidebar-btn
            class="main-layout__toggle-menu-btn"
            :is-open-sidebar="isOpenSidebar" 
            @on-toggle="toggleMenu"
        />
        
        <layout-sidebar
            class="main-layout__sidebar"
            :is-open-sidebar="isOpenSidebar"
            @logout="logout"
        />
       
        <main class="main-layout__content">
            <!-- <slot /> -->
            <NuxtPage />
        </main>
    </div>
</template>

<script lang="ts">export default { name: 'MainLayout' }</script>

<script setup lang="ts">
    const { logout } = useAuth();
    
    const isOpenSidebar = ref(true);
    const toggleMenu = () => {
        isOpenSidebar.value = !isOpenSidebar.value;
    };
</script>

<style lang="scss">
    .main-layout {
        position: relative;
        display: flex;
        min-height: 100vh;
        padding-left: 30px;
        
        &__sidebar {
            position: relative;
        }
        
        &__content {
            flex: 1;
            padding: 30px;
            background-color: $main-bg;
            overflow-x: auto;
        }

        &__toggle-menu-btn {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
        }
    }
</style>