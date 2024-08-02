<template>
  <div class="menu-dropdown-c">
    <div class="menu-dropdown-wrapper" @mouseleave="handleMouseLeave">
      <div
        :class="['menu-dropdown-toggle', `${className}-background`]"
        @mouseover="handleMouseOver"
        @click="handleToggle">
        <slot name="labelSlot"></slot>
        <label v-if="label" class="menu-dropdown-label">{{ label }}</label>
        <SvgIcon v-if="!directRight" class="svg-icon" :name="'arrow-down'" :size="'s'" />
      </div>
      <div
        v-if="isOpen"
        :class="['menu-dropdown-content-wrapper', { 'direct-right-wrapper': directRight }]">
        <div :class="['menu-dropdown-content', { 'direct-right': directRight }, className]">
          <div class="slot-item">
            <slot></slot>
          </div>
          <div class="array-item">
            <div
              v-for="item in items"
              :key="item[primaryKey]"
              class="item"
              @click="item[actionField]">
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
    },
    actionField: {
      type: String,
      default: 'action'
    },
    //styling color - hotel,flight
    className: {
      type: String,
      default: ''
    },
    //if the dropdown opens to the right

    directRight: {
      type: Boolean,
      default: false
    },
    openOnClick: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * Method triggered when mouse hovers over the dropdown toggle.
     * Opens the dropdown if it's not already clicked.
     */
    handleMouseOver() {
      if (!this.openOnClick) {
        this.isOpen = true
        this.windowOverflow()
      }
    },
    /**
     * Method triggered when mouse leaves the dropdown area.
     * Closes the dropdown if it's not already clicked.
     */
    handleMouseLeave() {
      if (!this.openOnClick) {
        this.isOpen = false
      }
    },
    /**
     * Method triggered when the dropdown toggle is clicked.
     * Toggles the state of the dropdown (open/close) and sets up a click listener
     * to close the dropdown if clicked outside.
     */
    handleToggle() {
      if (this.openOnClick) {
        this.isOpen = !this.isOpen
        if (this.isOpen) {
          this.windowOverflow()
          document.addEventListener('click', this.handleOutsideClick)
        } else {
          document.removeEventListener('click', this.handleOutsideClick)
        }
      }
    },
    handleOutsideClick(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
        document.removeEventListener('click', this.handleOutsideClick)
      }
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleOutsideClick)
    },
    /**
     * Method to adjust the dropdown position if it overflows the window boundaries.
     * Checks if the dropdown content exceeds the viewport size and adjusts its position accordingly.
     */
    windowOverflow() {
      this.$nextTick(() => {
        const dropdown = this.$el.querySelector('.menu-dropdown-content-wrapper')
        const dropdownContent = this.$el.querySelector('.menu-dropdown-content')
        const directRight = this.$el.querySelector('.direct-right')
        const directLeft = this.$el.querySelector('.direct-left')
        const dropdownRect = dropdown.getBoundingClientRect()
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const overflowRight = windowWidth - dropdownRect.right
        const overflowDown = windowHeight - dropdownRect.bottom
        console.log(dropdownRect.right, windowWidth)
        if (overflowRight < 0) {
          dropdown.classList.add('direct-left-wrapper')
          dropdownContent.classList.add('direct-left')
        }
        if (overflowDown < 0) {
          dropdown.classList.add('above')
          if (directRight || directLeft) {
            dropdown.classList.add('direct-r-above')
            directRight.classList.add('above')
            directLeft?.classList.add('above')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variables.scss';

@keyframes dropdownAnimation {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes droprightAnimation {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.menu-dropdown-c {
  margin: 5px;
  position: relative;
  display: inline-flex;
  .menu-dropdown-wrapper {
    user-select: none;
    .menu-dropdown-toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      background-color: white;
      padding: 0.5rem 1rem;
      .menu-dropdown-label {
        cursor: pointer;
      }
      &.flight-background {
        background-color: $primary-color;
        border-color: $primary-color;
        .menu-dropdown-label,
        .svg-icon {
          color: rgb(255, 255, 255);
          fill: white;
        }
      }

      &.hotel-background {
        background-color: $secondary-color;
        border-color: $secondary-color;
        .menu-dropdown-label,
        .svg-icon {
          color: rgb(0, 0, 0);
          fill: white;
        }
      }

      .svg-icon {
        margin-left: 1rem;
      }
    }

    .menu-dropdown-content-wrapper {
      position: absolute;
      z-index: 99;
      top: 70%;
      bottom: auto;
      margin: 0.5rem 0;

      animation: dropdownAnimation 0.3s ease-out;

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

      &.above {
        top: auto;
        bottom: 70%;
        &::before {
          display: none;
        }
        &::after {
          content: '';
          position: relative;
          top: 6px;
          left: 30px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid white;
          z-index: 999;
        }
      }
      &.direct-right-wrapper {
        animation: droprightAnimation 0.3s ease-out;
        position: absolute;
        top: 0;
        left: 100%;

        margin: 0;
        &::before {
          display: none;
        }
        &::after {
          display: none;
        }
        &.hotel {
          background-color: $secondary-color;
        }
        &.flight {
          background-color: $primary-color;
        }
      }
      &.direct-left-wrapper {
        right: 100%;
        left: auto;
      }
      &.direct-r-above {
        top: auto;
        bottom: 0%;
      }

      .menu-dropdown-content {
        background-color: white;
        border-radius: 1rem;
        padding-bottom: 1rem;
        padding-top: 1rem;
        box-shadow: 0 0 2px rgb(0, 0, 0);
        min-width: 240px;
        max-width: 360px;
        overflow-x: auto;
        overflow-y: hidden;

        &.direct-right {
          border-radius: 0 1rem 1rem 1rem;
          padding-bottom: 0;
          padding-top: 0;
          &.above {
            border-radius: 1rem 1rem 1rem 0;
          }

          &.hotel {
            background-color: $secondary-color;
            .item {
              color: #ffffff;
              &:hover {
                background-color: $accent-secondary-color;
                color: white;
              }
            }
          }
          &.flight {
            background-color: $primary-color;
            .item {
              color: #ffffff;
              &:hover {
                background-color: $accent-primary-color;
                color: white;
              }
            }
          }
        }
        &.hotel {
          border: 1px solid $secondary-color;
          .item {
            color: #000000;
            &:hover {
              background-color: $secondary-color;
              color: white;
            }
          }
        }
        &.flight {
          border: 1px solid $primary-color;
          .item {
            color: #000000;
            &:hover {
              background-color: $primary-color;
              color: white;
            }
          }
        }

        &.direct-left {
          border-radius: 1rem 0 1rem 1rem;
          &.above {
            border-radius: 1rem 1rem 0 1rem;
          }
        }

        &.hotel {
          border: 1px solid $secondary-color;
          .item {
            color: #000000;
            &:hover {
              background-color: $secondary-color;
              color: white;
            }
          }
        }
        &.flight {
          border: 1px solid $primary-color;
          .item {
            color: #000000;
            &:hover {
              background-color: $primary-color;
              color: white;
            }
          }
        }
        .item {
          color: #000000;
          &:hover {
            background-color: $accent-primary-color;
            color: white;
          }
        }

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
            padding: 0.8rem 1rem;
            cursor: pointer;
            font-size: 1rem;
            transition:
              background-color 0.5s ease,
              color 0.5s ease;
          }
        }
      }
    }
  }
}
</style>
