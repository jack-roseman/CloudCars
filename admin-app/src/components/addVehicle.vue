<template>
  <div>
    <h3>Add Vehicle</h3>
    <div class="add">
      <form @submit="onSubmit">
        <input type="text" v-model="owner" placeholder="Owner" required />
        <input type="text" v-model="make" placeholder="Make, e.g. Chrysler" required />
        <input type="text" v-model="model" placeholder="Model, e.g. Pacifica" required />
        <input type="text" v-model="year" placeholder="Year" required />
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "AddVehicle",
  data() {
      return {
          owner: "", 
          make: "",
          model: "",
          year: ""
      }
  },
  methods: {
      ...mapActions(['newPartner', 'newVehicle']),
      onSubmit(e) {
          e.preventDefault();
          this.newVehicle(this.owner, this.make, this.model, this.year);
      }

  }
};
</script>

<style scoped>
form {
  display: flex;
}
input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}
input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
}
</style>