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

  if (totalPages === 1) {
    pages.push(1);
    return pages;
  }

  // Always show the first page
  pages.push(1);

  // Show the second page if there are at least two pages
  if (totalPages >= 2) {
    pages.push(2);
  }

  // Show ellipsis and middle pages if necessary
  if (totalPages > 2) {
    if (currentPage > 3) {
      pages.push('...');
    }

    // Show current page in the middle if it's not one of the first two or last two pages
    if (currentPage > 2 && currentPage < totalPages - 1) {
      pages.push(currentPage);
    }

    // Show ellipsis if necessary before the last two pages
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show the last two pages
    if (totalPages - 1 > 2) {
      pages.push(totalPages - 1);
    }
    pages.push(totalPages);
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
