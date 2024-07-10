<template>
  <div>
    <UIDropdown :items="items" :label="label" :dataSize="dataSize" />
  </div>
</template>

<script lang="ts">
import UIDropdown from '../components/UIDropdown.vue'
export default {
  name: 'SummerLovers',
  components: {
    UIDropdown
  },
  data() {
    return {
      items: ['Turkish Airlines', 'Anadolu Jet', 'Sun Express', 'Pegasus Europe', 'Corendon EU'],
      label: 'Please select an airline:',
      dataSize: 5
    }
  }
}
</script>

<style lang="scss" scoped></style>
