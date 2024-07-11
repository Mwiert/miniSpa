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
            { name: 'Status',label: 'status', status: true, sortable: true},
            { name: 'Creation Date',label: 'creationDate', status: true },
            { name: 'Order Id',label: 'orderId', status: true, sortable: true },
            { name: 'Market',label: 'market', status: true },
            { name: 'Provider Name/Surname', label: 'providerNameSurname',status: true },
            { name: 'Check In', label: 'checkIn',status: true },
            { name: 'Check Out',label: 'checkOut', status: true },
            { name: 'Room Type', label: 'roomType',status: true },
            { name: 'Promo Code', label: 'promoCode',status: true },
            { name: 'Price', label: 'price',status: true }
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
          class: `status`
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
          text: dummy.promoCode,
          class:"promoCode"
        },
        price: {
          text: dummy.price,
          class: 'price'
        }
      }
      this.tableOptions.table.rows.push(rowObj)
    })
  }
}
</script>

<style lang="scss" scoped></style>
