<template>
  <Radar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { ref, toRefs, watch, defineComponent, h, PropType } from "vue";
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  Plugin,
  registerables,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  ...registerables
);

export default defineComponent({
  name: "RadarChart",
  components: {
    Radar,
  },
  props: {
    chartId: {
      type: String,
      default: "radar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "Song Keyword Score",
    },
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 250,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    emotion: {
      type: Array,
      default: () => {
        return [20, 20, 20, 20, 20, 20];
      },
    },
    emotion_avg: {
      type: Array,
      default: () => {
        return [20, 20, 20, 20, 20, 20];
      },
    },
  },
  computed: {
    chartData: {
      get() {
        var ret = {
          labels: [
            "신나는",
            "그루브한",
            "잔잔한",
            "몽환적인",
            "위로하는",
            "dd",
          ],
          datasets: [
            {
              label: "Your emotion",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              pointBackgroundColor: "rgba(255,99,132,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: this.emotion,
            },
            {
              label: "Avg",
              backgroundColor: "rgba(179,181,198,0.2)",
              borderColor: "rgba(179,181,198,1)",
              pointBackgroundColor: "rgba(179,181,198,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(179,181,198,1)",
              data: this.emotion_avg,
            },
          ],
        };
        return ret;
      },
      set() {},
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: false,
        maintainAspectRatio: false,
        scale: {
          r: {
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              beginAtZero: true,
              min: 0,
            },
          },
        },
      },
    };
  },
  /*setup(props, { emit }) {
    const myRef = ref(null);

    const chartData = {
      labels: ["신나는", "그루브한", "잔잔한", "몽환적인", "위로하는", "dd"],
      datasets: [
        {
          label: "Average",
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: props.emotion_avg,
        },
        {
          label: "Your emotion",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: props.emotion_avg,
        },
      ],
    };

    const chartOptions = {
      responsive: false,
      maintainAspectRatio: false,
      scale: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            beginAtZero: true,
            min: 0,
          },
        },
      },
    };

    const onEdit = toRefs(props).emotion;
    watch(onEdit, () => {
      console.log("Hello", myRef);
    });

    return () =>
      h(Radar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },*/
});
</script>
