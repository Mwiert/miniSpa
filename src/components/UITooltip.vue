<template>
  <div class="ui-tooltip-c">
    <div class="ui-tooltip-wrapper" :class="`ui-tooltip-wrapper-${position}`">
      <div class="icon-container-hover" v-if="isHover">
        <SvgIcon :name="icon" :size="size" class="icon" />
        <div class="ui-tooltip-content-container">
          <div class="label">{{ label }}</div>
        </div>
      </div>
      <div class="icon-container-click" v-else>
        <SvgIcon :name="icon" :size="size" class="icon" @click="toggleTooltip()" />
        <div class="ui-tooltip-content-container" v-if="isClicked">
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
    icon: { type: String, default: '' },
    position: { type: String, default: '' },
    isHover: { type: Boolean, default: true },
    size: { type: String, default: '' },
    isOpen: { type: Boolean, default: false }
  },
  data() {
    return {
      isClicked: this.isOpen
    }
  },
  methods: {
    toggleTooltip() {
      this.isClicked = !this.isClicked
    }
  },
  created() {
    if (this.isOpen) {
      this.isClicked = true
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
      .icon {
        cursor: pointer;
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
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    &::before {
      top: 50%;
      right: -5px;
      transform: translateY(-50%);
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent #33b8ff;
    }
  }

  .ui-tooltip-wrapper-right .ui-tooltip-content-container {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    &::before {
      top: 50%;
      left: -5px;
      transform: translateY(-50%);
      border-width: 10px 10px 10px 0;
      border-color: transparent #33b8ff transparent transparent;
    }
  }

  .ui-tooltip-wrapper-left .ui-tooltip-content-container {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    &::before {
      top: 50%;
      right: -5px;
      transform: translateY(-50%);
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent #33b8ff;
    }
  }

  .ui-tooltip-wrapper-top .ui-tooltip-content-container {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    &::before {
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 10px 10px 0 10px;
      border-color: #33b8ff transparent transparent transparent;
    }
  }

  .ui-tooltip-wrapper-bottom .ui-tooltip-content-container {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
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
