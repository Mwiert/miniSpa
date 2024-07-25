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
        :placeHolder="flexi.options.UIDropdownOrderProp.placeHolder"
        :showAll = "flexi.options.UIDropdownOrderProp.showAll"
        
        />

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

<script>
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
    selectClear() {
      if (this.flexi.options.hiddenColumns.length != 0) {
        for (let i = 0; i < this.flexi.columns.length; i++) {
          this.flexi.columns[i].status = true
        }
      }
    },
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
