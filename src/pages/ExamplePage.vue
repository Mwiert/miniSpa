<template>
  <div>
    <input v-model="searchQuery" placeholder="Ürün ara" />
    <ul>
      <li v-for="product in filteredProductsComputed" :key="product.id">
        {{ product.name }}
      </li>
    </ul>
    <button @click="logFilteredProductsComputed">Filtrelenmiş Ürünleri Göster (Computed)</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const products = ref([
      { id: 1, name: 'Elma' },
      { id: 2, name: 'Armut' },
      { id: 3, name: 'Muz' },
      { id: 4, name: 'Çilek' }
    ])

    const searchQuery = ref('')

    // Computed property for filtered products
    const filteredProductsComputed = computed(() => {
      console.log('computed: filteredProductsComputed çalıştı')
      return products.value.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    const logFilteredProductsComputed = () => {
      console.log(filteredProductsComputed.value)
    }

    return {
      searchQuery,
      filteredProductsComputed,
      logFilteredProductsComputed
    }
  }
}
</script>
