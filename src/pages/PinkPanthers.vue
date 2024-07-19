<template>
  <div>
    <SmartTable :options="tableOptions" />
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
          body: {},
          footer: {}
        },
        table: {
          columns: [
            { name: 'Status', label: 'status', sortable: true },
            { name: 'Creation Date', label: 'creationDate' },
            { name: 'Order Id', label: 'orderId', sortable: true },
            { name: 'Market', label: 'market' },
            { name: 'Provider Name/Surname', label: 'providerNameSurname' },
            { name: 'Check In', label: 'checkIn', sortable: true },
            { name: 'Check Out', label: 'checkOut', sortable: true },
            { name: 'Room Type', label: 'roomType' },
            { name: 'Promo Code', label: 'promoCode' },
            { name: 'Price', label: 'price', sortable: true }
          ],
          rows: []
        }
      },
      dummies: dummy
    }
  },
  methods: {},
  mounted() {
    this.tableOptions.table.rows = this.dummies.map((dummy: any) => {
      return {
        status: {
          text: dummy.status,
          class: `status ${dummy.status.toLowerCase()}`
        },
        creationDate: {
          text: dummy.creationDate,
          class: ''
        },
        orderId: {
          text: dummy.orderId,
          class: '',
          url: `https://google.com/search?q=${dummy.orderId}`
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
          class: 'promoCode'
        },
        price: {
          text: dummy.price,
          class: 'price'
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped></style>
