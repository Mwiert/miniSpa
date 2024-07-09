<template>
  <button class="reisetech-btn"
    :class=" `reisetech-btn__${btnClassName}` "
    :disabled="isDisabled"
    @click="handleClick" v-if="!btnIsRouter"
  >
    <span v-if="icon && !isSpinnerActive" :class="['icon', btnIcon]"></span>
    <span v-if="isSpinnerActive" class="spinner"></span>
    <span v-else>{{ btnText }}</span>
    
  </button>
  <router-link  :to="routerUrl" class="reisetech-btn" :class=" `reisetech-btn__${btnClassName}`" role="button" replace="button" v-else>
    <span v-if="icon" class="icon" :class=" btnIcon"></span>
    <span v-if="isSpinnerActive" class="spinner"></span>
    <span v-else>{{ btnText }}</span>
    



  </router-link>
    
  
</template>

<script lang="ts">
export default {
  name: 'UIButton',
  props: {
    className: String,
    text: String,
    isRouter: Boolean,
    routerUrl: String,
    Object,
    icon: String,
    isSpinnerActive: Boolean,
    isDisabled: Boolean
  },
  data() {
    return {
      btnClassName: this.className,
      btnText: this.text,
      btnIcon: this.icon,
      btnIsRouter: this.isRouter
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';



.reisetech-btn {
  width: 100%;
  height: 48px;
  border-radius: 24px;
  font-size: 16px;
  background-color: transparent;
  border: 2px;
  color: black;
  cursor: pointer;
  display: flex;
  padding: $padding-medium;
  text-align: center;
  border: 2px solid black;
  justify-content: center;
  align-items: center;
  position: relative;
  text-decoration: none;
  
  
  
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
