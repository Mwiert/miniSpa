<template>
  <div class="smart-table-pagination-c">
    <button @click="prevPage" class="prev-page-btn" :disabled="localCurrentPage === 1">
      <SvgIcon :name="'arrow-left'" size="s" />
    </button>
    <button
      v-for="page in totalPagesArray"
      :key="page"
      @click="setPage(page)"
      :class="['page-btn', { active: page === localCurrentPage }]"
    >
      {{ page }}
    </button>
    <button @click="nextPage" class="next-page-btn" :disabled="localCurrentPage === totalPages">
      <SvgIcon :name="'arrow-right'" size="s" />
    </button>
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
  computed: {
    totalPagesArray() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1)
    }
  },
  methods: {
    nextPage() {
      if (this.localCurrentPage < this.totalPages) {
        this.localCurrentPage += 1
        this.$emit('update:currentPage', this.localCurrentPage)
      }
    },
    prevPage() {
      if (this.localCurrentPage > 1) {
        this.localCurrentPage -= 1
        this.$emit('update:currentPage', this.localCurrentPage)
      }
    },
    setPage(page) {
      this.localCurrentPage = page
      this.$emit('update:currentPage', this.localCurrentPage)
    }
  },
  watch: {
    currentPage(newVal) {
      this.localCurrentPage = newVal
    }
  }
}
</script>

<style lang="scss">
.smart-table-pagination-c {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  .prev-page-btn,
  .next-page-btn {
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #dcdcdc;
    margin: 0 5px;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:hover:not(:disabled) {
      background-color: #f0f0f0;
    }
  }

  .page-btn {
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    margin: 0 5px;
    cursor: pointer;

    &.active {
      background-color: #007bff;
      color: #ffffff;
    }

    &:hover:not(.active) {
      background-color: #f0f0f0;
    }
  }
}
</style>
