import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { format, startOfWeek, addDays } from "date-fns";
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
import { supabase } from "../config/supabaseConfig";

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
    labels: [],
    datasets: [
      {
        label: "Total Folder Uploads",
        data: [],
        borderColor: "rgba(54, 162, 235, 0.5)",
        fill: false,
      },
      {
        label: "Total File Uploads",
        data: [],
        borderColor: "rgba(255, 99, 132, 0.5)",
        fill: false,
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Aggregate data by date
  const aggregateDataByDate = (data) => {
    const groupedByDate = data.reduce((acc, { created_at }) => {
      const date = format(new Date(created_at), "yyyy-MM-dd");
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Fill in missing dates with 0 uploads
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endDate = addDays(startDate, 6);
    const dates = [];
    for (let i = 0; i <= 6; i++) {
      const date = format(addDays(startDate, i), "yyyy-MM-dd");
      dates.push({ x: date, y: groupedByDate[date] || 0 });
    }

    return dates;
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // Fetch folders data
      const { data: folders, error: foldersError } = await supabase
        .from("folders")
        .select("created_at")
        .gte(
          "created_at",
          format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd")
        )
        .lte(
          "created_at",
          format(
            addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 6),
            "yyyy-MM-dd"
          )
        )
        .order("created_at", { ascending: true });

      if (foldersError) throw foldersError;

      // Fetch files data
      const { data: files, error: filesError } = await supabase
        .from("files")
        .select("created_at")
        .gte(
          "created_at",
          format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd")
        )
        .lte(
          "created_at",
          format(
            addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 6),
            "yyyy-MM-dd"
          )
        )
        .order("created_at", { ascending: true });

      if (filesError) throw filesError;

      // Aggregate and update graph data
      const folderDataPoints = aggregateDataByDate(folders);
      const fileDataPoints = aggregateDataByDate(files);

      setGraphData((prevData) => ({
        ...prevData,
        labels: folderDataPoints.map((dp) => dp.x),
        datasets: [
          { ...prevData.datasets[0], data: folderDataPoints },
          { ...prevData.datasets[1], data: fileDataPoints },
        ],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    // Continuing from the previous code...
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "MMM dd, yyyy",
          displayFormats: {
            day: "MMM dd",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          source: "labels", // Ensure ticks align with our labels
          autoSkip: false, // Prevent skipping any date
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Uploads",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={graphData} options={options} />
    </div>
  );
};

export default UploadActivityGraph;
