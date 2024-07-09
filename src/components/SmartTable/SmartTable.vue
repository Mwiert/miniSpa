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

.header, .footer {
    background-color: lightblue;
    text-align: center;
    font-size: 50px;
    padding: 10px;
    border-radius: 10px;
}
</style>
  