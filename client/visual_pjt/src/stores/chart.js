import { ref } from "vue";
import { defineStore } from "pinia";
import dataLap from "@/utils/api";

export const useChartStore = defineStore("chart", () => {
  const chartData = ref({
    labels: [],
    datasets: [
      {},
    ],
  });

  function setChartData(data) {
    chartData.value = data;
  }

  function makeColor() {
    return "#" + Math.round(Math.random() * 0xffffff).toString(16);
  }

  async function makeChart() {
    try {
      const response = await dataLap.get();

      const chartData = {
        labels: response.data[0].data.map((li) => li.period),
        datasets: response.data.reduce((acc, cur) => {
          const label = cur.title;
          const data = cur.data.map((li) => li.ratio);
          acc.push({
            label: label,
            data: data,
            fill: false,
            backgroundColor: makeColor(),
            borderColor: makeColor(),
            tension: 0.3,
          });
          return acc;
        }, []),
      };


      setChartData(chartData);
    } catch (error) {
      console.log(error);
    }
  }

  return { chartData, setChartData, makeChart };
});
