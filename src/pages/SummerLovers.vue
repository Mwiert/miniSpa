<template>
  <div>
    <UIEnumDropdown
      v-model="selectedPetsForEnum"
      :items="pets"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      :label="label"
      :dataSize="dataSize"
      searchable
      maxVisibleItems="2"
      primaryKey="id"
      :hasActionBox="true"
      :isMulti="isMulti"
      :isSingle="isSingle"
      :showAll="true"
      :showUnknown="true"
      :enumObj="EOdrEntity"
    />
    <UIMultiDropdown
      v-model="selectedPets"
      :items="pets"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      :label="label"
      :dataSize="dataSize"
      searchable
      maxVisibleItems="2"
      primaryKey="id"
      :hasActionBox="true"
    />
    <UIDropdown
      v-model="selectedItem"
      :items="items"
      :label="label"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      searchable
      :dataSize="dataSize"
      primaryKey="id"
    />
  </div>
</template>

<script lang="ts">
import UIEnumDropdown from '../components/Dropdown/UIEnumDropdown.vue'
import UIDropdown from '../components/Dropdown/UIDropdown.vue'
import UIMultiDropdown from '../components/Dropdown/UIMultiDropdown.vue'
import EOdrEntity from '../enum/EOdrEntityType'
export default {
  name: 'SummerLovers',
  components: {
    UIEnumDropdown,
    UIDropdown,
    UIMultiDropdown
  },
  data() {
    return {
      isMulti: true,
      isSingle: false,
      EOdrEntity: EOdrEntity,
      pets: [
        {
          id: 0,
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdaos6lr3fU5cMreuJ6LwqB8Oqakci-W4zA&s',
          name: 'Dog',
          detail: 'a'
        },
        {
          id: 1,
          imageUrl: '',
          name: 'Cat',
          detail: 'b'
        },
        { id: 2, imageUrl: '', name: 'Fish', detail: 'c' },
        { id: 3, imageUrl: '', name: 'Bird', detail: 'd' },
        { id: 4, imageUrl: '', name: 'Mouse', detail: 'c' },
        { id: 5, imageUrl: '', name: 'Elephant', detail: 'd' },
        { id: 6, imageUrl: '', name: 'Hawk', detail: 'c' },
        { id: 7, imageUrl: '', name: 'Monkey', detail: 'a' }
      ],
      foods: [
        {
          id: 0,
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdaos6lr3fU5cMreuJ6LwqB8Oqakci-W4zA&s',
          name: 'Dog Food',
          detail: 'e'
        },
        { id: 1, imageUrl: '', name: 'Cat Food', detail: 'f' },
        { id: 2, imageUrl: '', name: 'Fish Food', detail: 'g' },
        { id: 3, imageUrl: '', name: 'Bird Food', detail: 'h' }
      ],
      toys: [
        { id: 0, imageUrl: '', name: 'Dog Toy', detail: 'k' },
        { id: 1, imageUrl: '', name: 'Cat Toy', detail: 'l' },
        { id: 2, imageUrl: '', name: 'Fish Toy', detail: 'm' },
        { id: 3, imageUrl: '', name: 'Bird Toy', detail: 'n' }
      ],
      items: [
        { id: 0, imageUrl: '', name: 'Türk Hava Yollari', detail: 'o' },
        { id: 1, imageUrl: '', name: 'Pegasus', detail: 'p' },
        { id: 2, imageUrl: '', name: 'Sun Express', detail: 'r' },
        { id: 3, imageUrl: '', name: 'Corelon', detail: 's' }
      ],
      petLabel: 'Select a Pet',
      foodLabel: 'Select a Food',
      toyLabel: 'Select a Toy',
      itemLabel: 'Select an Airline',
      fontSize: 12,
      dataSize: 3,
      selectedPet: {
        id: 0,
        imageUrl: '',
        name: 'Dog',
        detail: 'a'
      },
      selectedFood: {
        id: 0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdaos6lr3fU5cMreuJ6LwqB8Oqakci-W4zA&s',
        name: 'Dog Food',
        detail: 'e'
      },

      selectedToy: {
        id: 0,
        imageUrl: '',
        name: 'Dog Toy',
        detail: 'k'
      },
      selectedItem: {
        id: 0,
        imageUrl: '',
        name: 'Türk Hava Yollari',
        detail: 'o'
      },
      selectedPets: [
        { id: 0, imageUrl: 'https://example.com/dog.png', name: 'Dog', detail: 'a' },
        { id: 1, imageUrl: '', name: 'Cat', detail: 'b' }
      ],
      selectedPetsForEnum: [
        { id: 0, imageUrl: 'https://example.com/dog.png', name: 'Dog', detail: 'a' },
        { id: 1, imageUrl: '', name: 'Cat', detail: 'b' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
