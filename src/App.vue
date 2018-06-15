<template>
  <div id="app">
    <MenuMiTouchStandard/>
  </div>
</template>

<script>
import MenuMiTouchStandard from './components/mt-menu.vue'

export default {
  name: 'app',
  components: {
      MenuMiTouchStandard
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
