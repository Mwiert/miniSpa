<template>
  <!-- btnIsRouter is checking for button has routing function-->
  <!-- If spinner is not active the icon and the text will be shown-->
  <button class="reisetech-btn" :class="[`reisetech-btn__${btnClassName}`, size]" :disabled="isDisabled"
    v-if="!btnIsRouter">
    <!-- Icon's name should be the name of the .svg file. iconSize is default m in SvgIcon.vue file.-->
    <SvgIcon v-if="icon && !isSpinnerActive" :size="btnIconSize" :name="btnIcon" class="icon" />
    <span v-if="isSpinnerActive" class="spinner"></span>
    <span v-else>{{ btnText }}</span>

  </button>
  <router-link :to="routerUrl" class="reisetech-btn" :class="[`reisetech-btn__${btnClassName}`, size]" replace="button"
    v-else>
    <!-- Icon's name should be the name of the .svg file-->
    <SvgIcon v-if="icon && !isSpinnerActive" :size="btnIconSize" :name="icon" class="icon" />
    <span v-if="isSpinnerActive" class="spinner"></span>
    <span v-else>{{ btnText }}</span>
  </router-link>


</template>

<script lang="ts">
export default {
  name: 'UIButton',
  props: {
    // Classes such as hotel and flight are derived from the .reisetech-btn class.
    // .reisetech-btn class has the default css style, but the appearance of the button changes depending on the incoming flight and hotel class.
    className: String,
    // Text is the label of button
    text: String,
    // isRouter is checking the button is routing or not
    isRouter: Boolean,
    // routeUrl is the routing Url
    routerUrl: { type: String, Object },
    // icon is the icons on the button if button has one
    icon: String,
    iconSize: String,
    // isSpinner is checking loading animation for button exist or not
    isSpinnerActive: Boolean,
    // isDisabled is checking button is active or disabled
    isDisabled: Boolean,
    size: {
      type: String,
      default: 'large'
    }
  },
  data() {
    return {
      btnClassName: this.className,
      btnText: this.text,
      btnIcon: this.icon,
      btnIsRouter: this.isRouter,
      btnIconSize: this.iconSize
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';
$small: 12px;
$medium: 24px;
$large: 48px;

// router-link takes tag 'a' and its default css should be overwritten
a.reisetech-btn {
  padding: 0px;
}

.reisetech-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 24px;
  font-size: 16px;
  background-color: transparent;
  border: 2px;
  color: black;
  cursor: pointer;
  padding: $padding-medium;
  text-align: center;
  border: 2px solid black;
  position: relative;
  text-decoration: none;

  &.small {
    height: $small;
  }

  &.medium {
    height: $medium;
  }

  &.large {
    height: $large;
  }

  &__flight {
    background-color: $primary-color;
    border: none;
    color: white;

    &.outline {
      background-color: white;
      color: $primary-color;
      border: 2px solid $primary-color;
    }
  }

  &__hotel {
    background-color: $secondary-color;
    border: none;
    color: white;

    &.outline {
      background-color: white;
      color: $secondary-color;
      border: 2px solid $secondary-color;
    }

  }

  &__powerpuff-girls {
    background-color: #98029b;
    border: none;
    color: white;

    &.outline {
      background-color: white;
      color: $primary-color;
      border: 2px solid #98029b;
    }
  }

  &__pink-panthers {
    background-color: #F39FB1;
    border: none;
    color: white;

    &.outline {
      background-color: white;
      color: $primary-color;
      border: 2px solid #F39FB1;
    }
  }

  &__summer-lovers {
    background-color: #83d9e5;
    border: none;
    color: white;

    &.outline {
      background-color: white;
      color: $primary-color;
      border: 2px solid #83d9e5;
    }
  }

  &__time-benders {
    background-color: #8fbd8d;
    border: none;
    color: white;

    &.outline {
      background-color: white;
      color: $primary-color;
      border: 2px solid #8fbd8d;
    }
  }

  &:hover {
    background: $accent-primary-color;
    border: none;
    color: white;
  }

  &__disabled {
    background: #e0e0e0;
    border: 2px solid #bdbdbd;
    color: #9e9e9e;
    cursor: not-allowed;
    opacity: 0.6;

    &:hover {
      background: #e0e0e0;
      border: 2px solid #bdbdbd;
      color: #9e9e9e;
    }
  }
}

.spinner {
  border: 4px solid rgba(58, 57, 57, 0.3);
  border-radius: 50%;
  border-top: 4px solid rgb(219, 219, 219);
  width: 24px;
  height: 24px;
  animation: spin 2s linear infinite;
  position: absolute;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>