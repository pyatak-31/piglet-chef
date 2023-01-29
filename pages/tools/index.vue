<template>
    <div>
        <ui-title rank="1">
            Инструменты
        </ui-title>

        <nuxt-link to="/tools/create">Create</nuxt-link>

        <span v-if="isLoading">Load/.....</span>
        <!-- <ul v-else>
            <li v-for="tool in tools" :key="tool.name">
                {{ tool.name }}
            </li>
        </ul> -->

        <!-- <ui-table
            :head="tableHeads"
            :columns-templates="tableSizeColumns"
        >
            <ui-table-row
                v-for="(tool, index) in tools"
                :key="tool.name"
                :columns-templates="tableSizeColumns"
            >
                <ui-table-column>
                    {{ index + 1 }}
                </ui-table-column>

                <ui-table-column>
                    {{ tool.name }}
                </ui-table-column>

                <ui-table-column>
                    {{ tool.description }}
                </ui-table-column>

                <ui-table-column>
                    <img :src="tool.images.small" alt="">
                </ui-table-column>

                <ui-table-column>
                    action
                </ui-table-column>
            </ui-table-row>
        </ui-table> -->
        <module-tools-table></module-tools-table>
    </div>
</template>

<script lang="ts">export default { name: 'ToolsPage' }</script>

<script setup lang="ts">
    definePageMeta({ middleware: ["auth"], pageTransition: { name: 'page' }});
    const { tools, isLoading, loadTools } = useTools();

    const tableHeads = ['#', 'Название', 'Описание', 'Фото', 'Действия'];
    const tableSizeColumns = '50px 1fr 2fr 150px 140px';

    await loadTools();
</script>

<style >

</style>