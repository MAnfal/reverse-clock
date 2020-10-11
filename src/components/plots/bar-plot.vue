<template>
    <div class="card">
        <div class="card-header">
            Age Trend For The Past {{ trendYears }} Years In {{ country }}
        </div>

        <div class="card-body">
            <v-chart
                :options="data"
                :init-options="initOptions"
                theme="ovilia-green"
                autoresize
            />
        </div>
    </div>
</template>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';

import 'echarts/lib/chart/bar';

export default {
    props: ['data', 'trendYears', 'country'],

    data() {
        return {
            initOptions: {
                renderer: 'canvas'
            }
        };
    },

    components: {
        'v-chart': ECharts
    },
}
</script>

<style scoped>
    .echarts {
        margin: 0 auto !important;
    }
</style>