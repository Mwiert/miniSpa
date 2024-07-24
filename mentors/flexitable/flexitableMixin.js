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
      const itemsPerPage = parseInt(this.flexi.options.itemsPerPage)
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
      //pagination
      if (itemsPerPage === 'All') {
        itemsPerPage = this.flexi.rows.length // itemsPerPage = 46 but items are not loading to the body of the page
        console.log(itemsPerPage)
      } else {
        this.flexi.options.currentPage = 1
        this.flexi.options.pages = []
        const totalPageNum = Math.ceil(this.flexi.rows.length / parseInt(itemsPerPage))
        for (let i = 1; i <= totalPageNum; i++) {
          this.flexi.options.pages.push(i)
        }
      }
    }
  }
}
