<template>
    <div class="smart-table-pagination-c">
        <button @click="prevPage" class="prev-page-btn">Prev</button>
        <span>{{ localCurrentPage }} from {{ totalPages }}</span>
        <button @click="nextPage" class="next-page-btn">Next</button>

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
        
    }
}
</script>