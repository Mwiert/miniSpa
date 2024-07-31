<template>
  <div class="menu-dropdown-c">
    <div class="menu-dropdown-wrapper" @mouseleave="isOpen = false">
      <div class="menu-dropdown-toggle" @mouseover="isOpen = true">
        <slot name="toggle"></slot>
        <SvgIcon class="svg-icon" :name="'arrow-down'" :size="'s'" />
      </div>
      <div v-if="isOpen" class="menu-dropdown-content" :class="{ active: isOpen }">
        <div class="slot-item">
          <slot></slot>
        </div>
        <hr />
        <div class="array-item">
          <div v-for="item in items" :key="item[primaryKey]" class="item" @click="item.func()">
            <span > {{ item[displayField] }} </span>
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
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.menu-dropdown-c {
  display: inline-flex;

  .menu-dropdown-wrapper {
    .menu-dropdown-toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      background-color: white;
      border-radius: 1rem;
      padding: 0.3rem 1rem;
      margin-bottom: 0.5rem;
      border: 1px solid black;
      .svg-icon {
        margin-left: 1rem;
      }
    }
    .menu-dropdown-content {
      &::before {
        content: '';
        position: absolute;
        top: -6px;
        left: 20px; // Adjust as needed
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid white;
      }
      position: absolute;
      background-color: white;
      border-radius: 1rem;
      padding-bottom: 1rem;
      z-index: 99999;
      box-shadow: 0 0 8px rgb(0, 0, 0);
      min-width: 120px;
      max-width: 360px;
      //overflow-x: auto;
      .slot-item {
        > * {
          display: flex;
          flex-direction: column;
          margin: 0.5rem 0;
          width: 100%;
        }
      }
      .array-item {
        display: flex;
        flex-direction: column;
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          cursor: pointer;
          font-size: 1rem;
          &:hover {
            background-color: #f0f0f0;
          }
        }
      }
      hr {
        margin: 0;
        border: 0;
        height: 1px;
        background-image: linear-gradient(
          to right,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.75),
          rgba(0, 0, 0, 0)
        );
      }
    }
  }
}
</style>
