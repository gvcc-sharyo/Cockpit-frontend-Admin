// import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { apiGet } from "../../../api/axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip as RechartsTooltip,
  Legend,
} from "chart.js";
// import { Box, Typography } from "@mui/material";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  RechartsTooltip,
  Legend
);

const Graph = () => {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  const adminId = localStorage.getItem("adminId");

  const fetchData = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const response = await apiGet(
        `/admin/getGraphData?adminId=${adminId}&year=${currentYear}`
      );
      const monthlyData = response.data.data.monthlyData;

      const labels = monthlyData.map((item) => item.monthName);
      const registeredUsers = monthlyData.map(
        (item) => item.totalRegisteredUsers
      );
      const subscribedUsers = monthlyData.map(
        (item) => item.totalSubscribedUsers
      );

      setChartData({
        labels,
        datasets: [
          {
            data: registeredUsers,
            borderColor: "#000000",
            backgroundColor: "#000000",
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            borderWidth: 2,
          },
          {
            data: subscribedUsers,
            borderColor: "#AEC7ED",
            backgroundColor: "#AEC7ED",
            borderDash: [5, 5],
            tension: 0.4,
            fill: false,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      });
    } catch (error) {
      console.error("Failed to load graph data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 🔧 Hide the legend
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6c757d" },
      },
      y: {
        grid: { color: "#f0f0f0" },
        ticks: {
          color: "#6c757d",
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  const data = [
    { label: "Registered", color: "#000" },
    { label: "Subscribed", color: "#AEC7ED" },
  ];

  const classes = {
    totalUsersBox: {
      width: {xs:"550px",md:"100%",},
      height: { xs: 300, md: "100%" ,lg:"42vh"},
      mt: 3,
      padding: "40px 0px",
      backgroundColor: "#fff",
     
      borderWidth: "1px",

      borderImageSource:
        "linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0.47%, #000000 100%)",
      borderImageSlice: 1,
     
      overflowX: { xs: "auto", md: "visible" },
      overflowY: { xs: "auto", md: "visible" },
    },

    userLegendRow: {
      display: { xs: "block", md: "flex" },
      gap: 4,
      ml: { xs: 2, md: 5 },
      alignItems: { xs: "flex-start", md: "center" },
    },
    legendTitle: {
      fontFamily: "Font Family",
      fontWeight: 600,
      fontSize: "16px",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: 1,
    },
    legendDot: {
      width: 10,
      height: 10,
      borderRadius: "50%",
    },
    legendLabel: {
      fontFamily: "Font Family",
      fontWeight: "Regular",
      fontSize: "14px",
    },
  };

  return (
    <Box
      sx={{
        
    
        backgroundColor: "#fff",
        borderRadius: 2,

       
        overflowX: { xs: "auto", md: "visible" },
        overflowY: { xs: "auto", md: "visible" },
      }}
    >
      {chartData && (
        <Box sx={classes.totalUsersBox}>
          <Box sx={classes.userLegendRow}>
            <Typography sx={classes.legendTitle}>Total Users</Typography>
            <Typography sx={{ display: { xs: "none", md: "block" } }}>
              |
            </Typography>

            {data.map((item, index) => (
              <Box key={index} sx={classes.legendItem}>
                <Box
                  sx={{
                    ...classes.legendDot,
                    backgroundColor: item.color,
                  }}
                />
                <Typography sx={classes.legendLabel}>{item.label}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ width: "100%", height: "100%", }}>
            <Box sx={{ minWidth: "100%", height: "100%", overflowX: "auto" }}>
              <Line data={chartData} options={options} ref={chartRef} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Graph;
