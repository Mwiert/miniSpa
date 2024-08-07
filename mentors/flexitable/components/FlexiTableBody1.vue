<template>
  <div>
    <template v-for="(rowObj, rowobjKey) in FlexiBodyItemsPerPage" :key="rowobjKey">
      <tr>
        <td v-for="(col, key) in rowObj.row" :key="key">
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
              <!-- <template v-if="col?.img">
                  <img :src="col.img" :class="col.imgClass" />
                </template> -->

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
    </template>
  </div>
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

<style lang="scss" scoped></style>
