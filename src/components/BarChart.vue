<template>
  <Bar
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
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "Like Score",
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
      type: Object,
      default: () => {},
    },
    song_emotion: {
      type: Array,
      default: () => {
        return [65, 59, 90, 81, 56];
      },
    },
    backgroundColor: {
      type: Array,
      default: () => {
        return [
          "rgba(255, 99, 132, 0.1)",
          "rgba(255, 99, 132, 0.1)",
          "rgba(75, 192, 192, 0.1)",
          "rgba(75, 192, 192, 0.1)",
          "rgba(75, 192, 192, 0.1)",
          "rgba(75, 192, 192, 0.1)",
          "rgba(75, 192, 192, 0.1)",
        ];
      },
    },
    borderColor: {
      type: Array,
      default: () => {
        return [
          "rgb(255, 99, 132)",
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(75, 192, 192)",
          "rgb(75, 192, 192)",
          "rgb(75, 192, 192)",
          "rgb(75, 192, 192)",
        ];
      },
    },
  },
  computed: {
    chartData: {
      get() {
        var ret = {
          labels: ["신나는", "그루브한", "잔잔한", "몽환적인", "위로하는"],
          datasets: [
            {
              label: "",
              backgroundColor: this.backgroundColor,
              data: this.song_emotion,
              borderColor: this.borderColor,
              borderWidth: 1,
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
        plugins: {
          legend: {
            display: false,
          },
        },
        scale: {
          y: {
            suggestedMin: 0,
            ticks: {
              beginAtZero: false,
              min: 0,
            },
          },
        },
      },
    };
  },
};
</script>
