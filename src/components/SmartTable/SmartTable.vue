<template>
    <div class="smart-table-c">
         <SmartTableHeader /> <!-- Header kısmı filters ve searchbar'ı içerir -->

        <SmartTableBody :tableData="dummies"/>

        <SmartTableFooter /> <!-- Footer kısmı pagination içerir -->
    </div>
</template>

<script lang="ts">
import SmartTableHeader from './SmartTableHeader.vue'
import SmartTableBody from "./SmartTableBody.vue";
import SmartTableFooter from './SmartTableFooter.vue'
import dummies from './dummy.js';
export default{
    name: 'SmartTable',
    components: {
        SmartTableHeader,
        SmartTableBody,
        SmartTableFooter

    },
    data() {
        return {
           dummies: dummies
        };
    }
};
</script>
  
<style lang="scss" scoped>

</style>
  