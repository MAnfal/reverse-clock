<template>
  <div class="container-fluid mt-5" style="margin-bottom: 8rem;">
    <div class="form-row">
      <div class="col">
        <div class="card">
          <div class="card-header text-center">
            <h3>Your Information</h3>
          </div>

          <div class="card-body">
            <div class="row">
              <div class="col">
                <input type="number" min="1" class="form-control" placeholder="Age" v-model="age" />
              </div>

              <div class="col">
                <model-select :options="genderData" v-model="gender" placeholder="Gender" class="form-control" />
              </div>

              <div class="col">
                <model-select :options="countryData" v-model="selectedCountry" placeholder="Country" class="form-control" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="isDataReady">
      <div class="col-md-6 col-sm-12 mt-5">
        <div class="card">
            <div class="card-header text-center">
                <h3>Remaining Productive Life Ticker</h3>
            </div>

            <div class="card-body">
                <h5 class="text-center">{{ productiveCountDownString }}</h5>
            </div>
        </div>
      </div>

      <div class="col-md-6 col-sm-12 mt-5">
        <div class="card">
            <div class="card-header text-center">
                <h3>Remaining Life Ticker</h3>
            </div>

            <div class="card-body">
                <h5 class="text-center">{{ countDownString }}</h5>
            </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="isDataReady">
      <div class="col-md-6 col-sm-12">
        <bar-plot :data="ageExpectance" :trend-years="buffer" :country="selectedCountry.text" />
      </div>

      <div class="col-md-6 col-sm-12">
        <pie-plot :gender="gender.value" :expectedAge="expectedAge" @show-productive-ticker="handleProductiveTimeTicker" />
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
      ],

      countDownString: null,

      productiveCountDownString: null,

      ageLeftInterval: null,

      productiveAgeLeftInterval: null,
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
    },

    yearsLeft() {
      return this.expectedAge - this.age;
    }
  },

  watch: {
    isDataReady() {
      if (this.isDataReady) {
        if (this.ageLeftInterval) {
          clearInterval(this.ageLeftInterval);
        }

        this.ageLeftInterval = setInterval(() => {
          const currentDate = new Date();
          const deadline = new Date(`Jan 1, ${currentDate.getFullYear() + this.yearsLeft} 00:00:00`).getTime();
          const distance = deadline - currentDate.getTime();

          if (distance <= 0) {
            this.countDownString = 'You dead bro!!';
          } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.countDownString = `${ (days / 365).toFixed(2) } Years, ${ hours } Hours, ${ minutes } Minutes, ${ seconds } Seconds`;
          }
        }, 1000);
      }
    }
  },

  methods: {
    handleProductiveTimeTicker(yearsPercentage) {
        if (this.productiveAgeLeftInterval) {
          clearInterval(this.productiveAgeLeftInterval);
        }

        this.productiveAgeLeftInterval = setInterval(() => {
          const years = yearsPercentage * this.yearsLeft;
          console.log(years);
          const currentDate = new Date();
          const deadline = new Date(`Jan 1, ${currentDate.getFullYear() + years} 00:00:00`).getTime();
          const distance = deadline - currentDate.getTime();

          if (distance <= 0) {
            this.productiveCountDownString = 'You dead bro!!';
          } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.productiveCountDownString = `${ (days / 365).toFixed(2) } Years, ${ hours } Hours, ${ minutes } Minutes, ${ seconds } Seconds`;
          }
        }, 1000);
    }
  }
}
</script>
