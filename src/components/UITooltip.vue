<template>
  <div class="ui-tooltip-c">
    <div class="ui-tooltip-wrapper" :class="`ui-tooltip-wrapper-${position}`">
      <div class="icon-container-hover" v-if="isHover">
        <SvgIcon :name="icon" :size="size" class="icon" />
        <div class="ui-tooltip-content-container">
          <div class="label">{{ label }}</div>
        </div>
      </div>
      <div class="icon-container-click" @click="toggleTooltip()" v-else>
        <SvgIcon :name="icon" :size="size" class="icon" />
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
      isClicked: this.isHover
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

  .ui-tooltip-wrapper {
    position: relative;

    .icon-container-hover {
      position: relative;
      display: flex;
      align-items: center;

      &:hover .ui-tooltip-content-container {
        display: flex;
        opacity: 1;
      }
      .ui-tooltip-content-container {
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        display: none;
        opacity: 0;
        position: absolute;
        background-color: #33b8ff;
        border-radius: 4px;
        height: 48px;
        width: fit-content;

        .label {
          padding: 8px;
          color: white;
          font-size: 12px;
          text-align: center;
          font-weight: 500;
        }
      }
    }
    .icon-container-click {
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;

      .ui-tooltip-content-container {
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        position: absolute;
        background-color: #33b8ff;
        border-radius: 4px;
        height: 48px;
        width: fit-content;

        .label {
          padding: 8px;
          color: white;
          font-size: 12px;
          text-align: center;
          font-weight: 500;
        }
      }
    }
  }

  .ui-tooltip-wrapper-right .ui-tooltip-content-container {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 95px;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-right: 10px solid #33b8ff;
      border-left: 10px solid transparent;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
  }

  .ui-tooltip-wrapper-left .ui-tooltip-content-container {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: -15px;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-right: 10px solid transparent;
      border-left: 10px solid #33b8ff;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
  }

  .ui-tooltip-wrapper-top .ui-tooltip-content-container {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    &::before {
      content: '';
      position: absolute;
      top: 53px;
      right: 40%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      border-top: 10px solid #33b8ff;
      border-bottom: 10px solid transparent;
    }
  }

  .ui-tooltip-wrapper-bottom .ui-tooltip-content-container {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    &::before {
      content: '';
      position: absolute;
      top: -5px;
      right: 40%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      border-top: 10px solid transparent;
      border-bottom: 10px solid #33b8ff;
    }
  }
}
</style>
