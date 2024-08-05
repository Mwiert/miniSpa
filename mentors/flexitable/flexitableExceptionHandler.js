export default {
  methods: {
    checkProp() {
      if (Object.values(this.$attrs).length == 0) {
        return (this.flexiTableOptions.errors.message = `
          No prop provided.
        `)
      }
      if (
        Object.values(this.$attrs).length == 1 &&
        (!Object.values(this.$attrs)[0].rows ||
          !Object.values(this.$attrs)[0].columns ||
          !Object.values(this.$attrs)[0].selectedRows)
      ) {
        return (this.flexiTableOptions.errors.message = `
          The provided prop object must contain the fields: columns, rows, and selectedRows.
        `)
      }
      if (!Object.values(this.$attrs)[0].columns) {
        return (this.flexiTableOptions.errors.message = `
          <span class="bolded" style="font-weight: bold;">Prop name</span> is missing or undefined.
        `)
      }
      return 'correct'
    },
    isDataCorrect() {
      if (this.checkProp() === 'correct') {
        if (this.flexiTableOptions.columns.length == 0) {
          return (this.flexiTableOptions.errors.message = `
            Columns are empty.
            Ensure the columns field contains the expected data.
          `)
        }
        if (this.flexiTableOptions.rows.length == 0) {
          return (this.flexiTableOptions.errors.message = `
            Rows are empty.
            <p>Ensure the rows field contains the expected data.</p>
          `)
        }
        if (
          this.flexiTableOptions.columns.length !=
          Object.values(this.flexiTableOptions.rows[0].row).length
        ) {
          return (this.flexiTableOptions.errors.message = `
            The number of columns does not match the number of features of the elements in each row. <br/>
            Ensure that each column corresponds to a feature of an element in a row.
          `)
        }

        return 'perfect'
      }
      return this.checkProp()
    }
  }
}
