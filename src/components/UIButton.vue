<template>
  <!-- If spinner is not active the icon and the text will be shown-->
  <div class="ui-button-c">
    <button
      class="reisetech-btn"
      :class="[`reisetech-btn__${className}`, size, isDisabled ? 'disabled' : '']"
      :disabled="isDisabled"
      @click="handleClick"
      v-if="routerUrl == ''">
      <!-- Icon's name should be the name of the .svg file. iconSize is default m in SvgIcon.vue file.-->
      <SvgIcon v-if="icon && !isSpinnerActive" :size="iconSize" :name="icon" class="icon" />
      <span v-if="isSpinnerActive" class="spinner"></span>
      <span v-else>{{ text }}</span>
    </button>
    <button
      class="reisetech-btn"
      :class="[`reisetech-btn__${className}`, size, isDisabled ? 'disabled' : '']"
      :disabled="isDisabled"
      @click="handlerUrl(routerUrl)"
      v-else>
      <!-- Icon's name should be the name of the .svg file-->
      <SvgIcon v-if="icon && !isSpinnerActive" :size="iconSize" :name="icon" class="icon" />
      <span v-if="isSpinnerActive" class="spinner"></span>
      <span v-else>{{ text }}</span>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UIButton',
  props: {
    id: {
      type: String,
      default: '',
      required: true
    },
    // Classes such as hotel and flight are derived from the .reisetech-btn class.
    className: {
      type: String,
      default: 'default'
    },
    // Text is the label of button
    text: {
      type: String,
      default: 'Button'
    },
    // routeUrl is the routing Url
    routerUrl: {
      type: [String, Object],
      default: ''
    },
    // icon is the icons on the button if button has one
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: String,
      default: '16px'
    },
    // isSpinner is checking loading animation for button exist or not
    isSpinnerActive: {
      type: Boolean,
      default: false
    },
    // isDisabled is checking button is active or disabled
    isDisabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'large'
    },
    modelValue: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      if (!this.isDisabled) {
        this.$emit('update:modelValue', !this.modelValue)
        this.$emit('button-click', this.id, !this.modelValue)

        if (this.routerUrl) {
          this.handlerUrl(this.routerUrl)
        }
      }
    },
    handlerUrl(url) {
      window.open(url, '_self')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';
$small: 12px;
$medium: 24px;
$large: 48px;
$flight-color-filter: invert(68%) sepia(10%) saturate(4826%) hue-rotate(182deg) brightness(99%)
  contrast(94%);

.ui-button-c {
  user-select: none;
  max-width: 400px;
  width: min-content;
  min-width: 200px;

  a.reisetech-btn {
    padding: 0px 10px !important; // Padding for router-link buttons
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
    text-decoration: none; // Removes underline from text

    // Styles for different button sizes
    &.small {
      height: $small;
    }

    &.medium {
      height: $medium;
    }

    &.large {
      height: $large;
    }

    &__default {
      border: 2px solid black;
      &:hover {
        background: $accent-primary-color;
        border: 2px solid $accent-primary-color;
        color: white;
        .icon {
          filter: brightness(100) invert(1); // Icon color filter on hover
        }
      }
      &.disabled {
        background: #e0e0e0;
        border: 2px solid #bdbdbd;
        color: #9e9e9e;
        cursor: not-allowed !important;
        opacity: 0.6;

        .icon {
          filter: brightness(100) invert(1);
        }
      }
    }

    &__flight {
      background-color: $primary-color;
      border: none;
      color: white;

      .icon {
        filter: brightness(100) invert(1);
      }

      &:hover {
        background: $accent-primary-color;
        border: none !important;
        color: white;
      }
      &.disabled {
        background: #e0e0e0;
        color: #9e9e9e;
        cursor: not-allowed;
        opacity: 0.6;
        border: none !important;
      }

      &.outline {
        background-color: white;
        color: $primary-color;
        border: 2px solid $primary-color;

        .icon {
          filter: brightness(100);
        }

        &:hover {
          background: $accent-primary-color;
          border: 2px solid $accent-primary-color;
          color: white;

          .icon {
            filter: brightness(100) invert(1);
          }
        }
        &.disabled {
          background: #e0e0e0;
          border: 2px solid #bdbdbd !important;
          color: #9e9e9e;
          cursor: not-allowed;
          opacity: 0.6;

          .icon {
            filter: brightness(100) invert(1);
          }
        }
      }
    }

    &__hotel {
      background-color: $secondary-color;
      border: none;
      color: white;

      .icon {
        filter: brightness(100) invert(1);
      }

      &:hover {
        background: $accent-primary-color;
        border: none !important;
        color: white;
      }
      &.disabled {
        background: #e0e0e0;
        color: #9e9e9e;
        cursor: not-allowed;
        opacity: 0.6;
        border: none !important;
      }
      &.outline {
        background-color: white;
        color: $secondary-color;
        border: 2px solid $secondary-color;

        .icon {
          filter: brightness(100);
        }

        &:hover {
          background: $accent-primary-color;
          border: 2px solid $accent-primary-color;
          color: white;

          .icon {
            filter: brightness(100) invert(1);
          }
        }
        &.disabled {
          background: #e0e0e0;
          border: 2px solid #bdbdbd !important;
          color: #9e9e9e;
          cursor: not-allowed;
          opacity: 0.6;
        }
      }
    }

    &__powerpuff-girls {
      background-color: #98029b;
      border: none;
      color: white;

      &:hover {
        background: $accent-primary-color;
        border: none !important;
        color: white;
      }
      &.disabled {
        background: #e0e0e0;
        color: #9e9e9e;
        cursor: not-allowed;
        opacity: 0.6;
      }

      &.outline {
        background-color: white;
        color: $primary-color;
        border: 2px solid #98029b;

        &:hover {
          background: $accent-primary-color;
          border: 2px solid $accent-primary-color;
          color: white;
        }
        &.disabled {
          background: #e0e0e0;
          border: 2px solid #bdbdbd !important;
          color: #9e9e9e;
          cursor: not-allowed;
          opacity: 0.6;

          .icon {
            filter: brightness(100) invert(1);
          }
        }
      }
    }

    &__pink-panthers {
      background-color: #f39fb1;
      border: none;
      color: white;

      &:hover {
        background: $accent-primary-color;
        border: none !important;
        color: white;
      }
      &.disabled {
        background: #e0e0e0;
        color: #9e9e9e;
        cursor: not-allowed;
        opacity: 0.6;
      }
      &.outline {
        background-color: white;
        color: $primary-color;
        border: 2px solid #f39fb1;

        &:hover {
          background: $accent-primary-color;
          border: 2px solid $accent-primary-color;
          color: white;
        }
        &.disabled {
          background: #e0e0e0;
          border: 2px solid #bdbdbd !important;
          color: #9e9e9e;
          cursor: not-allowed;
          opacity: 0.6;

          .icon {
            filter: brightness(100) invert(1);
          }
        }
      }
    }

    &__summer-lovers {
      background-color: #83d9e5;
      border: none;
      color: white;

      &:hover {
        background: $accent-primary-color;
        border: none !important;
        color: white;
      }
      &.disabled {
        background: #e0e0e0;
        color: #9e9e9e;
        cursor: not-allowed;
        opacity: 0.6;
      }

      &.outline {
        background-color: white;
        color: $primary-color;
        border: 2px solid #83d9e5;

        &:hover {
          background: $accent-primary-color;
          border: 2px solid $accent-primary-color;
          color: white;
        }
        &.disabled {
          background: #e0e0e0;
          border: 2px solid #bdbdbd !important;
          color: #9e9e9e;
          cursor: not-allowed;
          opacity: 0.6;

          .icon {
            filter: brightness(100) invert(1);
          }
        }
      }
    }

    &__time-benders {
      background-color: #8fbd8d;
      border: none;
      color: white;

      &:hover {
        background: $accent-primary-color;
        border: none !important;
        color: white;
      }
      &.disabled {
        background: #e0e0e0;
        color: #9e9e9e;
        cursor: not-allowed;
        opacity: 0.6;
      }

      &.outline {
        background-color: white;
        color: $primary-color;
        border: 2px solid #8fbd8d;

        &:hover {
          background: $accent-primary-color;
          border: 2px solid $accent-primary-color;
          color: white;
        }
        &.disabled {
          background: #e0e0e0;
          border: 2px solid #bdbdbd !important;
          color: #9e9e9e;
          cursor: not-allowed;
          opacity: 0.6;

          .icon {
            filter: brightness(100) invert(1);
          }
        }
      }
    }
  }

  .spinner {
    border: 4px solid rgba(58, 57, 57, 0.3);
    border-radius: 50%;
    border-top: 4px solid rgb(219, 219, 219);
    width: 24px;
    height: 24px;
    animation: spin 2s linear infinite; // Spinner animation
    position: absolute;
  }

  // Keyframes for spinner animation
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
