<template>
  <div>
    <UIDropdown :items="items" :label="label" :dataSize="dataSize" :fontSize="fontSize" />
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
      dataSize: 3,
      fontSize: '15px'
    }
  }
}
</script>

<style lang="scss" scoped></style>
