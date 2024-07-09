<template>
  <div class="summerLovers-c">
      <UIDropdown :items="item" @sendItem="handlerSelectedItem" />
  </div>
</template>


<script lang="ts">
import UIDropdown from '../components/UIDropdown.vue'
export default {
  name: 'summerLovers',
  components: {
      UIDropdown
  },
  data() {
      return {
          items:
          [
        'Türk Hava Yollari','Pegasus','Sun Express'
      ]
      }
  },
  methods: {
      handlerSelectedItem(item){
          this.selectedItem = item     
         }
  }
}

</script>

<style>
</style>