<template>
  <div class="power-puff-girls-c">
    <img class="ppg-image" :src="ppg" width="400" height="225" />
    <div class="team-header" @click="visibility = !visibility">
      <span class="header-text"> PowerPuffGirls Team </span>
    </div>
    <div class="components" v-if="visibility">
      <div class="components-header">Components</div>
      <ul class="components-list">
        <li v-for="(comp, index) in comps" :key="index">{{ comp.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import image from '../assets/images/powerpuffgirls.jpg'
export default {
  name: 'PowerPuffGirls',
  props: {},
  components: {},
  data() {
    return {
      ppg: image,
      visibility: false,
      comps: [
        { name: 'Button' },
        { name: 'Input' },
        { name: 'Toggle Switch' },
        { name: 'Checkbox' },
        { name: 'Radio Button' },
        { name: 'Text Area' }
      ]
    }
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.power-puff-girls-c {
  display: flex;
  flex-direction: column;
  align-items: center;
  .ppg-image {
    margin-bottom: 1rem;
  }
  .team-header {
    display: flex;
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;
    background: pink;
    box-shadow: rgba(218, 216, 216, 0.4) 1px 3px 5px;
    user-select: none;
    &:hover {
      cursor: pointer;
    }
    .header-text {
      color: white;
    }
  }
  .components {
    .components-header {
      display: flex;
      justify-content: center;
    }
    .components-list {
    }
  }
}
</style>
