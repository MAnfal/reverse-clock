import { graphic } from 'echarts/lib/export'

const data = [
  [
    [28604, 77, 17096869, 'Australia', '1990']
  ]
]

export default {
  title: {
    text: '各国人均寿命与GDP对比'
  },
  legend: {
    right: 10,
    data: ['1990', '2015']
  },
  xAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
    scale: true
  },
  series: [
    {
      name: '1990',
      data: data[0],
      type: 'scatter',
      symbolSize (data) {
        return Math.sqrt(data[2]) / 5e2
      },
      label: {
        emphasis: {
          show: true,
          formatter ({ data }) {
            return data[3]
          },
          position: 'top'
        }
      },
      itemStyle: {
        normal: {
          shadowBlur: 10,
          shadowColor: 'rgba(120, 36, 50, 0.5)',
          shadowOffsetY: 5,
          color: new graphic.RadialGradient(0.4, 0.3, 1, [
            {
              offset: 0,
              color: 'rgb(251, 118, 123)'
            },
            {
              offset: 1,
              color: 'rgb(204, 46, 72)'
            }
          ])
        }
      }
    }   
  ]
}