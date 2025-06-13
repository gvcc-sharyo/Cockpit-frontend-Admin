import React from "react";
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
} from "chart.js";
import './dashboard.css'
import { useState, useEffect } from "react";
import { apiGet } from "../../../api/axios";

function Dashboard() {
 const stats = [
  {
    title: "Total Users",
    number: 100,
    icon: (
      <img
        src="/images/users.svg"
        alt="Users"
        // style={{ width: "100%", height: "100%"}}
      />
    ),
  },
  {
    title: "Total Revenue",
    number: "₹20000",
    icon: (
      <img
        src="/images/revenue.svg"
        alt="Revenue"
        // style={{ width: "100%", height: "100%" }}
      />
    ),
  },
];


     const [institutes, setInstitutes] = useState([])
  
      const fetchInstitute = async () => {
          try {
              const response = await apiGet('/admin/getInstitute');
              setInstitutes(response.data.data);
          } catch (error) {
              console.error('Error fetching institutes:', error);
          }
      };
  
      useEffect(() => {
          fetchInstitute();
      }, [])

       const sampleData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Visits",
        data: [120, 190, 300, 500, 200, 300, 400],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
      },
    ],
  };
  const sampleOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#718096",
        },
      },
      y: {
        ticks: {
          color: "#718096",
        },
      },
    },
  };
  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Users",
        data: [100, 200, 300, 400, 500, 600, 700],
        backgroundColor: "rgba(72, 187, 120, 0.6)", // match success green tone
        borderRadius: 5,
      },
    ],
  };


  return (
    <>
      <Navbar title={"Dashboard"} >
 <Box sx={{ backgroundColor: '#f8f9fa'}}>
<Grid container spacing={2}>
  {stats.map(({ title, number, icon }) => (
    <Grid size={{ xs: 6, md: 3 }} key={title}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: { xs: 1, md: 1.5 }, // smaller padding
          borderRadius: 1,
          boxShadow: 1,
          bgcolor: "#fff",
          gap: { xs: 1, md: 2 },
          height: "100%",
          minHeight: { xs: 80, md: 100 }, // smaller box height
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "0.7rem", md: "0.8rem" },
              color: "text.secondary",
              lineHeight: 1.2,
            }}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.9rem", md: "1.1rem" },
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {number}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: 24, md: 32 },
            height: { xs: 24, md: 32 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      </Box>
    </Grid>
  ))}
</Grid>



      </Box>
      </Navbar>
    </>
  );
}

export default Dashboard;
