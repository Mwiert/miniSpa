<template>
  <div class="ui-tooltip-c">
    <div class="ui-tooltip-wrapper" :class="`ui-tooltip-wrapper-${position}`">
      <div class="icon-container">
        <SvgIcon :name="icon" :size="size" class="icon" />
        <div class="ui-tooltip-content-container">
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
    size: { type: String, default: '' }
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

    .icon-container {
      position: relative;
      display: flex;
      align-items: center;

      &:hover .ui-tooltip-content-container {
        visibility: visible;
        opacity: 1;
      }

      .ui-tooltip-content-container {
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.2s;
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
  }

  .ui-tooltip-wrapper-left .ui-tooltip-content-container {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  .ui-tooltip-wrapper-top .ui-tooltip-content-container {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .ui-tooltip-wrapper-bottom .ui-tooltip-content-container {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
