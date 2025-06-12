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
      title: "Total Institutions",
      number: 10,
      icon: <img src="/public/images/institute.svg" alt="" />
    },
    {
      title: "Total Users",
      number: 100,
      icon:<img src="/public/images/users.svg" alt="" />
    },
    {
      title: "Total Revenue",
      number: "₹20000",
      icon: <img src="/public/images/revenue.svg" alt="" />
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
      <Navbar title={"Dashboard"} />
      {/* <Box sx={{ p: 3, position: "relative" , backgroundColor: '#f8f9fa'}} mt={-65} ml={40}>
        <Grid container spacing={5}>
          {stats.map(({ title, number, icon }) => (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding:'5px',
                  borderRadius: 2,
                  boxShadow: 3,
                  bgcolor: "#fff",
                  // height: "120px",
                  gap:'25px'
                }}
              >
                <Box>
                  <Typography sx={{fontSize:'14px'}} color="text.secondary" gutterBottom>
                    {title}
                  </Typography>
                  <Typography  fontWeight="bold">
                    {number}
                  </Typography>
                </Box>
                <Box>{icon}</Box>
              </Box>
            </Grid>
          ))}

          
        <Grid >
          <Typography sx={{fontSize:'18px', fontWeight:'bold'}} gutterBottom>Total institutes</Typography>
       <InstituteTable maxWidth={'70%'}/>
        </Grid>

        </Grid>

      </Box> */}

      

 <div className="container">
      <div className="row">
        <div className="col-12 col-md-12 col-lg-4 mb-4">
          <div className="card text-white bg-primary dashboard-card">
            <div className="card-body bg-white text-dark dashboard-card-body">
              <div>
                <h5 className="card-title dashboard-card-title">
                  Total Institutions
                </h5>
                <p className="card-text dashboard-card-text">987</p>
              </div>
              <div className="dashboard-icon-container">
                <i className="fas fa-university dashboard-icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-4 mb-4">
          <div className="card text-white bg-success dashboard-card">
            <div className="card-body bg-white text-dark dashboard-card-body">
              <div>
                <h5 className="card-title dashboard-card-title">Total Users</h5>
                <p className="card-text dashboard-card-text">1,234</p>
              </div>
              <div className="dashboard-icon-container">
                <i className="fas fa-users dashboard-icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-4 mb-4">
          <div className="card text-white bg-warning dashboard-card">
            <div className="card-body bg-white text-dark dashboard-card-body">
              <div>
                <h5 className="card-title dashboard-card-title">
                  Total Revenue
                </h5>
                <p className="card-text dashboard-card-text">$5,678</p>
              </div>
              <div className="dashboard-icon-container">
                <i className="fas fa-dollar-sign dashboard-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row gx-2">
        <div className="col-lg-7 col-xl-7 col-12">
          <div className="card text-white h-100 bordered-grid">
            <h3 className="grid-title">Total Institutions</h3>
            <table className="institutions-table">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Institution Name</th>
                  <th>Number students</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
               {institutes.map((item, index) => (
                 <tr key={index}>
                   <td>{index + 1}</td>
                   <td>{item.instituteName}</td>
                   <td>10</td>
                   <td>Active</td>
                   <td>EDIT</td>
                  </tr>
               ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-xl-5 col-lg-5 col-12">
          <div className="card text-white h-100 bordered-grid">
            <h5>Report</h5>
            {[1, 2, 3, 4].map((item) => (
              <div className="mb-3" key={item}>
                {/* Top Row: Name + Button */}
                <div className="d-flex justify-content-between align-items-center">
                  <span className="report-name">John Doe {item}</span>
                  <button className="custom-reply-btn">Reply</button>
                </div>
                {/* Below Text */}
                <p className="report-message mb-0">
                  This is a sample message for the report.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-12 mt-4">
          <div
            className="card text-white h-100"
            style={{
              border: "none",
              boxShadow: "0px 4px 4px 0px #00000040",
              height: "100%",
            }}
          >
            <div style={{ width: "100%", height: "350px", padding: "1rem" }}>
              <Line
                data={sampleData}
                options={{ ...sampleOptions, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>

    </>
  );
}

export default Dashboard;
