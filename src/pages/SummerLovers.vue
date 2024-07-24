<template>
  <div></div>
  <div>
    <UIEnumDropdown
      v-model="selectedEnum"
      :items="[EInternSingleComponentType]"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      :label="label"
      :dataSize="dataSize"
      searchable
      :maxVisibleItems="2"
      primaryKey="id"
      :sortField="sortField"
      :hasActionBox="true"
      :isMulti="!isMulti"
      :showAll="true"
      :showUnknown="true"
      :sortByAscending="true"
      :enumObj="EInternSingleComponentType" />
    {{ selectedEnum }}
    <UIEnumDropdown
      v-model="selectedEnums"
      :items="[EInternComponentType]"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      :label="label"
      :sortField="sortField"
      :dataSize="dataSize"
      searchable
      :maxVisibleItems="2"
      primaryKey="id"
      :hasActionBox="true"
      :isMulti="isMulti"
      :showAll="true"
      :showUnknown="true"
      :sortByAscending="true"
      :enumObj="EInternComponentType" />
    <UIMultiDropdown
      v-model="selectedPets"
      :items="pets"
      :fontSize="fontSize"
      displayField="name"
      :sortField="sortField"
      urlField="imageUrl"
      :label="label"
      :dataSize="dataSize"
      searchable
      :maxVisibleItems="2"
      primaryKey="id"
      :sortByAscending="true"
      :hasActionBox="true" />
    <UIDropdown
      v-model="selectedItem"
      :items="items"
      :label="label"
      :fontSize="fontSize"
      displayField="name"
      :sortField="sortField"
      urlField="imageUrl"
      searchable
      :dataSize="dataSize"
      :sortByAscending="true"
      primaryKey="id" />
  </div>
</template>

<script lang="ts">
import UIEnumDropdown from '../components/Dropdown/UIEnumDropdown.vue'
import UIDropdown from '../components/Dropdown/UIDropdown.vue'
import UIMultiDropdown from '../components/Dropdown/UIMultiDropdown.vue'
import EInternComponentType from '../enum/EInternComponentType'
import EInternSingleComponentType from '../enum/EInternSingleComponentType'
export default {
  name: 'SummerLovers',
  components: {
    UIEnumDropdown,
    UIDropdown,
    UIMultiDropdown
  },
  data() {
    return {
      sortField: 'name',
      isMulti: true,
      EInternComponentType: EInternComponentType,
      EInternSingleComponentType: EInternSingleComponentType,
      pets: [
        {
          id: 0,
          imageUrl:
            'https://scontent.fayt3-1.fna.fbcdn.net/v/t1.18169-9/10897909_628158777306211_2985313991670757129_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=93lV2ws2vMIQ7kNvgF-FtyQ&_nc_ht=scontent.fayt3-1.fna&oh=00_AYAiuHNBosscMy6SjMWPOszZaI0Yl0Hf_kxuqKWGeChLFA&oe=66C5CE1D',
          name: 'Dog',
          detail: 'a'
        },
        {
          id: 1,
          imageUrl: 'https://www.petvet.com.tr/tr/images/uploads/44_2.jpg',
          name: 'Cat',
          detail: 'b'
        },
        {
          id: 2,
          imageUrl:
            'https://media.istockphoto.com/id/92121157/tr/foto%C4%9Fraf/animals-piranha.jpg?s=612x612&w=0&k=20&c=GaktAQKn48O32jyC6VixiHS90SIbZXgbdJWQVkaysMI=',
          name: 'Fish',
          detail: 'c'
        },
        {
          id: 3,
          imageUrl: 'https://c.files.bbci.co.uk/127E7/production/_100715757_p063d74j.jpg',
          name: 'Bird',
          detail: 'd'
        },
        { id: 4, imageUrl: '', name: 'Mouse', detail: 'c' },
        {
          id: 5,
          imageUrl: '',
          name: 'ElephantElephantElephantElephantElephantElephantElephant',
          detail: 'd'
        },
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
        {
          id: 'THY',
          imageUrl:
            'https://seeklogo.com/images/T/turkish-airlines-logo-25BACC2D0C-seeklogo.com.png',
          name: 'Türk Hava Yolları',
          detail: 'o'
        },
        {
          id: 'PGS',
          imageUrl:
            'https://ttyd.org.tr/wp-content/uploads/2022/01/pegasus-airlines-eps-vector-logo.png',
          name: 'Pegasus',
          detail: 'p'
        },
        {
          id: 'SXD',
          imageUrl: 'https://media.tenor.com/ba-qljYNd84AAAAe/sunexpress-sunexpress-airlines.png',
          name: 'Sun Express',
          detail: 'r'
        },
        {
          id: 'CRL',
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCSz2Zi2rJUYXY6S7013DGYqPDTL-jxOs5MQ&s',
          name: 'Corendon',
          detail: 's'
        }
      ],
      petLabel: 'Select a Pet',
      foodLabel: 'Select a Food',
      toyLabel: 'Select a Toy',
      itemLabel: 'Select an Airline',
      fontSize: 12,
      dataSize: 3,
      label: 'Select an Item',
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
        id: 'THY',
        imageUrl: 'https://seeklogo.com/images/T/turkish-airlines-logo-25BACC2D0C-seeklogo.com.png',
        name: 'Türk Hava Yolları',
        detail: 'o'
      },
      selectedPets: [
        { id: 0, imageUrl: 'https://example.com/dog.png', name: 'Dog', detail: 'a' },
        { id: 1, imageUrl: '', name: 'Cat', detail: 'b' }
      ],
      selectedEnums: [
        { id: -1, name: 'ALL' },
        { id: 0, name: 'UNKNOWN' }
      ],
      selectedEnum: { id: 0, name: 'UNKNOWN' }
    }
  }
}
</script>

<style lang="scss" scoped></style>
