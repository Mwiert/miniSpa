<template>
  <div class="smart-table-pagination-c" v-if="flexi.options.pagination">
    <div>
      <label for="gotoLabel" class="gotoLabel" >Go to </label>
        <input class="smart-table-pagination-goto"
          type="number"
          min="1"
          :max="this.flexi.options.pages.length"
          v-model="flexi.options.currentPage" />
      </div>
    <div class="search-page" v-if="this.flexi.options.showPage">
      <input type="text" v-model="flexi.options.newPage" />
      <button
        type="button"
        @click="goPage()"
        v-if="isValidPage(flexi.options.newPage)">
        Go
      </button>
    </div>
    <div class="buttons">
      <button
        @click="setPage(flexi.options.currentPage - 1)"
        class="prev-page-btn"
        :class="{'visibility': flexi.options.currentPage == 1}">
        <SvgIcon :name="'arrow-left'" size="s" />
      </button>

      <button
        v-for="page in pagesToShow"
        :key="page"
        @click="setPage(page)"
        :class="['page-btn', { active: page == flexi.options.currentPage }]">
        {{ page }}
      </button>

      <button
        @click="setPage(flexi.options.currentPage + 1)"
        class="next-page-btn"
        :class="{'visibility': flexi.options.currentPage == flexi.options.pages.length}">
        <SvgIcon :name="'arrow-right'" size="s" />
      </button>
     
    </div>
  </div>
</template>

<script>
import flexiTableMixin from '../../../mentors/flexitable/flexitableMixin'

export default {
  name: 'SmartTablePagination',
  inject: ['flexi'],
  mixins: [flexiTableMixin],

  computed: {
    pagesToShow() {
  const currentPage = this.flexi.options.currentPage
  const totalPages = this.flexi.options.pages.length
  const pages = []

  if (totalPages === 1) {
    pages.push(1)
    return pages
  }
  pages.push(1)
  for (let index = 2; index <= Math.min(4, totalPages); index++) {
    pages.push(index)
  }

  // Show ellipsis and middle pages if necessary
  if (totalPages > 5) {
    if (currentPage > 4) {
      pages.push('...')
    }

    // Show current page in the middle if it's not one of the first two or last two pages
    if (currentPage > 4 && currentPage < totalPages) {
      pages.push(currentPage)
    }

    // Show ellipsis if necessary before the last two pages
    if (currentPage < totalPages - 1) {
      pages.push('...')
    }

    // Always show the last two pages
    pages.push(totalPages)
  } else if (totalPages === 5) {
    pages.push(totalPages)
  }

  return pages
  },
  paginationTrigger() {
    return {
      itemsPerPage: this.flexi.options.itemsPerPage,
      searchKeyWord: this.flexi.options.searchKeyWord
    };
  }
  },

  methods: {
    setPage(page) {
      if (page <= 0 || page > this.flexi.options.pages.length) return
      if (page === '...') {
        this.flexi.options.showPage = true
        return
      }
      this.flexi.options.currentPage = page
    },
    goPage() {
      this.flexi.options.currentPage = this.flexi.options.newPage
      this.flexi.options.showPage = false
      this.flexi.options.newPage = null
    },
    isValidPage(page) {
      return page > 0 && page <= this.flexi.options.pages.length;
    }
  },

  watch: {
    paginationTrigger: {
    handler() {
      this.GeneratePagination(this.flexi.options.itemsPerPage)
    },
    immediate: true
  }
  }
}
</script>

<style lang="scss">
.smart-table-pagination-c {
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 1rem;
  display: flex;
  flex-direction: row;

  .search-page {
    
  }
  .smart-table-pagination-goto{
    background-color:#F7F8FA;
    border: 1px solid #DFE0E6;
    border-radius: 8px;
    
    
    width: 48px;
    height: 32px;
    opacity: 1;
    text-align: left;
    font: normal normal normal 14px/17px Inter;
    letter-spacing: 0px;
    color: #1F2126;
    opacity: 1;
    gap: 100px;
    .gotoLabel{
      text-align: left;
      font: normal normal medium 13px/16px Inter;
      letter-spacing: 0.52px;
      color: #292D32;
      opacity: 1;
    }
    
  }
  .buttons {
    display: flex;
    flex-direction: row;

    .prev-page-btn,
    .next-page-btn {
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      border:none;
      margin: 0 5px;
      cursor: pointer;

      &.visibility {
        visibility: hidden;
      }
    }

    .page-btn {
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      border: 1px solid #dcdcdc;
      border-radius: 8px;
      margin: 0 5px;
      cursor: pointer;

      &.active {
        background: #243759 0% 0% no-repeat padding-box;
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
}
</style>
