import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { addDays, startOfDay, formatISO } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { supabase } from "../config/supabaseConfig"; // Ensure the path is correct

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const UploadActivityGraph = () => {
  const [graphData, setGraphData] = useState({
    datasets: [
      {
        label: "File Uploads",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1,
      },
      {
        label: "Folder Uploads",
        data: [],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        tension: 0.1,
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Here you would fetch your data. The following is a placeholder for the logic
      // For demonstration, let's use simulated data for file and folder uploads
      const fileActivities = [
        { date: "2023-01-01", count: 5 },
        { date: "2023-01-02", count: 3 },
        { date: "2023-01-03", count: 9 },
      ];
      const folderActivities = [
        { date: "2023-01-01", count: 2 },
        { date: "2023-01-02", count: 4 },
        { date: "2023-01-03", count: 1 },
      ];

      const fileDataPoints = fileActivities.flatMap((activity) =>
        createDataPoints(activity)
      );
      const folderDataPoints = folderActivities.flatMap((activity) =>
        createDataPoints(activity)
      );

      setGraphData({
        datasets: [
          { ...graphData.datasets[0], data: fileDataPoints },
          { ...graphData.datasets[1], data: folderDataPoints },
        ],
      });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const createDataPoints = (activity) => {
    const dayStart = startOfDay(new Date(activity.date));
    return [
      { x: formatISO(dayStart), y: 0 }, // Start of day at zero
      { x: formatISO(addDays(dayStart, 1)), y: activity.count }, // Total uploads for the day
    ];
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "MMM dd, yyyy",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Uploads",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    maintainAspectRatio: false,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="graph-container" style={{ width: "20vw", height: "70vh" }}>
      <Line data={graphData} options={options} />
    </div>
  );
};

export default UploadActivityGraph;
