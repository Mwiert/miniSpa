export default {
  methods: {
    checkProp() {
      if (Object.values(this.$attrs).length == 0) {
        return (this.flexiTableOptions.errors.message = `
          <p>No prop provided or an empty prop with no name.</p>
          <p>The expected prop structure is <code>:propName (any valid name) = "an object"</code>.</p>
          <p>The object should include the following fields:</p>
          <ul>
            <li>options (optional): {}</li>
            <li>rows (required): []</li>
            <li>columns (required): []</li>
            <li>selectedRows (required): []</li>
          </ul>
          <p>Both rows and columns must be filled.</p>
          <p>Additionally, you can provide custom configurations inside the 'options' object based on values defined in "flexi.config.json".</p>
        `)
      }
      if (
        Object.values(this.$attrs).length == 1 &&
        (!Object.values(this.$attrs)[0].rows ||
          !Object.values(this.$attrs)[0].columns ||
          !Object.values(this.$attrs)[0].selectedRows)
      ) {
        return (this.flexiTableOptions.errors.message = `
          <p>The provided prop object must contain the fields: columns, rows, and selectedRows.</p>
          <p>Ensure all these fields are present and filled.</p>
          <p>The structure of the prop object should be: <code>propName (any valid name) = "an object"</code>.</p>
          <p>The object should include:</p>
          <ul>
            <li>options (optional): {}</li>
            <li>rows (required): []</li>
            <li>columns (required): []</li>
            <li>selectedRows (required): []</li>
          </ul>
          <p>Both rows and columns must be filled, and their lengths should match (i.e., each column corresponds to a feature of an item in a row).</p>
          <p>Customizations can be provided in the options object based on values defined in "flexi.config.json".</p>
        `)
      }
      if (!Object.values(this.$attrs)[0].columns) {
        return (this.flexiTableOptions.errors.message = `
          <p>Prop name is missing or undefined.</p>
        `)
      }
      return 'correct'
    },
    isDataCorrect() {
      if (this.checkProp() === 'correct') {
        if (this.flexiTableOptions.columns.length == 0) {
          return (this.flexiTableOptions.errors.message = `
            <p>Columns are empty.</p>
            <p>Ensure the columns field contains the expected data.</p>
          `)
        }
        if (this.flexiTableOptions.rows.length == 0) {
          return (this.flexiTableOptions.errors.message = `
            <p>Rows are empty.</p>
            <p>Ensure the rows field contains the expected data.</p>
          `)
        }
        if (
          this.flexiTableOptions.columns.length !=
          Object.values(this.flexiTableOptions.rows[0].row).length
        ) {
          return (this.flexiTableOptions.errors.message = `
            <p>The number of columns does not match the number of features of the elements in each row.</p>
            <p>Ensure that each column corresponds to a feature of an element in a row.</p>
          `)
        }

        return 'perfect'
      }
      return this.checkProp()
    }
  }
}
