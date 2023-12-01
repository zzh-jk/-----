<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: '本周内各模块使用情况'
        },
        xAxis: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['老年服务', '医疗诊断', '志愿服务', '外来活动', '智能语音']
        },
        series: [{
          name: '老年服务', itemStyle: {
            normal: {
              color: 'purple',
              lineStyle: {
                color: 'purple',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: [154, 164, 189, 266, 305, 411, 452],
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '医疗诊断',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }, {
          name: '志愿服务',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#0ecd69',
              lineStyle: {
                color: '#0ecd69',
                width: 2
              }
            }
          },
          data: [150, 160, 102, 89, 103, 120, 133],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }, {
          name: '外来活动',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: 'red',
              lineStyle: {
                color: 'red',
                width: 2
              }
            }
          },
          data: [410, 403, 361, 312, 300, 158, 41],
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }, {
          name: '智能语音',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: 'skyblue',
              lineStyle: {
                color: 'skyblue',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: [403, 361, 312, 300, 158, 41, 59],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
