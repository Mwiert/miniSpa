<template>
  <div>
    <UIDropdown :items="items" :label="label" />
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
      //items that we will show in our options.
      items: ['Turkish Airlines', 'Anadolu Jet', 'Sun Express', 'Pegasus Europe', 'Corendon EU'],
      label: 'Please select an airline:'
    }
  }
}
</script>

<style lang="scss" scoped></style>
