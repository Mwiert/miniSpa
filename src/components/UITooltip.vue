<template>
  <div class="ui-tooltip-c">
    <div
      class="ui-tooltip-wrapper"
      :class="[`ui-tooltip-wrapper-${position}`, { vertical: isVertical }]">
      <div class="icon-container-hover" :class="{ vertical: isVertical }" v-if="isHover">
        <div @mouseover="openComponent = true" @mouseleave="openComponent = false">
          <slot></slot>
        </div>

        <div class="ui-tooltip-content-container" v-if="openComponent">
          <SvgIcon :name="icon" class="icon" v-if="icon" />
          <div class="label">{{ label }}</div>
        </div>
      </div>

      <div class="icon-container-click" :class="{ vertical: isVertical }" v-else>
        <div @click="toggleTooltip()">
          <slot></slot>
        </div>
        <div class="ui-tooltip-content-container" v-if="openComponent">
          <SvgIcon :name="icon" class="icon" v-if="icon" />
          <div class="label">{{ label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SvgIcon from './SvgIcon.vue'

export default {
  name: 'UITooltip',
  components: {
    SvgIcon
  },
  props: {
    position: { type: String, default: 'left' }, //Defines the position of the slot we are sending in, default is left so that the tooltip is on the right side of the icon
    type: { type: String, default: 'hover' }, //Defines the type of tooltip, default is hover and it can be click
    isOpen: { type: Boolean, default: false }, //Defines if the tooltip is open or not when type is click
    label: { type: String }, //Defines the label of the tooltip if exist
    icon: { type: String } //Defines the icon of the tooltip if exist
  },

  computed: {
    isHover() {
      return this.type === 'hover'
    },
    isVertical() {
      //Defines if the tooltip is vertical or not, important for defining the direction of the tooltip
      return this.position === 'top' || this.position === 'bottom'
    }
  },
  data() {
    return {
      openComponent: this.isOpen
    }
  },
  methods: {
    toggleTooltip() {
      this.openComponent = !this.openComponent
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-tooltip-c {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .ui-tooltip-wrapper {
    position: relative;
    display: flex;
    &.vertical {
      flex-direction: column;
    }
    .icon-container-hover {
      position: relative;
      display: flex;
      align-items: center;
      &.vertical {
        flex-direction: column;
      }

      .ui-tooltip-content-container {
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        background-color: #33b8ff;
        border-radius: 2px;
        height: 36px;
        width: fit-content;
        animation: fadeIn 0.2s ease-in-out;
        z-index: 9999;

        .icon {
          height: 16px;
          width: 16px;
          filter: brightness(0) invert(1);
        }
        .svg-icon-c {
          height: 16px;
          width: 16px;
          padding: 0;
          margin-left: 10px;
        }
        .label {
          padding: 8px;
          color: white;
          font-size: 12px;
          text-align: center;
          font-weight: 500;
        }

        &::before {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          border-style: solid;
        }
      }
    }

    .icon-container-click {
      position: relative;
      display: flex;
      align-items: center;
      &.vertical {
        flex-direction: column;
      }
      .ui-tooltip-content-container {
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        background-color: #33b8ff;
        border-radius: 2px;
        height: 36px;
        width: fit-content;
        animation: fadeIn 0.2s ease-in-out;
        z-index: 9999;

        .icon {
          height: 16px;
          width: 16px;
        }
        .svg-icon-c {
          height: 16px;
          width: 16px;
          padding: 0;
          margin-left: 10px;
        }

        .label {
          padding: 8px;
          color: white;
          font-size: 12px;
          text-align: center;
          font-weight: 500;
        }

        &::before {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          border-style: solid;
        }
      }
    }
  }

  .ui-tooltip-wrapper-right .ui-tooltip-content-container {
    left: calc(100% + 10px);
    &::before {
      top: 50%;
      left: -5px;
      transform: translateY(-50%);
      border-width: 10px 10px 10px 0;
      border-color: transparent #33b8ff transparent transparent;
    }
  }

  .ui-tooltip-wrapper-left .ui-tooltip-content-container {
    right: calc(100% + 10px);
    &::before {
      top: 50%;
      right: -5px;
      transform: translateY(-50%);
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent #33b8ff;
    }
  }

  .ui-tooltip-wrapper-bottom .ui-tooltip-content-container {
    top: calc(100% + 10px);
    &::before {
      top: -5px;
      left: 50%;
      transform: translateX(-50%);

      border-width: 0 10px 10px 10px;
      border-color: transparent transparent #33b8ff transparent;
    }
  }

  .ui-tooltip-wrapper-top .ui-tooltip-content-container {
    bottom: calc(100% + 10px);

    &::before {
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 10px 10px 0 10px;
      border-color: #33b8ff transparent transparent transparent;
    }
  }
}
</style>
