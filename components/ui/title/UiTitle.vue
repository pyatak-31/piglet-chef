<template>
    <renderTitle />
</template>

<script lang="ts">export default { name: 'UiTitle' }</script>

<script setup lang="ts">
    import {} from "#app";
    type Rank = '1' | '2' | '3' | '4' | '5' | '6';
    interface TitleProps {
        rank?: Rank;
        hidden?: boolean;
    }

    const props = withDefaults(defineProps<TitleProps>(), {
        rank: '2'
    });

    const tag = `h${props.rank}`;
    const classList = () => {
        let result = `title title--${ props.rank }`
        if (props.hidden) {
            result += ' title--hidden';
        }
       
        return result
    };
    const slot = useSlots();
    const titleContent = slot.default ? slot.default() : 'Заголовок';

    const renderTitle = () => {
        return h(
            tag,
            {
                class: classList(),
            },
            titleContent
        );
    };
</script>

<style lang="scss">
    $text-color: $dark;

    .title {
        @include font($text-color, '', '', 700);

        &--1 {
            @include font('', 40px, 48px, '');
        }

        &--2 {
            @include font('', 33px, 40px, '');
        }

        &--3 {
            @include font('', 28px, 34px, '');
        }

        &--4 {
            @include font('', 23px, 28px, '');
        }

        &--5 {
            @include font('', 19px, 23px, '');
        }

        &--6 {
            @include font('', 16px, 19px, '');
            text-transform: uppercase;
        }

        &--hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            border: 0;
            clip: rect(0 0 0 0);
        }
    }
</style>