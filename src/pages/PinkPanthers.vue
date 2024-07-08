<!-- 4. Takım Proje Sayfası-->
<template>
  <div>
    <button @click="handlerSort('orderId')">orderId</button>

    <button @click="handlerSort('name')">name</button>

    <select name="" id="" @change="handlerSelect">
      <option value="orderId">OrderId ASC</option>
      <option value="name">OrderId DESC</option>
    </select>

    <table>
      <thead></thead>
      <tbody>
        <tr v-for="tr in table" :key="tr.orderId">
          <td v-for="td in tr" :key="td">
            {{ td }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PinkPanthers',
  data() {
    return {
      table: [
        {
          id: 1,
          status: 'pending',
          orderId: '0001',
          name: 'Kadir',
          surname: 'Elkin',
          city: 'Antalya'
        },
        {
          id: 2,
          status: 'pending',
          orderId: '0002',
          name: 'Kamil',
          surname: 'Özkaya',
          city: 'Antalya'
        },
        {
          id: 3,
          status: 'confirmed',
          orderId: '0003',
          name: 'Aytaç',
          surname: 'Güç',
          city: 'Antalya'
        },
        {
          id: 4,
          status: 'confirmed',
          orderId: '0004',
          name: 'Mert',
          surname: 'Şahin',
          city: 'Antalya'
        }
      ],
      isAsc: true,
      passengers: {
        kadir: {
          age: 18,
          city: 'İstanbul'
        }
      }
    }
  },

  methods: {
    handlerSort(colName) {
      this.isAsc = !this.isAsc
      this.table.sort((a, b) => {
        return this.isAsc
          ? a[colName].localeCompare(b[colName])
          : b[colName].localeCompare(a[colName])
      })
    },
    handlerSelect(event) {
      this.handlerSort(event.target.value)
    }
  }
}
</script>

<style lang="scss">
table {
  tr {
    td {
      border: 1px solid;
      padding: 0.5rem;
    }
  }
}
</style>
