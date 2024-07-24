<template>
  <div class="smart-table-pagination-c" v-if="flexi.options.pagination">
    <button 
      @click="setPage(flexi.options.currentPage - 1)"
      class="prev-page-btn"
      :class=" flexi.options.currentPage === 1 ? 'visibility' : '' "
    >
      <SvgIcon :name="'arrow-left'" size="s" />
    </button>

    <button
      v-for="page in pagesToShow"
      :key="page"
      @click="setPage(page)"
      :class="['page-btn', { active: page === flexi.options.currentPage }]"
    >
      {{ page }}
    </button>

    <button 
      @click="setPage(flexi.options.currentPage + 1)"
      class="next-page-btn"
      :class=" flexi.options.currentPage === totalPages ? 'visibility' : '' "
    >
      <SvgIcon :name="'arrow-right'" size="s" />
    </button>
  </div>
</template>


<script>
import flexiTableMixin from '../../../mentors/flexitable/flexitableMixin';

export default {
  name: 'SmartTablePagination',
  inject: ['flexi'],
  mixins: [flexiTableMixin],

  computed: {
    totalPages() {
      return this.flexi.options.pages.length;
    },
    pagesToShow() {
  const currentPage = this.flexi.options.currentPage;
  const totalPages = this.totalPages;
  const pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, 2, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, 2, '...', currentPage, '...', totalPages - 1, totalPages);
    }
  }

  return pages;
}
  },

  methods: {
    setPage(page) {
      if (page === '...' || page <= 0 || page > this.totalPages) return;
      this.flexi.options.currentPage = page;
    }
  },

  watch: {
    "flexi.options.itemsPerPage": {
      handler: function(val) {
        console.log("itemsperpage", val);
        this.GeneratePagination(val);
      },
      immediate: true
    },
  },
};
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

    &.visibility { 
      visibility: hidden;
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

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>
