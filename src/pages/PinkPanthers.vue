<template>
  <div>
    <SmartTable :options="tableOptions" :headers="tableHeaders" :itemsPerPage="5" />
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
          header: {
            perPageOptions: [
              { id: 0, imageUrl: '', name: '5' },
              { id: 1, imageUrl: '', name: '10'},
              { id: 2, imageUrl: '', name: '50' },
              { id: 3, imageUrl: '', name: 'All'}
            ],
          },
          body: {},
          footer: {}
        },
        table: {
          columns: [
            { id: 1, name: 'Status', label: 'status', sortable: true },
            { id: 2, name: 'Creation Date', label: 'creationDate' },
            { id: 3, name: 'Order Id', label: 'orderId', sortable: true },
            { id: 4, name: 'Market', label: 'market' },
            { id: 5, name: 'Provider Name/Surname', label: 'providerNameSurname' },
            { id: 6, name: 'Check In', label: 'checkIn', sortable: true },
            { id: 7, name: 'Check Out', label: 'checkOut', sortable: true },
            { id: 8, name: 'Room Type', label: 'roomType' },
            { id: 9, name: 'Promo Code', label: 'promoCode' },
            { id: 10, name: 'Price', label: 'price', sortable: true }
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
