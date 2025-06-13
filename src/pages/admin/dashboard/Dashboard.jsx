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
          width={'130%'}
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

  const classes = {
  statsBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: { xs: 1, md: 1.5 },
    borderRadius: 1,
    boxShadow: 1,
    bgcolor: "#fff",
    gap: { xs: 1.5, md: 2 },
    height: "100%",
    minHeight: { xs: 40, md: 70 },
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
};

  return (
    <>
      <Navbar title={"Dashboard"} >
        <Box sx={{ backgroundColor: '#f8f9fa' }}>
          <Grid container spacing={2}>
            {stats.map(({ title, number, icon }) => (
              <Grid item xs={6} md={3} key={title}>
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
        </Box>
      </Navbar>
    </>
  );
}

export default Dashboard;
