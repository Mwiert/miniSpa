<template>
  {{ selectedPets }}
  <UIMultiDropdown
      v-model="selectedPets"
      :items="pets"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      :label="petLabel"
      :dataSize="dataSize"
      searchable
      maxVisibleItems=2
  />
  <div>
    <UIDropdown
      v-model="selectedPet"
      :items="pets"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      :label="petLabel"
      :dataSize="dataSize"
      searchable
    />
    <UIDropdown
      v-model="selectedFood"
      :items="foods"
      :fontSize="fontSize"
      :label="foodLabel"
      displayField="name"
      urlField="imageUrl"
      searchable
      :dataSize="dataSize"
    />
  </div>
    <UIDropdown
      v-model="selectedToy"
      :items="toys"
      :fontSize="fontSize"
      displayField="name"
      :label="toyLabel"
      urlField="imageUrl"
      searchable
      :dataSize="dataSize"
    />
    <UIDropdown
      v-model="selectedItem"
      :items="items"
      :label="itemLabel"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      searchable
      :dataSize="dataSize"
    />
</template>

<script lang="ts">
import UIDropdown from '../components/Dropdown/UIDropdown.vue'
import UIMultiDropdown from '../components/Dropdown/UIMultiDropdown.vue'

export default {
  name: 'SummerLovers',
  components: {
    UIDropdown,
    UIMultiDropdown
  },
  data() {
    return {
      pets: [
        { id: 2, imageUrl: 'https://example.com/dog.png', name: 'Dog', detail: 'a' },
        { imageUrl: '', name: 'Cat', detail: 'b' },
        { imageUrl: '', name: 'Fish', detail: 'c' },
        { imageUrl: '', name: 'Bird', detail: 'd' },
        { imageUrl: '', name: 'Mouse', detail: 'c' },
        { imageUrl: '', name: 'Elephant', detail: 'd' },
        { imageUrl: '', name: 'Hawk', detail: 'c' },
        { imageUrl: '', name: 'Monkey', detail: 'a' }
      ],
      foods: [
        { imageUrl: 'https://example.com/dog.png', name: 'Dog Food', detail: 'e' },
        { imageUrl: '', name: 'Cat Food', detail: 'f' },
        { imageUrl: '', name: 'Fish Food', detail: 'g' },
        { imageUrl: '', name: 'Bird Food', detail: 'h' }
      ],
      toys: [
        { imageUrl: '', name: 'Dog Toy', detail: 'k' },
        { imageUrl: '', name: 'Cat Toy', detail: 'l' },
        { imageUrl: '', name: 'Fish Toy', detail: 'm' },
        { imageUrl: '', name: 'Bird Toy', detail: 'n' }
      ],
      items: [
        { imageUrl: '', name: 'Türk Hava Yollari', detail: 'o' },
        { imageUrl: '', name: 'Pegasus', detail: 'p' },
        { imageUrl: '', name: 'Sun Express', detail: 'r' },
        { imageUrl: '', name: 'Corelon', detail: 's' }
      ],
      petLabel: 'Select a Pet',
      foodLabel: 'Select a Food',
      toyLabel: 'Select a Toy',
      itemLabel: 'Select an Airline',
      fontSize: 12,
      dataSize: 3
    }
  },
  computed: {
    selectedPet() {
      return this.pets[0]
    },
    selectedFood() {
      return this.foods[0]
    },
    selectedToy() {
      return this.toys[0]
    },
    selectedItem() {
      return this.items[0]
    },
    selectedPets(){
      return [this.pets[4],this.pets[1]]
    }
  },
}
</script>

<style lang="scss" scoped></style>
