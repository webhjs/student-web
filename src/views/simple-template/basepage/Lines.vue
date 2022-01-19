<!--
 * @Author: your name
 * @Date: 2021-02-22 10:53:23
 * @LastEditTime: 2021-08-06 14:10:27
 * @LastEditors: 金苏
 * @Description: In User Settings Edit
 * @FilePath: \vue-cms\src\views\home\index.vue
-->
<template>
  <div :id="id" style="width: 100%;height: 100%;" class="absolute"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    id: {
      type: String,
      default: "main"
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    data(newValue) {
      this.initOption(newValue);
    }
  },
  mounted() {
    const lineData = {};
    this.initMap(lineData);
    const element = document.querySelector(`#${this.id}`);
    let resizeTimer = null;
    const callback = () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(() => {
        // 重新适配屏幕
        this.myChart.resize();
      }, 100);
    };
    this.observer = new ResizeObserver(callback);
    this.observer.observe(element);
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.myChart.dispose();
  },
  methods: {
    option(line) {
      return {
        title: {
          text: ""
        },
        tooltip: {
          // formatter: function(params) {
          //   let str = "";
          //   params.forEach(item => {
          //     str += `<div style="color: #999;">${
          //       item.seriesName
          //     }: <span style="color:${item.seriesName === "错误消息" &&
          //       "#F56C6C"};">${item.axisValueLabel}</spann></div>`;
          //   });
          //   return str;
          // },
          trigger: "axis",
          axisPointer: {
            label: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 0
            }
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#5c6c7c"
          },
          padding: [10, 10],
          extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)"
        },
        legend: {
          data: ["订单数量", "成交订单"],
          bottom: "1%"
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        grid: {
          top: "5%",
          left: "3%",
          right: "4%",
          bottom: "11%",
          containLabel: true
        },
        xAxis: [
          {
            nameTextStyle: {
              color: "#556677"
            },
            type: "category",
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#DCE2E8"
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#556677"
              },
              fontSize: 12,
              margin: 15
            },
            boundaryGap: false,
            data: [
              "12-01",
              "12-02",
              "12-03",
              "12-04",
              "12-05",
              "12-06",
              "12-07"
            ]
          }
        ],
        yAxis: [
          {
            axisTick: {
              show: false
            },
            axisLine: {
              onZero: false,
              show: true,
              lineStyle: {
                color: "#DCE2E8"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#556677"
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "订单数量",
            type: "line",
            stack: "Total",
            areaStyle: {
            },
            emphasis: {
              focus: "series"
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "成交订单",
            type: "line",
            stack: "Total",
            areaStyle: {
            },
            emphasis: {
              focus: "series"
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ],
        color: ["#b2e0ff", "#ffd7dc"]
      };
    },
    // 初始化数据
    initOption(data) {
      this.myChart.setOption(this.option(data));
      this.myChart.hideLoading();
    },
    // 初始化echarts
    async initMap(data) {
      this.myChart = echarts.init(document.getElementById(this.id));
      this.myChart.showLoading();
      this.initOption(data);
    }
  }
};
</script>
