import axios from "axios";

const state = {
  partners: [],
  vehicles: []
};

const getters = {
  allPartners: (state) => state.partners,
  allVehicles: (state) => state.vehicles,
};

const actions = {
  async fetchPartners({commit}) {
    const response = await axios.get("http://cloudcars.herokuapp.com/partners");
    commit('setPartners', response.data.partners);
  },
  async fetchVehicles({commit}) {
    const response = await axios.get("http://cloudcars.herokuapp.com/vehicles");
    commit('setVehicles', response.data.vehicles);
  },
};

const mutations = {
    setPartners: (state, partners) => (state.partners = partners),
    setVehicles: (state, vehicles) => (state.vehicles = vehicles)
};

export default {
  state,
  getters,
  actions,
  mutations,
};
