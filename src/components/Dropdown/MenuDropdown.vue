<template>
  <div class="menu-dropdown-c">
    <div class="menu-dropdown-wrapper" @mouseleave="handleMouseLeave">
      <div class="menu-dropdown-toggle" @mouseover="handleMouseOver" @click="handleToggle">
        <slot name="toggle"></slot>
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
      isOpen: false,
      isClicked: false
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
    className: {
      type: String,
      default: 'flight'
    },
    directRight: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleMouseOver() {
      if (!this.isClicked) {
        this.isOpen = true
        this.windowOverflow()
      }
    },
    handleMouseLeave() {
      if (!this.isClicked) {
        this.isOpen = false
      }
    },
    handleToggle() {
      this.isClicked = !this.isClicked
      this.isOpen = this.isClicked
      if (this.isOpen) {
        this.windowOverflow()
        document.addEventListener('click', this.handleOutsideClick)
      } else {
        document.removeEventListener('click', this.handleOutsideClick)
      }
    },
    handleOutsideClick(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
        this.isClicked = false
        document.removeEventListener('click', this.handleOutsideClick)
      }
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleOutsideClick)
    },
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
        console.log(overflowRight, overflowDown)
        if (overflowRight < 0) {
          dropdown.classList.add('direct-left-wrapper')
          dropdownContent.classList.add('direct-left')
 
        }
        if (overflowDown < 0) {
          dropdown.classList.add('above')
          if(directRight || directLeft){
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
  position: relative;
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
        bottom: 100%;
        &::before {
          top: auto;
          bottom: -220px;
          border-top: 10px solid white;
          border-bottom: 0;
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
        box-shadow: 0 0 6px rgb(0, 0, 0);
        min-width: 240px;
        max-width: 360px;
        overflow-x: auto;
        overflow-y: hidden;

        &.direct-right {
          border-radius: 0 1rem 1rem 1rem;
          &.above {
            border-radius: 1rem 1rem 1rem 0;
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
            }
          }
        }
        &.flight {
          border: 1px solid $accent-primary-color;
          .item {
            color: #000000;
            &:hover {
              background-color: $accent-primary-color;
            }
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
            padding: 0.5rem 1rem;
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
