<template>
    <div class="card mt-5">
        <div class="card-header">
            Your Life Image At A Glance
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

import 'echarts/lib/chart/pie';

import LifeStatsUtility from '../../utilities/life-stats';

import { startCase, toLower } from 'lodash';

export default {
    props: ['gender', 'expectedAge'],

    data() {
        return {
            initOptions: {
                renderer: 'canvas'
            },
        };
    },

    components: {
        'v-chart': ECharts
    },

    computed: {
        data() {
            const lifeInPrcentage = LifeStatsUtility.lifeInPercentage(this.gender);

            const internalData = {
                title: {},
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} Years'
                },
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    data: []
                },
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            Object.keys(lifeInPrcentage).forEach((item) => {
                const beautifulItem = startCase(toLower(item.replace("_", " ")));

                internalData.legend.data.push(beautifulItem);

                internalData.series[0].data.push({
                    value: parseFloat((lifeInPrcentage[item] * this.expectedAge).toFixed(2)),
                    name: beautifulItem
                });
            });

            return internalData;
        }
    }
}
</script>

<style scoped>
    .echarts {
        margin: 0 auto !important;
        width: 100%;
        height: 300px;
    }
</style>