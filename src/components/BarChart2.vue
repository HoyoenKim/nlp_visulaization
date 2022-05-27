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
  name: "BarChart2",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "Keyword Score",
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 100,
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
    dataList: {
      type: Number,
      default: 200,
    },
  },
  computed: {
    chartData: {
      get() {
        var ret = {
          labels: ["like", "avg"],
          datasets: [
            {
              axis: "y",
              label: "",
              backgroundColor: "#56A5EC",
              data: [this.dataList, 6800],
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: ["rgb(75, 192, 192)", "rgb(54, 162, 235)"],
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
        indexAxis: "y",
        responsive: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
};
</script>
