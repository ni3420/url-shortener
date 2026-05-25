import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Clicks",
      data: [120, 210, 180, 300, 250, 400, 350],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.15)",
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 7,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#111827",
      padding: 10,
      cornerRadius: 10,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: "rgba(0,0,0,0.05)",
      },
    },
  },
};

const Chart = () => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 w-full h-96">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title">Click Analytics</h2>
          <div className="badge badge-primary badge-outline">Weekly</div>
        </div>

        <div className="h-full w-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Chart;