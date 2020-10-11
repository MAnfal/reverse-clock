<template>
    <div class="card mt-5">
        <div class="card-header">
            Featured
        </div>

        <div class="card-body">
            <v-chart :options="scatter" :init-options="initOptions" autoresize />
        </div>
    </div>
</template>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import ScatterData from '../data/scatter';

export default {
    data() {
        return {
            scatter: ScatterData,
            initOptions: {
                renderer: 'canvas'
            },
        };
    },

    components: {
        'v-chart': ECharts
    },
}
</script>
