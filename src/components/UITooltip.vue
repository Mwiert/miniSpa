<template>
  <div class="ui-tooltip-c">
    <div class="ui-tooltip-wrapper-right" v-if="position === 'right'">
      <SvgIcon :name="icon" :size="size" class="icon" />
      <div class="ui-tooltip-content-container">
        <div class="label">{{ label }}</div>
      </div>
    </div>
    <div class="ui-tooltip-wrapper-left" v-if="position === 'left'">
      <div class="ui-tooltip-content-container">
        <div class="label">{{ label }}</div>
      </div>
      <SvgIcon :name="icon" :size="size" />
    </div>
    <div class="ui-tooltip-wrapper-bottom" v-if="position === 'bottom'">
      <SvgIcon :name="icon" :size="size" class="icon" />
      <div class="ui-tooltip-content-container">
        <div class="label">{{ label }}</div>
      </div>
    </div>
    <div class="ui-tooltip-wrapper-top" v-if="position === 'top'">
      <div class="ui-tooltip-content-container">
        <div class="label">{{ label }}</div>
      </div>
      <SvgIcon :name="icon" :size="size" />
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
  .ui-tooltip-wrapper-right {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .ui-tooltip-content-container {
      height: 48px;
      width: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #33b8ff;
      border-radius: 4px;

      .label {
        padding: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
  .ui-tooltip-wrapper-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .ui-tooltip-content-container {
      height: 48px;
      width: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #33b8ff;
      border-radius: 4px;

      .label {
        padding: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
  .ui-tooltip-wrapper-bottom {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .ui-tooltip-content-container {
      height: 48px;
      width: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #33b8ff;
      border-radius: 4px;

      .label {
        padding: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
  .ui-tooltip-wrapper-left {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .ui-tooltip-content-container {
      height: 48px;
      width: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #33b8ff;
      border-radius: 4px;

      .label {
        padding: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
}
</style>
