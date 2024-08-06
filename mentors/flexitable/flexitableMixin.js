export default {
  computed: {
    SearchKey() {
      if (this.flexi.options.hideSearch) {
        return this.flexi.rows
      }
      const searchResults = this.flexi.rows.filter((item) => {
        const rowValues = Object.values(item.row)
        return rowValues.some((val) => {
          return (
            (typeof val.value === 'string' || typeof val.value === 'number') &&
            JSON.stringify(val.value)
              .toLowerCase()
              .includes(this.flexi.options.searchKeyWord.toLowerCase())
          )
        })
      })
      this.flexi.options.totalPages = searchResults.length
      return searchResults
    },
    FlexiBodyItemsPerPage() {
      let itemsPerPage = parseInt(this.flexi.options.itemsPerPage)
      if (itemsPerPage == -1) {
        itemsPerPage = this.flexi.rows.length
      }
      const currentPage = parseInt(this.flexi.options.currentPage)
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return this.SearchKey.slice(startIndex, endIndex)
    },

    gridTemplateColumns() {
      if (this.flexi.options.columnSizes) {
        const templateColumns = this.flexi.options.columnSizes.map((size) => `${size}fr`).join(' ')
        return `grid-template-columns:${templateColumns}`
      } else {
        const hiddenColumns = this.flexi.options.hiddenColumns?.length || 0
        return `grid-template-columns:repeat(${this.flexi.columns.length - hiddenColumns}, 1fr)`
      }
    },
    ColumnGap() {
      return `column-gap:${this.flexi.options.columnGap}`
    }
  },
  methods: {
    HideColumn(key) {
      return !this.flexi.options.hiddenColumns?.includes(key)
    },
    GeneratePagination(itemsPerPage) {
      this.flexi.options.pages = []
      //pagination
      if (itemsPerPage == -1) {
        this.flexi.options.currentPage = 1
        itemsPerPage = this.flexi.rows.length
        this.flexi.options.pagination = false
      } else {
        this.flexi.options.pagination = true
        this.flexi.options.currentPage = 1
        const totalPageNum = Math.ceil(this.flexi.options.totalPages / parseInt(itemsPerPage))
        for (let i = 1; i <= totalPageNum; i++) {
          this.flexi.options.pages.push(i)
        }
      }
    }
  }
}
