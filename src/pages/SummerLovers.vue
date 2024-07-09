<template>
    <div>
      <UIDropdown :items="items"/>
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
      ]
    
  }
}
  }
  </script>
  
  <style lang="scss" scoped></style>