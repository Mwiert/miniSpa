<template>
    <div class="smart-table-c">
        <div class="header">
            Header
        </div>

        <div class="grid-container">
            <div v-for="(header, index) in headers" :key="index" class="grid-header">
                {{ header.text }}
            </div>

            <template v-for="(row, rowIndex) in rows" :key="rowIndex">
                <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="grid-item">
                    {{ cell.text }}
                </div>
            </template>
        </div>

        <div class="footer">
            Footer
        </div>
    </div>
</template>

<script lang="ts">
export default{
    name: 'SmartTable',
    data() {
        return {
            headers: [
                { text: 'orderId' },
                { text: 'orderUuid' },
                { text: 'providerName' },
                { text: 'agencyName' },
                { text: 'rnr' },
                { text: 'rnrStatus' }
            ],
            rows: [
                [
                    { text: '21480' },
                    { text: 'b5b7b0b9-d416-4e17-b121-64290d32451c' },
                    { text: 'PANDORA LIVE' },
                    { text: 'GTS Acentesi-1' },
                    { text: '7WPCFYZQXV' },
                    { text: '3' }
                ],
                [
                    { text: '21478' },
                    { text: '2721407d-9fdb-401b-90a3-7029dd8ade82' },
                    { text: 'PANDORA LIVE' },
                    { text: 'GTS Acentesi-1' },
                    { text: 'X9UPDJVNUJ' },
                    { text: '3' }
                ],
                [
                    { text: '21463' },
                    { text: '39767cc6-9fa9-4fc2-b1fb-5fff5dea71bd' },
                    { text: 'PANDORA LIVE' },
                    { text: 'GTS Acentesi-1' },
                    { text: 'CFPCBJ9SJU' },
                    { text: '3' }
                ],
                [
                    { text: '21462' },
                    { text: '9e1809f6-a70d-42f0-9faa-58a4cb7c040f' },
                    { text: 'PANDORA LIVE' },
                    { text: 'GTS Acentesi-1' },
                    { text: 'NBCUMSSCJC' },
                    { text: '3' }
                ]
            ]
        };
    }
};
</script>
  
<style lang="scss" scoped>
.smart-table-c {
    margin: 10px;
}

.grid-container {
    display: grid;
    margin-top: 10px;
    margin-bottom: 10px;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
}

.grid-header, .grid-item {
    background-color: yellow;
    padding: 20px;
    border: 1px solid b;
    text-align: center;
}

.grid-header {
    font-weight: bold;
    background-color: orange;
}

.header {
    background-color: lightblue;
    text-align: center;
    font-size: 30px;
}

.footer {
    background-color: lightgreen;
    text-align: center;
    font-size: 30px;
}
</style>
  