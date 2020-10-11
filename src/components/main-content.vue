<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-md-12 text-center">
        <h3>Your information</h3>
      </div>
    </div>
    
    <div class="form-row">
      <div class="col">
        <input type="number" min="1" class="form-control" placeholder="Your Age" v-model="age">
      </div>

      <div class="col">
        <model-select :options="genderData" v-model="gender" placeholder="Select Your Gender" class="form-control" />
      </div>

      <div class="col">
        <model-select :options="countryData" v-model="selectedCountry" placeholder="Select Your Country" class="form-control" />
      </div>
    </div>

    <div class="row" v-if="isDataReady">
      <div class="col">
        <bar-plot :data="ageExpectance" :trend-years="buffer" :country="selectedCountry.text"/>
      </div>

      <div class="col">
        <pie-plot :gender="gender.value" :expectedAge="expectedAge" />
      </div>
    </div>
  </div>
</template>

<script>
import { ModelSelect } from 'vue-search-select';
import 'vue-search-select/dist/VueSearchSelect.css';
import CountryInformation from '../data/age-by-country.json';
import BarPlot from './plots/bar-plot.vue';
import PiePlot from './plots/pie-plot.vue';

export default {
  data() {
    return {
      selectedCountry: {
        value: null,
        text: null
      },

      age: null,

      buffer: 10,

      gender: {
        value: null,
        text: null
      },

      genderData: [
        {
          value: 'male',
          text: 'Male'
        },
        {
          value: 'female',
          text: 'Female'
        },
        {
          value: 'none',
          text: 'Preferred not to say'
        },
      ]
    };
  },

  components: {
    ModelSelect,
    BarPlot,
    PiePlot
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
      return this.selectedCountry.value && this.age && this.age > 0 && this.gender.value;
    },

    ageExpectance() {
      const data = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['Product'],
            ['Age'],
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: []
      };

      if (this.isDataReady) {
        const yearsInformation = CountryInformation[this.selectedCountry.value].yearly_data;
  
        Object.keys(yearsInformation).slice(-1 * this.buffer).forEach((year) => {
          data.series.push({ type: 'bar' });
  
          data.dataset.source[0].push(year);
  
          data.dataset.source[1].push(yearsInformation[year]);
        });
      }

      return data;
    },

    expectedAge() {
      const ageValues = Object.values(CountryInformation[this.selectedCountry.value].yearly_data);

      return ageValues[ageValues.length - 1]; 
    }
  },
}
</script>
