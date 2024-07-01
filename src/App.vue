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
  watch: {}
}

/*

Neler Anlatabiliriz ?


2.2 - Mert Aytaç
#Mert & Aytaç
#Css
#Html, Css,

# isimlendirmeler ve klasör hiyerarşisi
# camelCase, PascalCase, kebab-case




3.1 - Kadir
#options api basic
# mounted, computed, methods, watch, components, mixins, props
# template, script ve style --> ne işe yarar, nerede görülür, neden gereklidir.
# reactivity temeller
   Computed,
   Class and Styles bindings
   v-if, v-else, v-show, v-html, v-on, v-model, v-slot, v-for



3.2 - Mert
# typescript -->
  Interfaces, Type, import type, temel yazım kuralları
  dummyResponse --> .ts
  const response:Hotel[] = [
  {id:1},
  {id:2},
  {id:3},
  {id:4},
  ]

4.1 -> Aytaç & Kamil
  Props, Emit, vue-directives (custom), vue-filters,
  Store kullanımı

  Component --> Popup nedir nasıl kullanılır (v-click outside)

4.2 -> Toplu halde danışmanlık





*/
</script>

<style lang="scss" scoped>
span {
  background: white;
}
</style>
