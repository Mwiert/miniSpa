<template>
  <div class="flexi-table-pagination-c" v-if="flexi.options.pagination">
    <p class="show" v-html="paginationText"></p>
    <div class="go-to-container">
      <label for="gotoLabel" class="gotoLabel">Go to </label>
      <input
        class="flexi-table-pagination-goto"
        type="number"
        min="1"
        :max="this.flexi.options.pages.length"
        :value="flexi.options.currentPage"
        @input="handleInputChange" />
    </div>
    <div class="buttons">
      <button
        @click="setPage(flexi.options.currentPage - 1)"
        class="prev-page-btn"
        :class="{ visibility: flexi.options.currentPage == 1 }">
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
        :class="{ visibility: flexi.options.currentPage == flexi.options.pages.length }">
        <SvgIcon :name="'arrow-right'" size="s" />
      </button>
    </div>
  </div>
</template>

<script>
import flexiTableMixin from '../flexitableMixin'

export default {
  name: 'FlexiTablePagination',
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

      if (totalPages > 5) {
        if (currentPage > 4) {
          pages.push('...')
        }

        if (currentPage > 4 && currentPage < totalPages) {
          pages.push(currentPage)
        }

        if (currentPage < totalPages - 1) {
          pages.push('...')
        }

        pages.push(totalPages)
      } else if (totalPages === 5) {
        pages.push(totalPages)
      }

      return pages
    },

    paginationText() {
      const start = (this.flexi.options.currentPage - 1) * this.flexi.options.selected.id + 1
      const end = Math.min(
        this.flexi.options.currentPage * this.flexi.options.selected.id,
        this.flexi.options.totalPages
      )
      return `Showing <strong>${start}</strong> - <strong>${end}</strong> of <strong>${this.flexi.options.totalPages}</strong>`
    },

    paginationTrigger() {
      return {
        itemsPerPage: this.flexi.options.itemsPerPage,
        searchKeyWord: this.flexi.options.searchKeyWord
      }
    }
  },

  methods: {
    setPage(page) {
      if (page <= 0 || page > this.flexi.options.pages.length || page === '...') return

      this.flexi.options.currentPage = page
    },

    handleInputChange(event) {
      const value = Number(event.target.value)
      if (value < 1) {
        this.flexi.options.currentPage = 1
      } else if (value > this.flexi.options.pages.length) {
        this.flexi.options.currentPage = this.flexi.options.pages.length
      } else {
        this.flexi.options.currentPage = value
      }
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
.flexi-table-pagination-c {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  flex-wrap: wrap;

  .show {
    flex: 1;
    margin-right: 1rem;
  }

  .go-to-container {
    display: flex;
    align-items: center;
    margin-right: 1rem;

    .flexi-table-pagination-goto {
      background: #f7f8fa 0% 0% no-repeat padding-box;
      border: 1px solid #dfe0e6;
      border-radius: 8px;
      width: 48px;
      height: 32px;
      opacity: 1;
      text-align: left;
      font: normal normal normal 14px/17px Inter;
      letter-spacing: 0px;
      color: #1f2126;
      opacity: 1;
      gap: 100px;

      .gotoLabel {
        text-align: left;
        font: normal normal medium 13px/16px Inter;
        letter-spacing: 0.52px;
        color: #292d32;
        opacity: 1;
      }
    }
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: auto;

    .prev-page-btn,
    .next-page-btn {
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      border: none;
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

  @media (max-width: 768px) {
    .flexi-table-pagination-c {
      flex-direction: column;
      align-items: flex-start;
    }
    .show {
      margin-bottom: 1rem;
      text-align: left;
    }

    .go-to-container {
      margin-bottom: 1rem;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    .buttons {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;

      .prev-page-btn,
      .next-page-btn {
        margin: 5px 0;
      }

      .page-btn {
        margin: 5px 0;
      }
    }
  }
}
</style>
