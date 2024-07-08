<template>
    <div class="smart-table-c">
        <div class="header">
            Header
        </div>

        <SmartTableBody :tableData="dummies"/>


        <div class="footer">
            Footer
        </div>
    </div>
</template>

<script lang="ts">
import SmartTableBody from "./SmartTableBody.vue";
import dummies from './dummy.js';
export default{
    name: 'SmartTable',
    components: {
        SmartTableBody

    },
    data() {
        return {
           dummies: dummies
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
  