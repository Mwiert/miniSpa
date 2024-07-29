<template>
  <div class="app-page">
    <router-view></router-view>
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
  watch: {
    $route: {
      handler: function (route) {
        if (route.name == 'FlexiTablePage') {
          document.body.style.margin = '2rem'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  background: white;
}
</style>
