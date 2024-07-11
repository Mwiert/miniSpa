<template>
  <div>
    <UIDropdown
      v-model="selectedPet"
      :items="pets"
      :label="petLabel"
      :fontSize="fontSize"
      idField="id"
      displayField="name"
      urlField="imageUrl"
      searchable
    />
    <UIDropdown
      v-model="selectedFood"
      :items="foods"
      :label="foodLabel"
      :fontSize="fontSize"
      idField="id"
      displayField="name"
      urlField="imageUrl"
      searchable
    />
    <UIDropdown
      v-model="selectedToy"
      :items="toys"
      :label="toyLabel"
      :fontSize="fontSize"
      idField="id"
      displayField="name"
      urlField="imageUrl"
      searchable
    /> 
    <UIDropdown
      v-model="selectedItem"
      :items="items"
      :label="itemLabel"
      :fontSize="fontSize"
      idField="id"
      displayField="name"
      urlField="imageUrl"
      searchable
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
        { id: 1, imageUrl: "", name: 'Dog', detail: 'a' },
        { id: 2, imageUrl: "", name: 'Cat', detail: 'b' },
        { id: 3, imageUrl: "", name: 'Fish', detail: 'c' },
        { id: 4, imageUrl: "", name: 'Bird', detail: 'd' }
      ],
      foods: [
        { id: 1, imageUrl: "", name: 'Dog Food', detail: 'e' },
        { id: 2, imageUrl: "", name: 'Cat Food', detail: 'f' },
        { id: 3, imageUrl: "", name: 'Fish Food', detail: 'g' },
        { id: 4, imageUrl: "", name: 'Bird Food', detail: 'h' }
      ],
      toys: [
        { id: 1, imageUrl: "", name: 'Dog Toy', detail: 'k' },
        { id: 2, imageUrl: "", name: 'Cat Toy', detail: 'l' },
        { id: 3, imageUrl: "", name: 'Fish Toy', detail: 'm' },
        { id: 4, imageUrl: "", name: 'Bird Toy', detail: 'n' }
      ],
      items: [
        { id: 1, imageUrl: "", name: 'Türk Hava Yollari', detail: 'o' },
        { id: 2, imageUrl: "", name: 'Pegasus', detail: 'p' },
        { id: 3, imageUrl: "", name: 'Sun Express', detail: 'r' },
        { id: 4, imageUrl: "", name: 'Corelon', detail: 's' }
      ],
      petLabel: 'Select a Pet',
      foodLabel: 'Select a Food',
      toyLabel: 'Select a Toy',
      itemLabel: 'Select an Airline',
      fontSize: 12,
      selectedPet: {},
      selectedFood: {},
      selectedToy: {},
      selectedItem: {}
    };
  }
};
</script>


<style lang="scss" scoped></style>