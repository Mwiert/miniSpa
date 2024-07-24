export default {
  computed: {
    SearchKey() {
      if (this.flexi.options.hideSearch) {
        return this.flexi.rows
      }
      return this.flexi.rows.filter((item) =>
        JSON.stringify(item.row).toLowerCase().includes(this.flexi.options.searchKeyWord)
      )
    },
    FlexiBodyItemsPerPage() {
      const itemsPerPage = this.flexi.options.itemsPerPage || 10
      const currentPage = this.flexi.options.pagination?.currentPage || 1
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
    toggleSelectAll() {
      this.flexi.selectAll = !this.flexi.selectAll
      this.flexi.rows.forEach((row) => {
        row.row.forEach((col) => {
          if (col.checkbox) {
            col.value = this.flexi.selectAll
          }
        })
      })
    }
  }
}
