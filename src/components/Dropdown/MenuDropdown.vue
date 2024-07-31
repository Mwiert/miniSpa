<template>
  <div class="menu-dropdown-c">
    <div class="menu-dropdown-wrapper" @mouseleave="isOpen = false">
      <div class="menu-dropdown-toggle" @mouseover="isOpen = true">
        <slot name="toggle"></slot>
        <label v-if="label" class="menu-dropdown-label">{{ label }}</label>
        <SvgIcon class="svg-icon" :name="'arrow-down'" :size="'s'" />
      </div>
      <div v-if="isOpen" class="menu-dropdown-content-wrapper">
        <div  class="menu-dropdown-content" :class="{ active: isOpen }">
          <div class="slot-item">
            <slot></slot>
          </div>
          <div class="array-item">
            <div v-for="item in items" :key="item[primaryKey]" class="item" @click="item.func()">
              <SvgIcon :name="item.iconImage" :size="'s'" v-if="item.iconImage" />
              <span> {{ item[displayField] }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuDropdown',
  data() {
    return {
      isOpen: false
    }
  },
  props: {
    items: {
      type: Array,
      default: () => [{}]
    },
    primaryKey: {
      type: String,
      default: 'id'
    },
    displayField: {
      type: String,
      default: 'name'
    },
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    

  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variables.scss';
.menu-dropdown-c {
  display: inline-flex;

  .menu-dropdown-wrapper {
    .menu-dropdown-toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      background-color: white;
      border-left: 1px solid black;
      border-right: 1px solid black;
      padding: 0.5rem 1rem;
      .svg-icon {
        margin-left: 1rem;
      }
    }
    .menu-dropdown-content-wrapper {
      position: absolute;
      z-index: 99;
      top: 3.2rem;
      &::before {
        content: '';
        position: relative;
        top: -6px;
        left: 30px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid white;
        z-index: 999;
      }
      .menu-dropdown-content {
        background-color: white;
        border-radius: 1rem;
        padding-bottom: 1rem;
        box-shadow: 0 0 8px rgb(0, 0, 0);
        min-width: 180px;
        max-width: 360px;
        overflow-x: auto;

        .slot-item {
          > * {
            display: flex;
            flex-direction: column;
            margin: 0.5rem 0;
          }
        }
        .array-item {
          display: flex;
          flex-direction: column;
          .item {
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            cursor: pointer;
            font-size: 1rem;
            transition:
              background-color 0.5s ease,
              color 0.5s ease;
            &:hover {
              background-color: $accent-primary-color;
              color: white;
            }
          }
        }
      }
    }
  }
}
</style>
