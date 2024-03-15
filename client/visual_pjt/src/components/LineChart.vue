<script setup>

import { Line } from "vue-chartjs";
import { ref } from "vue";
import { useChartStore } from "@/stores/chart.js";
const chartStore = useChartStore();

// 편하기 위해 차트 라이브러리 가져오기
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = ref({
  responsive: true,
});
</script>

<template>
  <!-- line이라는 component에게 내려줌(props), 데이터 등록 -->
  <Line id="my-chart-id" :options="chartOptions" :data="chartStore.chartData" />
</template>
