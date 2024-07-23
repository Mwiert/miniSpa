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
      const itemsPerPage = this.flexi.options.itemsPerPage 
      const currentPage = this.flexi.options.currentPage 
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
    GeneratePagination(itemsPerPage){
      console.log("GeneratePagination")
    //pagination
    this.flexi.options.currentPage = 1
    this.flexi.options.pages = []
    const totalPageNum = Math.ceil(this.flexi.rows.length / itemsPerPage); 
    for (let i=1; i <= totalPageNum ; i++) {
      this.flexi.options.pages.push(i)
    }
    }
  }
}
