<template>
  <div class="ui-tooltip-c">
    <div class="ui-tooltip-wrapper" :class="`ui-tooltip-wrapper-${position}`">
      <div class="icon-container-hover" v-if="isHover">
        <div class="ui-tooltip-content-container">
          <SvgIcon :name="icon" :size="size" class="icon" v-if="icon" />
          <div class="label">{{ label }}</div>
        </div>
      </div>
      <div class="icon-container-click" v-else>
        <div class="ui-tooltip-content-container" v-if="isOpen">
          <SvgIcon :name="icon" :size="size" class="icon" v-if="icon" />
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
    label: { type: String, default: '' },
    icon: { type: String },
    position: { type: String, default: '' },
    type: { type: String, default: 'hover' },
    size: { type: String, default: '' },
    isOpen: { type: Boolean, default: false }
  },
  computed: {
    isHover() {
      return this.type === 'hover'
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-tooltip-c {
  height: auto;
  width: auto;
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

    .icon-container-hover {
      position: relative;
      display: flex;
      align-items: center;

      &:hover .ui-tooltip-content-container {
        display: flex;
        animation: fadeIn 0.2s ease-in-out;
      }

      .ui-tooltip-content-container {
        white-space: nowrap;
        display: none;
        align-items: center;
        justify-content: center;
        opacity: 1;
        position: absolute;
        background-color: #33b8ff;
        border-radius: 2px;
        height: 36px;
        width: fit-content;
        .icon {
          height: 16px;
          width: 16px;
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

        .icon {
          height: 16px;
          width: 16px;
        }
        .svg-icon-c {
          height: 16px;
          width: 16px;
          padding: 0;
          margin-left: 5px;
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
    right: 36px;
    &::before {
      top: 50%;
      right: -5px;
      transform: translateY(-50%);
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent #33b8ff;
    }
  }

  .ui-tooltip-wrapper-left .ui-tooltip-content-container {
    left: 5px;
    &::before {
      top: 50%;
      left: -5px;
      transform: translateY(-50%);
      border-width: 10px 10px 10px 0;
      border-color: transparent #33b8ff transparent transparent;
    }
  }

  .ui-tooltip-wrapper-top .ui-tooltip-content-container {
    bottom: 20px;
    right: -66px;
    &::before {
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 10px 10px 0 10px;
      border-color: #33b8ff transparent transparent transparent;
    }
  }

  .ui-tooltip-wrapper-bottom .ui-tooltip-content-container {
    top: 20px;
    right: -66px;
    &::before {
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 10px 10px 10px;
      border-color: transparent transparent #33b8ff transparent;
    }
  }
}
</style>
