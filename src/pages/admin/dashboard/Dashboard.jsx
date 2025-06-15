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
          width={'130%'}
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
          width={'130%'}
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

  const classes = {
    statsBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      p: { xs: '5px', md: '5px' },
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
      fontSize: { xs: "0.8rem", md: "1.1rem" },
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
      <Navbar title={"Dashboard"} >
        <Box sx={{ backgroundColor: '#f8f9fa', p: 2 }}>
          <Grid container spacing={2}>
            {stats.map(({ title, number, icon }) => (
              <Grid size={{ xs: 6, md: 3, sm: 3 }} key={title}>
                <Box sx={classes.statsBox}>
                  <Box>
                    <Typography sx={classes.statTitle} gutterBottom>
                      {title}
                    </Typography>
                    <Typography sx={classes.statNumber}>
                      {number}
                    </Typography>
                  </Box>
                  <Box sx={classes.iconBox}>
                    {icon}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* New Report Box */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 10, md: 5, sm: 5 }}>
              <Box sx={classes.reportBox}>
                <Typography sx={classes.reportTitle}>Report</Typography>
                <Typography sx={classes.reportName}>John Doe</Typography>
                <Box sx={classes.reportLine}>
                  <Typography sx={classes.reportedText}>reported</Typography>
                  <Typography sx={classes.replyText}>reply</Typography>
                </Box>
              </Box>
            </Grid>
            {/* You can add more Grid items here if you want multiple reports */}
          </Grid>
        </Box>
      </Navbar>
    </>
  );
}

export default Dashboard;
