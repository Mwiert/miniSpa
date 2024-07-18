<!-- <template>
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
      tableData: [
        { id: 1, name: 'Item 1', description: 'Description 1' },
        { id: 2, name: 'Item 2', description: 'Description 2' },
        { id: 3, name: 'Item 3', description: 'Description 3' },
        { id: 4, name: 'Item 4', description: 'Description 4' },
        { id: 5, name: 'Item 5', description: 'Description 5' },
        { id: 6, name: 'Item 6', description: 'Description 6' },
        { id: 7, name: 'Item 7', description: 'Description 7' },
        { id: 8, name: 'Item 8', description: 'Description 8' },
        { id: 9, name: 'Item 9', description: 'Description 9' },
        { id: 10, name: 'Item 10', description: 'Description 10' },
        { id: 11, name: 'Item 11', description: 'Description 11' },
        { id: 12, name: 'Item 12', description: 'Description 12' }
        // Add more items as needed
      ],
      tableHeaders: ['ID', 'Name', 'Description']

      // tableOptions: {
      //   options: {
      //     header: {},
      //     body: {},
      //     footer: {}
      //   },
      //   table: {
      //     columns: [
      //       { name: 'Status', label: 'status', sortable: true },
      //       { name: 'Creation Date', label: 'creationDate' },
      //       { name: 'Order Id', label: 'orderId', sortable: true },
      //       { name: 'Market', label: 'market' },
      //       { name: 'Provider Name/Surname', label: 'providerNameSurname' },
      //       { name: 'Check In', label: 'checkIn', sortable: true },
      //       { name: 'Check Out', label: 'checkOut', sortable: true },
      //       { name: 'Room Type', label: 'roomType' },
      //       { name: 'Promo Code', label: 'promoCode' },
      //       { name: 'Price', label: 'price', sortable: true }
      //     ],
      //     rows: []
      //   }
      // },
      // dummies: dummy
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

<style lang="scss" scoped></style> -->
<template>
  <div>
    <SmartTable :data="tableData" :headers="tableHeaders" :itemsPerPage="5" />
  </div>
</template>

<script>
import SmartTable from '../components/SmartTable/SmartTable.vue' // Adjust the path as needed

export default {
  name: 'ParentComponent',
  components: {
    SmartTable
  },
  data() {
    return {
      tableData: [
        { id: 1, name: 'Item 1', description: 'Description 1' },
        { id: 2, name: 'Item 2', description: 'Description 2' },
        { id: 3, name: 'Item 3', description: 'Description 3' },
        { id: 4, name: 'Item 4', description: 'Description 4' },
        { id: 5, name: 'Item 5', description: 'Description 5' },
        { id: 6, name: 'Item 6', description: 'Description 6' },
        { id: 7, name: 'Item 7', description: 'Description 7' },
        { id: 8, name: 'Item 8', description: 'Description 8' },
        { id: 9, name: 'Item 9', description: 'Description 9' },
        { id: 10, name: 'Item 10', description: 'Description 10' },
        { id: 11, name: 'Item 11', description: 'Description 11' },
        { id: 12, name: 'Item 12', description: 'Description 12' }
      ],
      tableHeaders: ['ID', 'Name', 'Description']
    }
  }
}
</script>
