<template>
  <div class="smart-table-pagination-c">
    <button
      v-if="localCurrentPage != 1"
      @click="setPage(localCurrentPage - 1)"
      class="prev-page-btn">
      <SvgIcon :name="'arrow-left'" size="s" />
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="setPage(page)"
      :class="['page-btn', { active: page === localCurrentPage }]">
      {{ page }}
    </button>
    <button
      v-if="localCurrentPage != totalPages.length"
      @click="setPage(localCurrentPage + 1)"
      class="next-page-btn">
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
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localCurrentPage: this.currentPage
    }
  },
  methods: {
    setPage(page) {
      console.log(this.totalPages.length, page)
      if (page != 0 && page <= this.totalPages.length) {
        this.localCurrentPage = page
        this.$emit('update:currentPage', this.localCurrentPage)
        console.log(this.localCurrentPage)
      }
    }
  },
  computed: {},
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

    &:hover {
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
      background-color: #04070a;
      color: #ffffff;
    }

    &:hover {
      background-color: #04070a;
      color: #ffffff;
    }
  }
}
</style>
