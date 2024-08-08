export default {
  computed: {
    SearchKey() {
      if (this.flexi.options.hideSearch || this.flexi.options.searchKeyWord.length < 3) {
        this.flexi.options.totalPages = this.flexi.rows.length
        return this.flexi.rows
      }
      const startTime = performance.now()
      const searchResults = this.flexi.rows.filter((item) => {
        const rowValuesString = Object.entries(item.row)
          .filter(([key]) => !this.flexi.options.hiddenColumns.includes(key))
          .map(([, val]) => JSON.stringify(val.value))
          .join(', ')
          .toLowerCase()
        const searchKeyword = this.flexi.options.searchKeyWord.toLowerCase()
        if (rowValuesString.includes(searchKeyword)) {
          item.highlighted = {}
          Object.entries(item.row).forEach(([key, val]) => {
            const valueString = val.value.toString()
            const regex = new RegExp(searchKeyword, 'gi')
            const match = valueString.match(regex)
            if (match) {
              const highlightedText = match[0]
              const originalText = val.value
              const highlightedValue = originalText.replace(
                regex,
                `<span class="highlight">${highlightedText}</span>`
              )
              item.highlighted[key] = highlightedValue
            } else {
              item.highlighted[key] = val.value
            }
          })
        }
        return rowValuesString.includes(searchKeyword)
      })
      const endTime = performance.now()
      console.log(`${(endTime - startTime).toFixed(2)} ms`)
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
