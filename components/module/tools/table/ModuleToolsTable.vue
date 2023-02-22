<template>
    <ui-table
        class="tools-table"
        :headItems="headItems"
        :sortField="sortField"
        :colSizes="gridColumn"
        @on-sort-by="sortBy"
    >
        <ui-table-row
            :colSizes="gridColumn"
            v-for="(tool, index) in tools"
            :key="tool.id"    
        >
            <ui-table-column>{{ index + 1 }}</ui-table-column>
            <ui-table-column>{{ tool.name }}</ui-table-column>
            <ui-table-column>{{ tool.description || 'Без описания' }}</ui-table-column>
            <ui-table-column>
                <div
                    class="tools-table__image"
                    v-if="tool.image.small"
                >
                    <img
                        :src="tool.image.small"
                        :alt="tool.name"
                    >
                </div>

                <i
                class="tools-table__image-empty"
                    v-else>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1280 1280"
                        id="tools_empty_image"    
                    >
                        <title id="tools_empty_image">Вопрос</title>
                        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M5970 12090 c-417 -39 -761 -113 -1094 -236 -154 -56 -404 -178 -550 -267 -328 -202 -651 -502 -876 -817 -340 -475 -557 -1060 -660 -1783 -12 -81 -19 -151 -16 -156 3 -5 47 -34 96 -65 l91 -56 672 -80 c370 -44 685 -81 702 -83 l29 -2 28 150 c166 905 518 1459 1115 1759 267 133 553 196 900 196 485 0 899 -141 1253 -427 171 -139 357 -351 469 -537 238 -393 302 -907 165 -1326 -39 -120 -137 -307 -215 -410 -166 -221 -419 -479 -819 -835 -595 -531 -865 -813 -1076 -1125 -408 -602 -572 -1262 -547 -2203 l6 -247 691 2 691 3 2 105 c6 302 37 709 69 895 57 336 189 636 393 890 94 118 451 467 766 750 914 822 1312 1312 1528 1882 223 586 235 1285 32 1901 -150 453 -433 881 -816 1231 -544 498 -1190 775 -2044 876 -162 20 -828 29 -985 15z"/><path d="M5581 2590 c-20 -98 -21 -121 -21 -920 l0 -820 810 0 810 0 0 828 c-1 740 -3 836 -18 917 l-17 90 -771 3 -771 2 -22 -100z"/></g>
                    </svg>
                </i>
            </ui-table-column>
            <ui-table-column>
                <div class="tools-table__buttons">
                    <ui-button
                        theme="danger"
                        size="small"
                        title="Удалить"
                        @click="deleteToolAndLoadTools(tool.id)"
                    >
                        <template #left-icon>
                            <app-icon name="x" />
                        </template>
                    </ui-button>
    
                    <nuxt-link :to="`/tools/edit/${ tool.id }`">
                        <ui-button
                            theme="info"
                            size="small"
                            title="Изменить"
                        >
                            <template #left-icon>
                                <app-icon name="edit" />
                            </template>
                        </ui-button>
                    </nuxt-link>
                </div>
            </ui-table-column>
        </ui-table-row>
    </ui-table>
</template>

<script lang="ts">export default { name: 'ModuleToolsTable' };</script>

<script setup lang="ts">
    const { tools, isLoading, sortField, sortBy, deleteToolAndLoadTools } = useTools();

    const headItems = [
        { title: '#' },
        { title: 'Название', sortName: 'name' },
        { title: 'Описание', sortName: 'description' },
        { title: 'Фото' },
        { title: 'Действия' },
    ];

    const gridColumn = '50px minmax(200px, 1fr) minmax(300px, 2fr) 120px 150px';
</script>

<style scoped lang="scss">
    .tools-table {
        max-height: 85vh;

        &__image {
            width: 65px;
        }

        &__image-empty {
            display: inline-block;
            width: 65px;
        }

        &__buttons {
            display: flex;
            gap: 9px;
        }
    }
</style>