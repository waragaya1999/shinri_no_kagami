import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, ChartData, CategoryScale, LinearScale, ChartOptions, TooltipItem, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement);

interface EmotionChartProps {
  expressions: Record<string, number>;
}

const EmotionChart: React.FC<EmotionChartProps> = ({ expressions }) => {
  const values = Object.values(expressions);
  const maxVal = Math.max(...values);
  const colors = values.map(val => val === maxVal ? 'rgba(255,0,0,0.4)' : 'rgba(75,192,192,0.4)');

  const data: ChartData<"bar", number[], string> = {
    labels: ["😐", "😊", "😭", "😠", "😱", "😥", "😲"],
    datasets: [
      {
        label: "Emotion",
        data: values,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.4', '1')),
        borderWidth: 1,
        barPercentage: 0.6, // 棒の横幅を細くする
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    scales: {
      x: {
        type: "category",
        ticks: {
          font: {
            size: 20, // ラベルの文字サイズを大きくする
          },
        },
      },
      y: {
        display: false,
        type: "linear",
        min: 0,
        max: 1,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) => {
            if (context.parsed.y !== null && context.parsed.y !== undefined) {
              return context.dataset.label + ": " + context.parsed.y.toFixed(4);
            }
            return "";
          },
        },
      },
    },
  };

  return (
  <div style={{width: '40%', height: '40%'}}> {/* 全体のサイズを小さくする */}

    <Bar data={data} options={options} />
  </div>
);
};

export default EmotionChart;