<template>
  <div>
    <UIDropdown :items="items" :label="label" :fontSize="fontSize" :showedItem="showedItem" />
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
      items:           //items that we will show in our options.
    [            
      {
        url: "https://cdn.dev.reisetech.io/airline_34x34/TK.svg",
        name: 'Turkish Airlines',
        detail:''
      },  
      {
        url: "https://cdn.dev.reisetech.io/airline_34x34/TK.svg",
        name: 'Anadolu Jet',
        detail:''
      },
      {
        url: "https://cdn.dev.reisetech.io/airline_34x34/TK.svg",
        name: 'Sun Express',
        detail:''
      },    
      {
        url: "https://cdn.dev.reisetech.io/airline_34x34/TK.svg",
        name: 'Pegasus Europe',
        detail:''
      },
      {
        url: "https://cdn.dev.reisetech.io/airline_34x34/TK.svg",
        name: 'Corendon EU',
        detail:''
      }
    ],
    label: "Please select an airline:",
    fontSize:12,
    // dataSize:5
}
}

}
</script>

<style lang="scss" scoped></style>