<template>
  <div>
    <SmartTable :options="tableOptions" @cell-click="handleCellClick" />
  </div>
</template>

<script lang="ts">
import SmartTable from '../components/SmartTable/SmartTable.vue'
import dummy from '../components/SmartTable/dummy.js'
export default {
  name: 'PinkPanthers',
  components: {
    SmartTable
  },
  data() {
    return {
      tableOptions: {
        options: {
          header: {},
          body: {
            clickable: true,
            clickableColumns: ['orderId', 'providerName']
          },
          footer: {}
        },
        table: {
          columns: [
            { label: 'Status', status: true },
            { label: 'Creation Date', status: true },
            { label: 'Order Id', status: true },
            { label: 'Market', status: true },
            { label: 'Provider Name/Surname', status: true },
            { label: 'Check In', status: true },
            { label: 'Check Out', status: true },
            { label: 'Room Type', status: true },
            { label: 'Promo Code', status: true },
            { label: 'Price', status: true }
          ],
          rows: []
        }
      },
      dummies: dummy
    }
  },
  methods: {
    handleCellClick({ cell, rowIndex, cellIndex }) {
      console.log('Cell clicked:', cell, 'row:', rowIndex, 'cell:', cellIndex)
    }
  },
  mounted() {
    this.dummies.map((dummy: any) => {
      const rowObj = {
        status: {
          text: dummy.status,
          class: ``
        },
        creationDate: {
          text: dummy.creationDate,
          class: ""
        },
        orderId: {
          text: dummy.orderId,
          class: '',
          url: ''
        },
        market: {
          text: dummy.market
        },
        providerNameSurname: dummy.providerNameSurname,
        checkIn: dummy.checkIn,
        checkOut: dummy.checkOut,
        roomType: {
          text: dummy.roomType,
          class: ''
        },
        promoCode: {
          text: dummy.promoCode
        },
        price: {
          text: dummy.price,
          class: ''
        }
      }
      this.tableOptions.table.rows.push(rowObj)
    })
  }
}
</script>

<style lang="scss" scoped></style>
