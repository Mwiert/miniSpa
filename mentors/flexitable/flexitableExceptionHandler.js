export default {
  methods: {
    checkProp() {
      if (Object.values(this.$attrs).length == 0) {
        return (this.flexiTableOptions.errors.message = '{empty prop and no prop name} or no prop')
      }
      if (
        Object.values(this.$attrs).length == 1 &&
        (!Object.values(this.$attrs)[0].rows ||
          !Object.values(this.$attrs)[0].columns ||
          !Object.values(this.$attrs)[0].selectedRows)
      ) {
        return (this.flexiTableOptions.errors.message =
          'empty prop: prop object must contains columns, rows and selectedRows fields')
      }
      if (!Object.values(this.$attrs)[0].columns) {
        return (this.flexiTableOptions.errors.message = 'Prop name is none')
      }
      return 'correct'
    },
    isDataCorrect() {
      if (this.checkProp() === 'correct') {
        if (this.flexiTableOptions.columns.length == 0) {
          return (this.flexiTableOptions.errors.message = 'Prop fine columns are empty')
        }
        if (this.flexiTableOptions.rows.length == 0) {
          return (this.flexiTableOptions.errors.message = 'Prop fine rows are empty')
        }
        if (
          this.flexiTableOptions.columns.length !=
          Object.values(this.flexiTableOptions.rows[0].row).length
        ) {
          return (this.flexiTableOptions.errors.message =
            'Propu fine but row and columns not match')
        }

        return 'perfect'
      }
      return this.checkProp()
    }
  }
}
