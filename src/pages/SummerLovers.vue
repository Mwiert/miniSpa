
<template>
  <div>
  
    <UIDropdown
      :value="selectedPet"                       
      @input="selectedPet = $event"
      v-model:items="pets"                                               
      :label="petLabel"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      searchable
      :dataSize="dataSize"
    />
    <UIDropdown
      :value="selectedFood" 
      @input="selectedFood = $event"
      v-model:items="foods"
      :label="foodLabel"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      searchable
      :dataSize="dataSize"
    />
    <UIDropdown
      :value="selectedToy" 
      @input="selectedToy = $event"
      v-model:items="toys"
      :label="toyLabel"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      searchable
      :dataSize="dataSize"
    /> 
    <UIDropdown
      :value="selectedItem" 
      @input="selectedItem = $event"
      v-model:items="items"
      :label="itemLabel"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      searchable
      :dataSize="dataSize"
    />
  </div>
</template>

<script lang="ts">
import UIDropdown from '../components/UIDropdown.vue';

export default {
  name: 'SummerLovers',
  components: {
    UIDropdown
  },
  data() {
    return {
      pets: [
        {imageUrl: "https://example.com/dog.png", name: 'Dog', detail: 'a' },
        {imageUrl: "", name: 'Cat', detail: 'b' },
        {imageUrl: "", name: 'Fish', detail: 'c' },
        {imageUrl: "", name: 'Bird', detail: 'd' },
        {imageUrl: "", name: 'Fish', detail: 'c' },
        {imageUrl: "", name: 'Bird', detail: 'd' },
        {imageUrl: "", name: 'Fish', detail: 'c' },
        {imageUrl: "", name: 'Dog', detail: 'a' }
      ],
      foods: [
        { imageUrl: "https://example.com/dog.png", name: 'Dog Food', detail: 'e' },
        { imageUrl: "", name: 'Cat Food', detail: 'f' },
        { imageUrl: "", name: 'Fish Food', detail: 'g' },
        { imageUrl: "", name: 'Bird Food', detail: 'h' }
      ],
      toys: [
        { imageUrl: "", name: 'Dog Toy', detail: 'k' },
        { imageUrl: "", name: 'Cat Toy', detail: 'l' },
        { imageUrl: "", name: 'Fish Toy', detail: 'm' },
        { imageUrl: "", name: 'Bird Toy', detail: 'n' }
      ],
      items: [
        { imageUrl: "", name: 'Türk Hava Yollari', detail: 'o' },
        { imageUrl: "", name: 'Pegasus', detail: 'p' },
        { imageUrl: "", name: 'Sun Express', detail: 'r' },
        { imageUrl: "", name: 'Corelon', detail: 's' }
      ],
      petLabel: 'Select a Pet',
      foodLabel: 'Select a Food',
      toyLabel: 'Select a Toy',
      itemLabel: 'Select an Airline',
      fontSize: 12,
      selectedPet: {},
      selectedFood: {},
      selectedToy: {},
      selectedItem: {},
      dataSize: 1
    };
  }
};
</script>


<style lang="scss" scoped></style>

