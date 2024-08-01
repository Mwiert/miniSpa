<template>
  <div class="ui-tooltip-c">
    <div class="ui-wrapper">
      <div
        class="ui-tooltip-hover"
        :class="{ vertical: isVertical }"
        v-if="isHover && position === 'bottom'">
        <div @mouseover="openComponent = true" @mouseleave="openComponent = false">
          <slot></slot>
        </div>
        <div
          class="ui-tooltip-content"
          :class="[{ active: openComponent }, position]"
          v-if="openComponent">
          <SvgIcon v-if="icon" class="icon" />
          <div>{{ label }}</div>
        </div>
      </div>
      <div
        class="ui-tooltip-hover"
        :class="{ vertical: isVertical }"
        v-if="isHover && position === 'top'">
        <div @mouseover="openComponent = true" @mouseleave="openComponent = false">
          <slot></slot>
        </div>
        <div
          class="ui-tooltip-content"
          :class="[{ active: openComponent }, position]"
          v-if="openComponent">
          <SvgIcon v-if="icon" class="icon" />
          <div>{{ label }}</div>
        </div>
      </div>
      <div
        class="ui-tooltip-hover"
        :class="{ vertical: isVertical }"
        v-if="isHover && position === 'right'">
        <div @mouseover="openComponent = true" @mouseleave="openComponent = false">
          <slot></slot>
        </div>
        <div
          class="ui-tooltip-content"
          :class="[{ active: openComponent }, position]"
          v-if="openComponent">
          <SvgIcon v-if="icon" class="icon" />
          <div>{{ label }}</div>
        </div>
      </div>
      <div
        class="ui-tooltip-hover"
        :class="{ vertical: isVertical }"
        v-if="isHover && position === 'left'">
        <div @mouseover="openComponent = true" @mouseleave="openComponent = false">
          <slot></slot>
        </div>
        <div
          class="ui-tooltip-content"
          :class="[{ active: openComponent }, position]"
          v-if="openComponent">
          <SvgIcon v-if="icon" class="icon" />
          <div>{{ label }}</div>
        </div>
      </div>
      <div
        class="ui-tooltip-click"
        :class="{ vertical: isVertical }"
        v-if="!isHover && position === 'top'">
        <div @click="toggleTooltip()">
          <slot></slot>
        </div>
        <div
          class="ui-tooltip-content"
          :class="[{ active: openComponent }, position]"
          v-if="openComponent">
          <SvgIcon v-if="icon" class="icon" />
          <div>{{ label }}</div>
        </div>
      </div>
      <div
        class="ui-tooltip-click"
        :class="{ vertical: isVertical }"
        v-if="!isHover && position === 'bottom'">
        <div
          class="ui-tooltip-content"
          :class="[{ active: openComponent }, position]"
          v-if="openComponent">
          <SvgIcon v-if="icon" class="icon" />
          <div>{{ label }}</div>
        </div>
        <div @click="toggleTooltip()">
          <slot></slot>
        </div>
      </div>
      <div
        class="ui-tooltip-click"
        :class="{ vertical: isVertical }"
        v-if="!isHover && position === 'left'">
        <div @click="toggleTooltip()">
          <slot></slot>
        </div>
        <div
          class="ui-tooltip-content"
          :class="[{ active: openComponent }, position]"
          v-if="openComponent">
          <SvgIcon v-if="icon" class="icon" />
          <div>{{ label }}</div>
        </div>
      </div>
      <div
        class="ui-tooltip-click"
        :class="{ vertical: isVertical }"
        v-if="!isHover && position === 'right'">
        <div
          class="ui-tooltip-content"
          :class="[{ active: openComponent }, position]"
          v-if="openComponent">
          <SvgIcon v-if="icon" class="icon" />
          <div>{{ label }}</div>
        </div>
        <div @click="toggleTooltip()">
          <slot></slot>
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
      return this.type.toLowerCase() === 'hover'
    },
    isVertical() {
      return this.position.toLowerCase() === 'top' || this.position.toLowerCase() === 'bottom'
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
  justify-content: center;
  align-items: center;
  position: relative;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .ui-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    .ui-tooltip-hover,
    .ui-tooltip-click {
      display: flex;
      justify-content: center;
      align-items: center;

      &.vertical {
        flex-direction: column;
      }

      .ui-tooltip-content {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #33b8ff;
        border-radius: 2px;
        padding: 8px;
        height: 28px;
        width: fit-content;
        position: relative;

        &.active {
          animation: fadeIn 0.2s ease-in-out;
        }

        &.left::before,
        &.right::before,
        &.top::before,
        &.bottom::before {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          border-style: solid;
        }

        &.left::before {
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 12px 12px 12px 0;
          border-color: transparent #33b8ff transparent transparent;
        }

        &.right::before {
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 12px 0 12px 12px;
          border-color: transparent transparent transparent #33b8ff;
        }

        &.bottom::before {
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 12px 12px 0 12px;
          border-color: #33b8ff transparent transparent transparent;
        }

        &.top::before {
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 12px 12px 12px;
          border-color: transparent transparent #33b8ff transparent;
        }
      }
    }
  }
}
</style>
