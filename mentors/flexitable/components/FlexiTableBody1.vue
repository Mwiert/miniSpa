<template>
  <tbody class="flexi-table-body-c" ref="print1" @scroll.passive="handleScroll">
    {{
      FlexiBodyItemsPerPage.length
    }}
    {{
      FlexiBodyItemsPerPageLimited.length
    }}
    <template v-if="FlexiBodyItemsPerPage.length < maxItem">
      <template v-for="(rowObj, rowobjKey) in FlexiBodyItemsPerPage" :key="rowobjKey">
        <tr class="flexi-table-body-row-wrapper" @click="handlerToggleDetails(rowObj)">
          <template v-for="(col, key) in rowObj.row" :key="key">
            <td class="flexi-table-body-row" v-if="HideColumn(key)">
              <div class="flexi-table-body-col" :class="{ 'jc-center': col.checkbox }">
                <!-- CHECKBOX Render -->
                <template v-if="col.checkbox">
                  <input type="checkbox" name="" id="" v-model="col.value" @change="pushtheArray" />
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
          </template>
        </tr>
        <tr class="flexi-table-body-row-wrapper">
          <td colspan="999">
            <template v-if="rowObj.details?.status">
              <div class="flexi-table-body-detail-wrapper">
                <component
                  :is="getAsyncComponent(rowObj.details.componentPath)"
                  v-bind="rowObj.details.props">
                </component>
              </div>
            </template>
          </td>
        </tr>
      </template>
    </template>
    <template v-else>
      <template v-for="(rowObj, rowobjKey) in FlexiBodyItemsPerPageLimited" :key="rowobjKey">
        <tr class="flexi-table-body-row-wrapper" @click="handlerToggleDetails(rowObj)">
          <template v-for="(col, key) in rowObj.row" :key="key">
            <td class="flexi-table-body-row" v-if="HideColumn(key)">
              <div class="flexi-table-body-col" :class="{ 'jc-center': col.checkbox }">
                <!-- CHECKBOX Render -->
                <template v-if="col.checkbox">
                  <input type="checkbox" name="" id="" v-model="col.value" @change="pushtheArray" />
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
          </template>
        </tr>
        <tr class="flexi-table-body-row-wrapper">
          <td colspan="999">
            <template v-if="rowObj.details?.status">
              <div class="flexi-table-body-detail-wrapper">
                <component
                  :is="getAsyncComponent(rowObj.details.componentPath)"
                  v-bind="rowObj.details.props">
                </component>
              </div>
            </template>
          </td>
        </tr>
      </template>
    </template>
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
      this.FlexiBodyItemsPerPageLimited = this.FlexiBodyItemsPerPage.slice(
        0,
        this.page * this.maxItem
      )
    },
    handleScroll(event) {
      if (event?.scrollTop + event?.clientHeight >= event?.scrollHeight) {
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
    },
    createEventListener() {
      window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop
        const clientHeight = document.documentElement.clientHeight
        const scrollHeight = document.documentElement.scrollHeight
        this.handleScroll({ scrollTop, clientHeight, scrollHeight })
      })
    },
    checkUpdate() {
      if (this.FlexiBodyItemsPerPage.length > this.maxItem) {
        const limitedItems = this.FlexiBodyItemsPerPage.slice(
          0,
          this.FlexiBodyItemsPerPageLimited.length
        )

        for (let i = 0; i < limitedItems.length; i++) {
          if (limitedItems[i]?.row?.id !== this.FlexiBodyItemsPerPageLimited[i]?.row?.id) {
            this.FlexiBodyItemsPerPageLimited = limitedItems
            break
          }
        }
      }
      this.$nextTick(() => {
        this.checkHighlight()
        this.handleScroll()
      })
    },
    checkHighlight() {
      this.$nextTick(() => {
        let input = this.flexi.options.searchKeyWord
        document.body.querySelectorAll('.flexi-table-body-col-value').forEach((el) => {
          if (el.textContent.toLowerCase().includes(input.toLowerCase())) {
            const regex = new RegExp(`(${input})`, 'gi')
            el.innerHTML = el.textContent.replace(
              regex,
              '<span class="highlight" style="background:yellow">$1</span>'
            )
          }
        })
      })
    },
    fillFlexiBodyItems() {
      if (this.FlexiBodyItemsPerPage.length !== this.flexi.rows.length) {
        return this.FlexiBodyItemsPerPage.slice(0, this.maxItem)
      } else {
        return this.FlexiBodyItemsPerPage
      }
    }
  },
  created() {
    this.FlexiBodyItemsPerPageLimited = this.flexi.rows.slice(0, this.maxItem)
    this.createEventListener()
  },
  watch: {
    FlexiBodyItemsPerPage() {
      this.checkUpdate()
    },
    SearchKey() {
      this.FlexiBodyItemsPerPageLimited = this.flexi.rows.slice(0, this.maxItem)
    },
    FlexiBodyItemsPerPageLimited() {
      this.checkUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.flexi-table-body-c {
  .flexi-table-body-row-wrapper {
    margin-bottom: 4px;

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

    &:nth-child(odd) {
      background: #f5f7fa;
    }

    &:nth-child(odd):nth-child(4n + 1) {
      background: #ffff;
    }

    .flexi-table-body-detail-wrapper {
      // background: red;
      // height: 100px;
    }

    .flexi-table-body-row {
      .flexi-table-body-col {
        width: 100%;
        border-right: 1px solid rgba(41, 45, 50, 0.14);
        display: flex;
        align-items: center;
        // justify-content: center; TASARIMDA SOLA YASLILAR - DEFNE

        min-height: 56px;

        &-value {
          margin: 0px 8px 0px 8px;
        }

        // justify-content: center;
        img {
          margin-left: 8px;
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

// .email {
//   font-size: 0.95rem;
//   color: #5c4958;
//   font-weight: 500;
// }

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
