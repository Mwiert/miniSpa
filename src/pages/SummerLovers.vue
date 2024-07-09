<template>
    <div>
      <UIDropdown />
    </div>
  </template>
  
  <script lang="ts">
  import UIDropdown from '../components/UIDropdown.vue'
  export default {
    name: 'SummerLovers',
    components: {
      UIDropdown
    },
    props: {
    items: {                           //items that we will show in our options.
      type: Array as () => string[],
      required: true,
      default: () => [                    
        'Turkish Airlines',
        'Anadolu Jet',
        'Sun Express',
        'Pegasus Europe',
        'Corendon EU'
      ]
    }
  }
  }
  </script>
  
  <style lang="scss" scoped></style>