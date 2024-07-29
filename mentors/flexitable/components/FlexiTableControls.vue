<template>
  <div class="flexi-table-controls-c">
    <!-- Items Per Page -->

    <div class="ftc-select-wrapper">
      <UIEnumDropdown
        v-model="flexi.options.selected"
        :enumObj="flexi.options.EInternSingleComponentType"
        :label="flexi.options.UIDropdownOrderProp.label"
        :dataSize="flexi.options.UIDropdownOrderProp.dataSize"
        :fontSize="flexi.options.UIDropdownOrderProp.fontSize"
        :showAll="flexi.options.UIDropdownOrderProp.showAll" />
      <!--Custom Dropdown-->
      <div class="dropdown">
        <div class="dropdown-icon" @click="Toggle">
          <SvgIcon name="eye" size="xs" />
        </div>
        <div class="multi" v-if="flexi.options.show">
          <div
            class="option"
            :class="col.status === false ? 'notselected' : 'selected'"
            v-for="(col, index) in flexi.columns"
            :key="index"
            @click="selectHidden(index)">
            {{ col.name }}
          </div>
          <button class="clear-button" @click="selectClear">Clear/Select All</button>
        </div>
      </div>
      <div class="export-buttons">
        <button class="pdf-button" @click="triggerExportPrint()">Print</button>
      </div>
    </div>

    <!-- <button @click="toggleSelectAll">All</button> -->

    <!-- Search Table -->
    <div class="ftc-search-wrapper" v-if="!flexi.options.hideSearch">
      <SvgIcon :name="'search'" size="s" class="search" />
      <input type="text" v-model="flexi.options.searchKeyWord" />
      <button
        type="button"
        class="clear-button"
        @click="clearSearch"
        v-if="flexi.options.searchKeyWord">
        <SvgIcon :name="'x'" size="s" class="clear" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import flexiTableMixin from '../flexitableMixin'
import UIEnumDropdown from '../../../src/components/Dropdown/UIEnumDropdown.vue'
export default {
  name: 'FlexiTableControls',
  inject: ['flexi'],
  mixins: [flexiTableMixin],
  components: {
    UIEnumDropdown
  },
  methods: {
    // print method style not working
    triggerExportPrint() {
      const divToPrint = this.$parent.$refs.flexibody.$refs.tableContainer
      const divToPrint2 = this.$parent.$refs.flexiheader.$refs.print2
      const newPrintWindow = window.open('', 'Print')
      newPrintWindow.document.write(
        `<html>
          <head>
            <style >
            .flexi-table-header-c {
  &.sticky-header {
    background-color: #fff;
    position: sticky;
    top: 0;
  }
}
.flexi-table-header-col-wrapper {
  // width: fit-content;
  cursor: pointer;
  font-weight: 500;

  // border: 1px solid #eee;

  &:hover {
    background-color: #f4f4f4;
    border-radius: 1rem;
  }

  .flexi-table-header-col {
    display: flex;
    align-items: center;
  }
}
.txt-right {
  justify-content: flex-end;
}
              .flexi-table-body-c {
  .flexi-table-body-row-wrapper {
    border: 1.5px solid #e0e0e0;
    margin: 0.45rem 0rem;
    border-radius: 24rem;
    // transition: border-radius 0.25s ease-in-out;
    &.remove-radius {
      border-radius: 1rem;
      // background-color: azure !important;
    }

    &:hover {
      // border-left: 1.5px solid #66fff7;
      // transform: scale(1.01);
      // background-color: #eee !important;
      // background-color: #f6fefe !important;
      background-color: #f0f2f4 !important;
      // border-color: #fff !important;
      // outline: 3px solid #a5ddfd;
      // box-shadow: 0 0 4px #33ddff;
    }

    &:nth-child(even) {
      background: #f5f7fa;
    }
    &:nth-child(odd) {
      background: #ffff;
    }

    .flexi-table-body-detail-wrapper {
      // background: red;
      // height: 100px;
    }
    .flexi-table-body-row {
      .flexi-table-body-col {
        display: flex;
        align-items: center;
        // justify-content: center;
        img {
          width: 42px;
          flex-shrink: 0;
        }
      }
    }
  }
  .pointer {
    cursor: pointer;
  }
}

[class*='item-'] {
  display: inline-block;
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  border: 1px solid #fff;
  box-sizing: border-box;
  text-align: center;
  min-width: 90px;
  font-weight: 500;
  height: fit-content;
}
.item- {
  &active {
    $bg-color: #ccffdd;
    background: $bg-color;
    outline: 3px solid rgba($bg-color, 0.5);
    color: darken($bg-color, 60%);
  }
  &pending {
    $bg-color: #ffebcc;
    background: $bg-color;
    outline: 3px solid rgba($bg-color, 0.5);
    color: darken($bg-color, 45%);
  }
  &graduate {
    $bg-color: #e8ccff;
    background: $bg-color;
    outline: 3px solid rgba($bg-color, 0.5);
    color: darken($bg-color, 30%);
  }
}

.txt-right {
  text-align: right;
  width: 100%;
  display: block;
}
.txt-bold {
  font-weight: 600;
}
.email {
  font-size: 0.95rem;
  color: #5c4958;
  font-weight: 500;
}
.jc-center {
  justify-content: center;
}

.student-photo-Male,
.student-photo-Female {
  border-radius: 50%;
  width: 42px;
  border: 1px solid #fff;
}
.student-photo-Male {
  outline: 3px solid #b9ddff70;
}
.student-photo-Female {
  outline: 3px solid #facfff70;
}
            </style>
          </head>
          <body>
             ${divToPrint2.outerHTML}
            ${divToPrint.outerHTML}
          </body>
        </html>`
      )

      newPrintWindow.print()
      //newPrintWindow.close()
    },
    // status true for every column
    selectClear() {
      if (this.flexi.options.hiddenColumns.length != 0) {
        for (let i = 0; i < this.flexi.columns.length; i++) {
          this.flexi.columns[i].status = true
        }
      }
    },
    // hide selected column
    selectHidden(index) {
      this.flexi.columns[index].status = !this.flexi.columns[index].status
    },
    Toggle() {
      this.flexi.options.show = !this.flexi.options.show
    },
    clearSearch() {
      this.flexi.options.searchKeyWord = ''
    }
  },
  watch: {
    'flexi.options.selected': {
      handler: function (val) {
        this.flexi.options.pages = []
        this.flexi.options.itemsPerPage = val.id
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flexi-table-controls-c {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .ftc-search-wrapper {
    height: 40px;
    width: 280px;
    position: relative;
    display: flex;
    align-items: center;
    background-color: #f7f8fa;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    input[type='text'] {
      padding: 10px 15px 10px 40px;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      flex: 1;
      background-color: #f7f8fa;

      &:focus {
        outline: none;
      }
    }

    .clear-button {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      font-size: 15px;
      cursor: pointer;
      color: #007bff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    .search {
      position: absolute;
      left: 0px;
    }
  }
  .ftc-select-wrapper,
  .dropdown {
    display: inline-flex;
    align-items: center;
  }
  .dropdown {
    display: flex;
    flex-direction: column;
    .dropdown-icon {
      cursor: pointer;
    }

    .multi {
      border: 2px solid black;
      border-radius: 25px;
      background-color: rgb(255, 255, 255);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, auto);
      gap: 10px;
      padding: 10px;
      position: absolute;
      z-index: 999;
      left: 2%;
      top: 25%;

      .clear-button {
        cursor: pointer;
        border: 2px solid black;
        border-radius: 25px;
        grid-column: 4;
        padding: 10px;
        background-color: aqua;
      }

      .option {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid black;
        border-radius: 25px;
        padding: 5px;

        cursor: pointer;
        &.selected {
          background-color: #2feb9c;
        }
        &.notselected {
          background-color: #ff5959;
        }
      }
    }
  }
}
</style>
