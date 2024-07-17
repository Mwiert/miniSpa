<template>
    <div class="smart-table-pagination-c">
        <button @click="prevPage" class="prev-page-btn"><SvgIcon class="" :name="'arrow-left'" size="s" @click="s" /></button>
        <!-- <span>{{ localCurrentPage }} from {{ totalPages }}</span>        -->
        <button @click="nextPage" class="next-page-btn">1</button>
        <button @click="nextPage" class="next-page-btn">2</button>
        <button @click="nextPage" class="next-page-btn">3</button>
        <button @click="nextPage" class="prev-page-btn"><SvgIcon class="" :name="'arrow-right'" size="s" @click="s" /></button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'SmartTablePagination',
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            localCurrentPage: this.currentPage

        }
    },
    methods: {
        nextPage(){
            if (this.localCurrentPage < this.totalPages) {
                this.localCurrentPage + 1;
                this.$emit('update:localCurrentPage', this.localCurrentPage)
            }
        },
        prevPage() {
            if(this.localCurrentPage > 1) {
                this.localCurrentPage -= 1;
                this.$emit('update:localCurrentPage', this.localCurrentPage)
            }
        }
    },
    watch: {
        
    },
    computed:{

    }
}
</script>

<style lang="scss">
.smart-table-pagination-c {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    .prev-page-btn {
        height: 40px;
        width: 40px;
        position: relative;
        display: flex;
        align-items: center;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        justify-content: center;
        border: aliceblue;
    } 
    .next-page-btn {
        height: 40px;
        width: 40px;
        position: relative;
        display: flex;
        align-items: center;
        background-color: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        justify-content: center;
        border-radius: 1rem;
        border-color: grey;
    } 
}
</style>