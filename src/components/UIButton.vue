<template> 
  <!-- btnIsRouter is checking for button has routing function-->
  <!-- If spinner is not active icon and text will be shown-->
    <button class="reisetech-btn" :class="`reisetech-btn__${btnClassName}`" :disabled="isDisabled"
      v-if="!btnIsRouter">
      <span v-if="icon && !isSpinnerActive" class="icon">
        <img :src="icon" alt="button icon">
      </span>
  
      <span v-if="isSpinnerActive" class="spinner"></span>
      <span v-else>{{ btnText }}</span>
  
    </button>
    <router-link :to="routerUrl" class="reisetech-btn" :class="`reisetech-btn__${btnClassName}`" replace="button" v-else>
      <span v-if="icon" class="icon" :class="btnIcon"></span>
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
      routerUrl: String,
      Object,
      // icon is the icons on the button if button has one
      icon: String,
      // isSpinner is checking loading animation for button exist or not
      isSpinnerActive: Boolean,
      // isDisabled is checking button is active or disabled
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
     
    }
  }
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/css/main.scss';
  // router-link takes tag 'a' and its default css should be overwritten
  a.reisetech-btn {
  padding:0px;
  }
  
  .reisetech-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
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
  
  .icon {
    display: inline-block;
    margin-right: 8px;
  
    img {
      width: 24px;
      height: 24px;
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
  
  