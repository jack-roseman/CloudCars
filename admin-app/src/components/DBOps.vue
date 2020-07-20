<template>
  <div>
    <div class="partners">
      <!-- <h2>Partners</h2> -->
      <div v-for="partner in allPartners" :key="partner.id" class="partner">
        <h4>{{partner.name}}</h4>
        <ul>
          <li>ID: {{partner._id}}</li>
          <li>Address: {{partner.address.number}} {{partner.address.street}} {{partner.address.city}} {{partner.address.state}} {{partner.address.zip}}</li>
          <li>Services: {{partner.services.join(', ')}}</li>
          <li>Servicings: {{partner.numberOfServicings}}</li>
          <li>Employees: {{partner.numberOfEmployees}}</li>
          <li>Joined: {{partner.dateJoined}}</li>
        </ul>
      </div>
    </div>
    <div class="vehicles">
      <!-- <h2>Vehicles</h2> -->
      <div v-for="vehicle in allVehicles" :key="vehicle.id" class="vehicle">
        <h4>{{vehicle.owner}} {{vehicle.make}} {{vehicle.model}} {{vehicle.year}}</h4>
        <ul>
          <li>ID: {{vehicle._id}}</li>
          <li>Sanitary Status: {{vehicle.sanitaryStatus}}</li>
          <li>Last Address: {{vehicle.lastKnownAddress.number}} {{vehicle.lastKnownAddress.street}} {{vehicle.lastKnownAddress.city}} {{vehicle.lastKnownAddress.state}} {{vehicle.lastKnownAddress.zip}}</li>
          <li>Joined: {{vehicle.dateJoined}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DBOps",
  methods: {
    ...mapActions(["fetchPartners", "fetchVehicles"])
  },
  computed: mapGetters(["allPartners", "allVehicles"]),
  created() {
    this.fetchPartners();
    this.fetchVehicles();
  }
};
</script>

<style scoped>
ul {
  margin-left: 20px;
  margin-left: 20px;
}

.vehicles,
.partners {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

.vehicle,
.partner {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
</style>