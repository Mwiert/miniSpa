<template>
    <div>
        <SmartTable :options="tableOptions" @cell-click="handleCellClick" />
    </div>
</template>

<script lang="ts">
import SmartTable from '../components/SmartTable/SmartTable.vue'
export default {
    name: 'PinkPanthers',
    components: {
        SmartTable,
    },
    data() {
        return {
            tableOptions: {
                header: {},
                body: {
                    clickable: true,
                    clickableColumns: ['orderId']
                },
                footer: {}
            }
        }
    },
    methods: {
        handleCellClick({cell, rowIndex, cellIndex}) {
            console.log('Cell clicked:', cell, 'row:', rowIndex, 'cell:', cellIndex)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>