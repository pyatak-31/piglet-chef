<template>
    <nav class="main-nav">
        <ul class="main-nav__list">
            <li
                class="main-nav__item"
                v-for="link in links"
                :key="link.to"    
            >
                <ui-link-menu
                    class="main-nav__link"
                    :to="link.to"
                    :name="link.name"
                    :icon-name="link.iconName"
                />
            </li>


            <li class="main-nav__item">
                <ui-link-menu
                    class="main-nav__link"
                    name="Выйти"
                    icon-name="signOut"
                    @on-click="logout"
                />
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">export default { name: 'LayoutNavigation' }</script>

<script setup lang="ts">
    import {} from '#app';
    
    const emit = defineEmits(['logout']);

    const links = [
        {
            name: 'Главная',
            to: '/',
            iconName: 'forkKnife'
        },
        {
            name: 'Инструменты',
            to: '/tools',
            iconName: 'cookingPot'
        },
    ];

    const logout = () => { emit('logout') };
</script>

<style lang="scss">
    .main-nav {
        position: sticky;
        top: 0;
        // background-color: rgb(227, 238, 233);
        overflow: hidden;

        &__list {
            display: flex;
            flex-direction: column;
        }

        &__link {
            

           
        }
    }
</style>