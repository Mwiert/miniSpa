<template>
  <tbody
    class="flexi-table-body-c"
    v-for="(rowObj, rowobjKey) in FlexiBodyItemsPerPage"
    :key="rowobjKey">
    <tr class="flexi-table-body-row-wrapper">
      <td class="flexi-table-body-row" v-for="(col, key) in rowObj.row" :key="key">
        <div
          class="flexi-table-body-col"
          :class="{ 'jc-center': col.checkbox }"
          v-if="HideColumn(key)">
          <!-- CHECKBOX Render -->
          <template v-if="col.checkbox">
            <input type="checkbox" name="" id="" v-model="col.value" />
          </template>

          <template v-else>
            <!-- IMG Render -->
            <template v-if="col?.img">
              <img :src="col.img" :class="col.imgClass" />
            </template>

            <!-- TEXT Render -->
            <span
              class="flexi-table-body-col-value"
              :class="[col.class, { pointer: col.url }]"
              @click="handlerGoToUrl(col.url)">
              {{ col.value ?? col }}
            </span>
          </template>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import flexiTableMixin from '../flexitableMixin'

export default {
  name: 'FlexiTableBody',
  inject: ['flexi'],
  mixins: [flexiTableMixin],
  data() {
    return {
      pushelements: false,
      FlexiBodyItemsPerPageLimited: [],
      page: 1,
      maxItem: 90,
      loading: false
    }
  },
  methods: {
    addItemsPerPage() {
      this.page++
      this.FlexiBodyItemsPerPageLimited = this.flexi.rows.slice(0, this.page * this.maxItem)
    },
    handleScroll(event) {
      const { scrollTop, clientHeight, scrollHeight } = event.target
      if (scrollTop + clientHeight >= scrollHeight) {
        this.addItemsPerPage()
      }
    },
    handlerGoToUrl(url) {
      if (url) {
        window.open(url, '_blank')
      }
    },
    getAsyncComponent(componentPath) {
      return defineAsyncComponent(() => import(`${componentPath}`))
    },
    handlerToggleDetails(rowObj) {
      if (this.flexi.options.hasDetails) {
        rowObj.details.status = !rowObj.details.status
      }
    },
    pushtheArray() {
      const selected = this.flexi.rows.filter((row) => {
        return Object.values(row.row).some((col) => col.checkbox && col.value)
      })
      this.pushelements = !this.pushelements
      this.flexi.selectedRows.length = 0
      this.flexi.selectedRows.push(...selected)
    }
  },
  created() {
    this.FlexiBodyItemsPerPageLimited = this.flexi.rows.slice(0, this.maxItem)
    window.addEventListener('scroll', () => {
      console.log('scrolling')
    })
  }
}
</script>

<style lang="scss" scoped>
.flexi-table-body-c {
  .flexi-table-body-row-wrapper {
    border: 2px solid #e8ecf4;

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
        border-right: 1px solid rgba(112, 112, 112, 0.14);
        display: flex;
        align-items: center;

        justify-content: flex-start;

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
  text-align: left;
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
