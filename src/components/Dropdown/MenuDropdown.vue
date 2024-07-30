<template>
  <div class="menu-dropdown-c">
    <div class="menu-dropdown-wrapper" @mouseleave="isOpen = false">
      <div class="menu-dropdown-toggle" @mouseover="isOpen = true">
        <slot name="toggle"></slot>
        <SvgIcon class="svg-icon" :name="'arrow-down'" :size="'s'" />
      </div>
      <div v-if="isOpen" class="menu-dropdown-content" :class="{ active: isOpen }">
        <div class="slot-item">
          <slot :childClick="childClick"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuDropdown',
  methods: {
    childClick() {
      window.alert('child click')
    },
  },
  data() {
    return {
      isOpen: {
        type: Boolean,
        default: false
      }
    }
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
      margin-bottom: 0.3rem;
      border: 1px solid black;
        .svg-icon {
            margin-left: 1rem;
        }
    }
    .menu-dropdown-content {
      position: absolute;
      background-color: white;
      border-radius: 1rem;
      padding: 1rem;
      z-index: 99999;
      border: 1px solid black;
      .slot-item {
        > * {
          display: flex;
          flex-direction: column;
          margin: 0.5rem 0;
          width: 100%;
        }
      }
    }
  }
}
</style>
