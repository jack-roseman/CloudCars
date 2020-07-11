<template>
  <div id="app">
    <DBOps />
  </div>
</template>

<script>
import DBOps from './components/DBOps.vue'

export default {
  name: 'App',
  components: {
    DBOps
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 2px;
}
</style>
