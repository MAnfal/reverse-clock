<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-md-12">
        <h3>Your information</h3>
      </div>
    </div>
    
    <div class="form-row">
      <div class="col">
        <input type="number" min="1" class="form-control" placeholder="Your Age" v-model="age">
      </div>
      <div class="col">
        <model-select :options="countryData" v-model="selectedCountry" placeholder="Select Your Country" class="form-control" />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <scatter-plot :data="ageExpectance" />
      </div>
    </div>
  </div>
</template>

<script>
import { ModelSelect } from 'vue-search-select';
import 'vue-search-select/dist/VueSearchSelect.css';
import CountryInformation from '../data/age-by-country.json';
import ScatterPlot from './scatter-plot.vue';

export default {
  data() {
    return {
      selectedCountry: {
        value: null,
        text: null
      },

      age: null,

      buffer: 10,
    };
  },

  components: {
    ModelSelect,
    ScatterPlot
  },

  computed: {
    countryData() {
      return Object.keys(CountryInformation).map((country) => { 
        return {
          value: country, 
          text: country
        };
      });
    },

    isDataReady() {
      return this.selectedCountry.value && this.age && this.age > 0;
    },

    ageExpectance() {
      const data = [];

      return data;
    }
  },
}
</script>
