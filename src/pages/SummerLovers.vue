<template>
  <div>
    <div>
      <h1>{{ 'Menu Dropdown' }}</h1>

      <MenuDropdown :items="multiItemsL" primaryKey="id" displayField="name" label="Menu Dropdown">
        <template #toggle>
          <SvgIcon name="mail" size="s" />
        </template>
        <template> </template>
      </MenuDropdown>

      <MenuDropdown
        className="flight"
        :items="multiItems"
        primaryKey="id"
        displayField="name"
        label="for Flight"
        actionField="func">
        <template #toggle>
          <SvgIcon name="mail" size="s" />
        </template>
        <template>
          <UIMultiDropdown
            v-model="selectedPets"
            :items="pets"
            :fontSize="fontSize"
            displayField="name"
            :sortField="sortField"
            label="Multi dropdown"
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
            label="Multi dropdown 2"
            :dataSize="dataSize"
            searchable
            primaryKey="id"
            :sortByAscending="true"
            :maxItemThreshold="maxItemThreshold"
            :hasActionBox="true" />
          <hr />
        </template>
      </MenuDropdown>

      <MenuDropdown
        className="hotel"
        :items="multiItems"
        primaryKey="id"
        displayField="name"
        label="for Hotel"
        actionField="func">
        <template #toggle>
          <SvgIcon name="mail" size="s" />
        </template>
        <template>
          <UIMultiDropdown
            v-model="selectedPets"
            :items="pets"
            :fontSize="fontSize"
            displayField="name"
            :sortField="sortField"
            label="Multi dropdown"
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
            label="Multi dropdown 2"
            :dataSize="dataSize"
            searchable
            primaryKey="id"
            :sortByAscending="true"
            :maxItemThreshold="maxItemThreshold"
            :hasActionBox="true" />
          <hr />
        </template>
      </MenuDropdown>

      <MenuDropdown
        :className="'flight'"
        :items="multiItems"
        primaryKey="id"
        displayField="name"
        actionField="func"
        directRight>
        <template #toggle>
          <SvgIcon name="mail" size="s" />
        </template>
      </MenuDropdown>

      <MenuDropdown
        :className="'hotel'"
        :items="multiItems"
        primaryKey="id"
        displayField="name"
        actionField="func"
        directRight>
        <template #toggle>
          <SvgIcon name="mail" size="s" />
        </template>
      </MenuDropdown>
    </div>
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

      <UIEnumDropdown
        v-model="selectedEnum"
        :fontSize="fontSize"
        displayField="name"
        :label="'Sorted by Name in Ascending Order All and Unknown Are On Searchable Closed Data Size Closed'"
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
        :sortField="'id'"
        :dataSize="dataSize"
        searchable
        :maxVisibleItems="2"
        :hasActionBox="true"
        :isMulti="isMulti"
        :showAll="false"
        :showUnknown="false"
        :sortByAscending="false"
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

      <UIEnumDropdown
        v-model="selectedEnums"
        :fontSize="fontSize"
        displayField="name"
        :label="'Sorted by Name in Ascending Order All and Unknown Are On Searchable Closed Data Size Closed'"
        :sortField="'sortField'"
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
        :label="'Multi dropdown with images and action box and max item threshold searchable'"
        :dataSize="dataSize"
        searchable
        :maxVisibleItems="2"
        primaryKey="id"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :iconImage="'iconImage'"
        :hasActionBox="true" />

      <UIMultiDropdown
        v-model="selectedPets"
        :items="pets"
        :fontSize="fontSize"
        displayField="name"
        :sortField="sortField"
        :label="'Multi dropdown with images and action box and max item threshold searchable'"
        searchable
        :maxVisibleItems="2"
        primaryKey="id"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :iconImage="'iconImage'"
        :hasActionBox="true" />
      <UIMultiDropdown
        v-model="selectedPets"
        :items="pets"
        :fontSize="fontSize"
        displayField="name"
        :sortField="sortField"
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
        searchable
        :dataSize="dataSize"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :iconImage="'iconImage'"
        primaryKey="id"
        unselectable />
      <UIMultiDropdown
        v-model="selectedPets"
        :items="pets"
        :fontSize="fontSize"
        displayField="name"
        :sortField="sortField"
        :label="'Multi dropdown without maxVisibleItem'"
        :dataSize="dataSize"
        searchable
        primaryKey="id"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :hasActionBox="true" />

      <UIDropdown
        v-model="selectedItem"
        :items="items"
        :label="'Single dropdown with images with max item threshold searchable'"
        :fontSize="fontSize"
        displayField="name"
        :sortField="sortField"
        searchable
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :iconImage="'iconImage'"
        primaryKey="id" />
      <UIDropdown
        v-model="selectedItem"
        :items="items"
        :label="'Single dropdown without images'"
        :fontSize="fontSize"
        displayField="id"
        :sortField="sortField"
        searchable
        :dataSize="dataSize"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :iconImage="'iconImage'"
        primaryKey="id" />
      <UIDropdown
        v-model="selectedItem"
        :items="items"
        :label="'Single dropdown without searchable'"
        :fontSize="fontSize"
        displayField="name"
        :sortField="sortField"
        :dataSize="dataSize"
        :sortByAscending="true"
        :maxItemThreshold="maxItemThreshold"
        :iconImage="'iconImage'"
        primaryKey="id" />
    </div>
    <h1>{{ 'Menu Dropdown' }}</h1>

    <MenuDropdown :items="multiItemsL" primaryKey="id" displayField="name" label="Menu Dropdown">
      <template #toggle>
        <SvgIcon name="mail" size="s" />
      </template>
      <template> </template>
    </MenuDropdown>

    <MenuDropdown
      className="flight"
      :items="multiItems"
      primaryKey="id"
      displayField="name"
      label="for Flight"
      actionField="func">
      <template #toggle>
        <SvgIcon name="mail" size="s" />
      </template>
      <template>
        <UIMultiDropdown
          v-model="selectedPets"
          :items="pets"
          :fontSize="fontSize"
          displayField="name"
          :sortField="sortField"
          label="Multi dropdown"
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
          label="Multi dropdown 2"
          :dataSize="dataSize"
          searchable
          primaryKey="id"
          :sortByAscending="true"
          :maxItemThreshold="maxItemThreshold"
          :hasActionBox="true" />
        <hr />
      </template>
    </MenuDropdown>

    <MenuDropdown
      className="hotel"
      :items="multiItems"
      primaryKey="id"
      displayField="name"
      label="for Hotel"
      actionField="func">
      <template #toggle>
        <SvgIcon name="mail" size="s" />
      </template>
      <template>
        <UIMultiDropdown
          v-model="selectedPets"
          :items="pets"
          :fontSize="fontSize"
          displayField="name"
          :sortField="sortField"
          label="Multi dropdown"
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
          label="Multi dropdown 2"
          :dataSize="dataSize"
          searchable
          primaryKey="id"
          :sortByAscending="true"
          :maxItemThreshold="maxItemThreshold"
          :hasActionBox="true" />
        <hr />
      </template>
    </MenuDropdown>

    <MenuDropdown
      :className="'flight'"
      :items="multiItems"
      primaryKey="id"
      displayField="name"
      actionField="func"
      directRight>
      <template #toggle>
        <SvgIcon name="mail" size="s" />
      </template>
    </MenuDropdown>
    <MenuDropdown
      :className="'hotel'"
      :items="multiItems"
      primaryKey="id"
      displayField="name"
      actionField="func"
      directRight>
      <template #toggle>
        <SvgIcon name="mail" size="s" />
      </template>
    </MenuDropdown>
  </div>
</template>

<script lang="ts">
import UIEnumDropdown from '../components/Dropdown/UIEnumDropdown.vue'
import UIDropdown from '../components/Dropdown/UIDropdown.vue'
import UIMultiDropdown from '../components/Dropdown/UIMultiDropdown.vue'
import EInternComponentType from '../enum/EInternComponentType'
import EInternSingleComponentType from '../enum/EInternSingleComponentType'
import MenuDropdown from '../components/Dropdown/MenuDropdown.vue'
export default {
  name: 'SummerLovers',
  components: {
    UIEnumDropdown,
    UIDropdown,
    UIMultiDropdown,
    MenuDropdown
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
          iconImage: 'arrow-right',
          name: 'Dog',
          detail: 'a'
        },
        {
          id: 1,
          iconImage: 'arrow-right',
          name: 'Cat',
          detail: 'b'
        },
        {
          id: 2,
          iconImage: 'arrow-right',
          name: 'Fish',
          detail: 'c'
        },
        {
          id: 3,
          iconImage: 'arrow-right',
          name: 'Bird',
          detail: 'd'
        },
        { id: 4, iconImage: '', name: 'Mouse', detail: 'c' },
        {
          id: 5,
          iconImage: '',
          name: 'Elephant',
          detail: 'd'
        },
        { id: 6, iconImage: '', name: 'Hawk', detail: 'c' },
        { id: 7, iconImage: '', name: 'Monkey', detail: 'a' }
      ],
      foods: [
        {
          id: 0,
          iconImage: 'arrow-right',
          name: 'Dog Food',
          detail: 'e'
        },
        { id: 1, iconImage: '', name: 'Cat Food', detail: 'f' },
        { id: 2, iconImage: '', name: 'Fish Food', detail: 'g' },
        { id: 3, iconImage: '', name: 'Bird Food', detail: 'h' }
      ],
      toys: [
        { id: 0, iconImage: '', name: 'Dog Toy', detail: 'k' },
        { id: 1, iconImage: '', name: 'Cat Toy', detail: 'l' },
        { id: 2, iconImage: '', name: 'Fish Toy', detail: 'm' },
        { id: 3, iconImage: '', name: 'Bird Toy', detail: 'n' }
      ],
      multiItems: [
        {
          id: 0,
          name: 'Dashboard',
          func: () => {
            window.alert('parent comp')
          }
        },
        {
          id: 1,
          name: 'Profile',
          func: () => {
            window.open('https://www.google.com')
          }
        },
        {
          id: 2,
          name: 'Exit',
          func: () => {
            window.open('/')
          }
        }
      ],
      multiItemsL: [
        { id: 0, name: 'Turkish', iconImage: 'mail' },
        { id: 1, name: 'English', iconImage: 'arrow-up' },
        { id: 2, name: 'Indian', iconImage: 'arrow-down' }
      ],
      items: [
        {
          id: 'THY',
          iconImage: 'arrow-right',
          name: 'Türk Hava Yolları',
          detail: 'o'
        },
        {
          id: 'PGS',
          iconImage: 'arrow-right',
          name: 'Pegasus',
          detail: 'p'
        },
        {
          id: 'SXD',
          iconImage: 'arrow-right',
          name: 'Sun Express',
          detail: 'r'
        },
        {
          id: 'CRL',
          iconImage: 'arrow-right',
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
        iconImage: 'arrow-right',
        name: 'Dog',
        detail: 'a'
      },
      selectedFood: {
        id: 0,
        iconImage: 'arrow-right',
        name: 'Dog Food',
        detail: 'e'
      },

      selectedToy: {
        id: 0,
        iconImage: '',
        name: 'Dog Toy',
        detail: 'k'
      },
      selectedItem: {
        id: 'THY',
        iconImage: 'arrow-right',
        name: 'Türk Hava Yolları',
        detail: 'o'
      },
      selectedPets: [
        {
          id: 0,
          iconImage: 'arrow-right',
          name: 'Dog',
          detail: 'a'
        },
        {
          id: 1,
          iconImage: 'arrow-right',
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
