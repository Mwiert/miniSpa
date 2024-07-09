<template>
  <div>
    <!-- Single selection dropdown -->
    <div class="dropdown">
      <button
        @click="toggleDropdown"
        :class="{ 'dropdown-button-active': isOpen }"
        class="dropdown-button"
      >
        class="dropdown-button">
        {{ selectedAirline || 'Select an Airline' }}
        <span class="arrow"></span>
      </button>
      <div v-if="isOpen" class="dropdown-menu">
        <div
          v-for="airline in filteredAirlines"
          :key="airline"
          @click="selectAirline(airline)"
          class="dropdown-item"
        >
          {{ airline }}
        </div>
      </div>
    </div>

    <!--     Multiple selection dropdown 
    <div class="dropdown">
      <button @click="toggleMultiDropdown" class="dropdown-button">
        {{
          selectedAirlines.length > 0
            ? selectedAirlines.length + ' Airlines Selected'
            : 'Select Airlines'
        }}
        <span class="arrow">{{ isMultiOpen ? '▲' : '▼' }}</span>
      </button>
      <div v-if="isMultiOpen" class="dropdown-menu">
        <input
          type="text"
          v-model="multiSearchQuery"
          placeholder="Search Airlines..."
          class="dropdown-search"
        />
        <div
          v-for="airline in filteredMultiAirlines"
          :key="airline"
          @click="toggleMultiSelect(airline)"
          class="dropdown-item"
        >
          {{ airline }}
          <span v-if="selectedAirlines.includes(airline)" class="selected-dot">•</span>
        </div>
      </div>
    </div>
  </div>
</template> -->

    <script lang="ts">
      import { defineComponent, ref, computed } from 'vue'

      export default defineComponent({
        setup() {
          const airlines = ref<string[]>([
            'Turkish Airlines',
            'Anadolu Jet',
            'Sun Express',
            'Pegasus Europe',
            'Corendon EU'
          ])
          const selectedAirline = ref<string | null>(null)
          const selectedAirlines = ref<string[]>([])
          const isOpen = ref<boolean>(false)
          const isMultiOpen = ref<boolean>(false)
          const searchQuery = ref<string>('')
          const multiSearchQuery = ref<string>('')

          const filteredAirlines = computed(() =>
            airlines.value.filter((airline) =>
              airline.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
          )

          const filteredMultiAirlines = computed(() =>
            airlines.value.filter((airline) =>
              airline.toLowerCase().includes(multiSearchQuery.value.toLowerCase())
            )
          )

          const toggleDropdown = () => {
            isOpen.value = !isOpen.value
            isMultiOpen.value = false
          }

          const toggleMultiDropdown = () => {
            isMultiOpen.value = !isMultiOpen.value
            isOpen.value = false
          }

          const selectAirline = (airline: string) => {
            selectedAirline.value = airline
            isOpen.value = false
          }

          const toggleMultiSelect = (airline: string) => {
            if (selectedAirlines.value.includes(airline)) {
              selectedAirlines.value = selectedAirlines.value.filter((a) => a !== airline)
            } else {
              selectedAirlines.value.push(airline)
            }
          }

          return {
            airlines,
            selectedAirline,
            selectedAirlines,
            isOpen,
            isMultiOpen,
            searchQuery,
            multiSearchQuery,
            filteredAirlines,
            filteredMultiAirlines,
            toggleDropdown,
            toggleMultiDropdown,
            selectAirline,
            toggleMultiSelect
          }
        }
      })
    </script>

    <style scoped>
      .dropdown {
        position: relative;
        display: inline-block;
        margin: 10px;
      }

      .dropdown-button {
        padding: 10px;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
      }

      .dropdown-search {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
      }

      .dropdown-item {
        padding: 10px;
        cursor: pointer;
      }

      .dropdown-item:hover {
        background-color: #f3f3f3;
      }

      .arrow {
        margin-left: 10px;
      }

      .selected-dot {
        float: right;
        color: blue;
      }
    </style>
  </div>
</template>
