import React, { useRef } from "react";
import Navbar from "../../../components/admin/Navbar";
import { Box, Grid, Typography } from "@mui/material";
import InstituteTable from "../../../components/admin/InstituteTable";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./dashboard.css";
import { useState, useEffect } from "react";
import { apiGet } from "../../../api/axios";

function Dashboard() {
  ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
    Tooltip,
    Legend
  );
  const chartRef = useRef(null);

  const gradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(0,0,0,0.1)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    return gradient;
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sept","Oct","Nov","Dec"],
    datasets: [
      {
        label: "This year",
        data: [10000, 8000, 12000, 25000, 30000, 20000, 24000],
        borderColor: "#000",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          return gradient(ctx);
        },
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
      {
        label: "Last year",
        data: [5000, 12000, 18000, 10000, 15000, 22000, 30000],
        borderColor: "#93c5fd", 
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

 const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        color: "#000",
        font: { size: 14 },
      },
    
      onClick: () => {},              
      onHover: (evt) => {
        evt.native.target.style.cursor = "default";  
      },
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#a0aec0" } },
    y: {
      grid: { drawBorder: false, color: "#f0f0f0" },
      ticks: {
        color: "#a0aec0",
        callback: (v) => `${v / 1000}K`,
      },
    },
  },
};

  const stats = [
    {
      title: "Total Users",
      number: 100,
      icon: <img src="/images/users.svg" alt="Users" width={"130%"} />,
    },
    {
      title: "Total Revenue",
      number: "₹20000",
      icon: <img src="/images/revenue.svg" alt="Revenue" width={"130%"} />,
    },
  ];

  const [institutes, setInstitutes] = useState([]);

  const fetchInstitute = async () => {
    try {
      const response = await apiGet("/admin/getInstitute");
      setInstitutes(response.data.data);
    } catch (error) {
      console.error("Error fetching institutes:", error);
    }
  };

  useEffect(() => {
    fetchInstitute();
    getDashboardDetails();
  }, []);
  

  const [dashboardDetails,setDashboardDetails] = useState();
  
  const getDashboardDetails = async () => {
    try {
      const response = await apiGet("/subscription/getTotalRevenue?adminId=${adminId}");
      console.log(response);
      setDashboardDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching institutes:", error);
    }
  };



  const classes = {
    statsBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      p: { xs: "5px", md: "7px" },
      borderRadius: 1,
      boxShadow: 1,
      bgcolor: "#fff",
      gap: { xs: 1.5, md: 1 },
      height: "100%",
    },
    statTitle: {
      fontSize: { xs: "0.7rem", md: "0.8rem" },
      color: "text.secondary",
      lineHeight: 0.7,
    },
    statNumber: {
      fontSize: { xs: "0.8rem", md: "0.8rem" },
      fontWeight: 600,
      lineHeight: 1,
    },
    iconBox: {
      width: { xs: 24, md: 32 },
      height: { xs: 24, md: 32 },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    reportBox: {
      bgcolor: "#fff",
      borderRadius: 1,
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      p: 2,
      mt: 3,
      width: "100%",
    },
    reportTitle: {
      fontWeight: 600,
      fontSize: { xs: "1rem", md: "1.2rem" },
      mb: 1,
    },
    reportName: {
      fontWeight: "bold",
      fontSize: { xs: "0.9rem", md: "1rem" },
      mb: 0.5,
    },
    reportLine: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    reportedText: {
      color: "text.secondary",
      fontSize: { xs: "0.7rem", md: "0.8rem" },
    },
    replyText: {
      color: "orange",
      fontSize: { xs: "0.7rem", md: "0.8rem" },
      fontWeight: 600,
      cursor: "pointer",
    },
  };

  return (
    <>
      <Navbar title={"Dashboard"}>
        <Box sx={{ backgroundColor: "#f8f9fa", p: 2 }}>
          <Grid container spacing={2}>
            {stats.map(({ title, number, icon }) => (
              <Grid size={{ xs: 6, md: 6 }} key={title}>
                <Box sx={classes.statsBox}>
                  <Box>
                    <Typography sx={classes.statTitle} gutterBottom>
                      {title}
                    </Typography>
                    <Typography sx={classes.statNumber}>{number}</Typography>
                  </Box>
                  <Box sx={classes.iconBox}>{icon}</Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* New Report Box */}
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid size={{ xs: 10, md: 5.5 }}>
              <Box sx={classes.reportBox}>
                <Typography sx={classes.reportTitle}>Report</Typography>
                <Typography sx={classes.reportName}>User</Typography>
                <Box sx={classes.reportLine}>
                  <Typography sx={classes.reportedText}>reported</Typography>
                  <Typography sx={classes.replyText}>reply</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{mt:3}}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Box
                sx={{
                  width: "98%",
                  height: 350,
                  p: 2,
                  backgroundColor: "#fff",
                  borderRadius: 4,
                  boxShadow: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  Total Users
                </Typography>
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Line ref={chartRef} data={data} options={options} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Navbar>
    </>
  );
}

export default Dashboard;
