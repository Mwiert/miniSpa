<template>
    
    <button class="reisetech-btn" :class=" `reisetech-btn__${btnClassName}`" :disabled="isDisabled" v-if="!btnIsRouter">
    <span v-if="icon" class="icon" :class=" btnIcon"></span>
    <span v-if="isSpinnerActive" class="spinner"></span>
    <span v-else>{{ btnText }}</span>
    
  </button>
  <router-link  :to="routerUrl" class="reisetech-btn" :class=" `reisetech-btn__${btnClassName}`" replace="button" v-else>
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
  components: {},
  data() {
    return {
      btnClassName: this.className,
      btnText: this.text,
      btnIcon: this.icon,
      btnIsRouter: this.isRouter
    }
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {}
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

  

  &__router-link{
    background-color: $primary-color;
    border: none;
    color: white;
    &.outline {
      background-color: white;
      color: $primary-color;
      border: 2px solid $primary-color;
    }
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

  &:hover {
    background: $accent-primary-color;
    border: none;
    color: white;
  }
  
  
   
}

</style>
