<template>
  <div class="smart-table-c">
    <SmartTableHeader v-on:search-input="handleSearchInput" />
    <!-- Header kısmı filters ve searchbar'ı içerir v-on ile emit ettiğimiz değerleri alıyoruz-->

    <SmartTableBody
      :sortableColumns="sortableColumns" :tableData="filteredData"
      :options="options"
      @cell-click="handleCellClick"
      :noItemsFound="filteredData.length === 0" />   <!--noItemsFound propunu smarttablebody içinde kullanmak için burada kontrol ediyoruz-->

    <SmartTableFooter />
    <!-- Footer kısmı pagination içerir -->
  </div>
</template>

<script lang="ts">
import SmartTableHeader from './SmartTableHeader.vue'
import SmartTableBody from './SmartTableBody.vue'
import SmartTableFooter from './SmartTableFooter.vue'
import dummies from './dummy.js'
export default {
  name: 'SmartTable',
  props: {
    options: Object,
  },
  components: {
    SmartTableHeader,
    SmartTableBody,
    SmartTableFooter
  },
  data() {
    return {
      dummies: dummies,
      searchTerm: '',

           // Columns that will have sorting feature
           sortableColumns: ['orderId', 'orderUuid'] 
    }
  },
  computed: {
    filteredData() {
      if (!this.searchTerm) {
        return this.dummies //search yoksa direk bütün verileri göster
      } //stirngfy yapılabilir ??
      return this.dummies.filter(
        (
          item //data içinde dönüyoruz ve tüm data verilerimizi alıyoruz
        ) =>
          Object.values(item).some(
            (
              value // some eğer search içinde uyuşan bazı terimler varsa bunları true olarak bize döndürüyor örnek olarak pandora live yazmak yerine live yazarsak bize true döner
            ) => value && value.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) //include kullanmak için ve yazılan sonuçlar doğru gelsin diye ek bir filtreleme yapıyoruz search ve data karşılaştırması yapıp sonucu getiriyoruz
          )
      )
    },
  },
  methods: {
    handleSearchInput(value: string) {
      this.searchTerm = value
    },
    handleCellClick(payload) {
      this.$emit('cell-click', payload)
    }
  }
}
</script>

<style lang="scss" scoped></style>
