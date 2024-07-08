<template>
  <div class="app-page">
    <router-view>DENEMEs</router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MainPage',

  components: {},
  mixins: [],
  data() {
    return {
      status: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.status = false
    }, 3000)
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
span {
  background: white;
}
</style>
