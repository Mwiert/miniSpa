<template>
  <div>
    <div>
      <h1>{{ 'Single Enum Dropdown' }}</h1>

      <UIEnumDropdown
        v-model="selectedEnum"
        :fontSize="fontSize"
        displayField="name"
        :label="'Sorted by Name in Ascending Order All and Unknown Are On'"
        :dataSize="dataSize"
        searchable
        :sortField="'name'"
        :isMulti="!isMulti"
        :showAll="true"
        :showUnknown="true"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :enumObj="EInternSingleComponentType" />
      <UIEnumDropdown
        v-model="selectedEnum2"
        :fontSize="fontSize"
        displayField="name"
        :label="'Sorted by Id in Descending Order All and Unknown Are Closed'"
        :dataSize="dataSize"
        searchable
        :sortField="'id'"
        :isMulti="!isMulti"
        :showAll="false"
        :showUnknown="false"
        :sortByAscending="false"
        :maxItemThreshold="maxItemThreshold"
        :enumObj="EInternSingleComponentType" />

      <UIEnumDropdown
        v-model="selectedEnum"
        :fontSize="fontSize"
        displayField="name"
        :label="'Sorted by Name in Ascending Order All and Unknown Are On Searchable Closed'"
        :dataSize="dataSize"
        :sortField="sortField"
        :isMulti="!isMulti"
        :showAll="true"
        :showUnknown="true"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :enumObj="EInternSingleComponentType" />
    </div>
    <div>
      <h1>{{ 'Multi Enum Dropdown' }}</h1>
      <UIEnumDropdown
        v-model="selectedEnums"
        :fontSize="fontSize"
        :label="'Sorted by Name in Ascending Order All and Unknown Are On'"
        :sortField="sortField"
        :dataSize="dataSize"
        searchable
        :maxVisibleItems="2"
        :hasActionBox="true"
        :isMulti="isMulti"
        :showAll="true"
        :showUnknown="true"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :enumObj="EInternComponentType" />

      <UIEnumDropdown
        v-model="selectedEnums2"
        :fontSize="fontSize"
        :label="'Sorted by Id in Descending Order All and Unknown Are Closed'"
        :sortField="id"
        :dataSize="dataSize"
        searchable
        :maxVisibleItems="2"
        :hasActionBox="true"
        :isMulti="isMulti"
        :showAll="false"
        :showUnknown="false"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :enumObj="EInternComponentType" />

      <UIEnumDropdown
        v-model="selectedEnums"
        :fontSize="fontSize"
        displayField="name"
        :label="'Sorted by Name in Ascending Order All and Unknown Are On Searchable Closed'"
        :sortField="'sortField'"
        :dataSize="dataSize"
        :maxVisibleItems="2"
        :hasActionBox="true"
        :isMulti="isMulti"
        :showAll="true"
        :showUnknown="true"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :enumObj="EInternComponentType" />
    </div>
    <div>
      <h1>{{ 'Multi Dropdown' }}</h1>

      <UIMultiDropdown
        v-model="selectedPets"
        :items="pets"
        :fontSize="fontSize"
        displayField="name"
        :sortField="sortField"
        urlField="imageUrl"
        :label="'Multi dropdown with images and action box and max item threshold searchable'"
        :dataSize="dataSize"
        searchable
        :maxVisibleItems="2"
        primaryKey="id"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :hasActionBox="true" />
      <UIMultiDropdown
        v-model="selectedPets"
        :items="pets"
        :fontSize="fontSize"
        displayField="name"
        :sortField="sortField"
        urlField="''"
        :label="'Multi dropdown without images'"
        :dataSize="dataSize"
        searchable
        :maxVisibleItems="2"
        primaryKey="id"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :hasActionBox="true" />
      <UIMultiDropdown
        v-model="selectedPets"
        :items="pets"
        :fontSize="fontSize"
        displayField="name"
        :sortField="sortField"
        urlField="''"
        :label="'Multi dropdown without maxVisibleItem'"
        :dataSize="dataSize"
        searchable
        primaryKey="id"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :hasActionBox="true" />
      <UIMultiDropdown
        v-model="selectedPets"
        :items="pets"
        :fontSize="fontSize"
        displayField="name"
        :sortField="sortField"
        urlField="''"
        :label="'Multi dropdown without images and no action box and without max item threshold searchable'"
        :dataSize="dataSize"
        searchable
        :maxVisibleItems="2"
        primaryKey="id"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :hasActionBox="false" />
    </div>
    <div>
      <h1>{{ 'Single Dropdown' }}</h1>

      <UIDropdown
        v-model="selectedItem"
        :items="items"
        :label="'Single dropdown with images with max item threshold searchable'"
        :fontSize="fontSize"
        displayField="name"
        :sortField="sortField"
        urlField="imageUrl"
        searchable
        :dataSize="dataSize"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        primaryKey="id" />
      <UIDropdown
        v-model="selectedItem"
        :items="items"
        :label="'Single dropdown without images'"
        :fontSize="fontSize"
        displayField="id"
        :sortField="sortField"
        urlField="''"
        searchable
        :dataSize="dataSize"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        primaryKey="id" />
      <UIDropdown
        v-model="selectedItem"
        :items="items"
        :label="'Single dropdown without searchable'"
        :fontSize="fontSize"
        displayField="name"
        :sortField="sortField"
        urlField="imageUrl"
        :dataSize="dataSize"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        primaryKey="id" />
    </div>
  </div>
</template>

<script>
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
      maxItemThreshold: 10,
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
        imageUrl:
          'https://scontent.fayt3-1.fna.fbcdn.net/v/t1.18169-9/10897909_628158777306211_2985313991670757129_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=93lV2ws2vMIQ7kNvgF-FtyQ&_nc_ht=scontent.fayt3-1.fna&oh=00_AYAiuHNBosscMy6SjMWPOszZaI0Yl0Hf_kxuqKWGeChLFA&oe=66C5CE1D',
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
        }
      ],
      selectedEnums: [
        { id: -1, name: 'ALL' },
        { id: 0, name: 'UNKNOWN' }
      ],
      selectedEnum: { id: 0, name: 'UNKNOWN' },
      selectedEnum2: { id: 1, name: 'CAN' },
      selectedEnums2: [
        { id: 1, name: 'SINGLE' },
        { id: 2, name: 'MULTI' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
