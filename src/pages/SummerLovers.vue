<template>
    <div>
      <UIDropdown :items="items" :label="label" :fontSize="fontSize"  />
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
      items:                            //items that we will show in our options.
      [                    
        'Turkish Airlines',
        'Anadolu Jet',
        'Sun Express',
        'Pegasus Europe',
        'Corendon EU'
      ],
      label: "Please select an airline:",
      fontSize:12,
      // dataSize:5
  }
}
}
</script>

<style lang="scss" scoped></style>