<template>
  <div id="app">
    <div class="container">
      <AddVehicle />
      <DBOps />
    </div>
  </div>
</template>

<script>
import DBOps from "./components/DBOps.vue";
import AddVehicle from "./components/addVehicle.vue";

export default {
  name: "App",
  components: {
    DBOps,
    AddVehicle
  }
};
</script>

<style>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, Helvetica,
    sans-serif;
  line-height: 1.6;
  background: #e8f7f0;
}
.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}
</style>
