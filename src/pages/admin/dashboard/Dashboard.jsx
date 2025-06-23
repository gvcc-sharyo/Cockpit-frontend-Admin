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
  Title,
} from "chart.js";
import "./dashboard.css";
import { useState, useEffect } from "react";
import { apiGet } from "../../../api/axios";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const adminId = localStorage.getItem("adminId");

  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await apiGet("/reports");

      if (response.data.status === 200 && response.data.data.length === 0) {
        snackbarEmitter("No reports found", "info");
      } else if (response.data.status === 200) {
        setReports(response.data.data);
      } else {
        snackbarEmitter(response.data.message, "error");
      }
    } catch (error) {
      snackbarEmitter("Something went wrong", "error");
    }
  };

  const [totals, setTotals] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const chartRef = useRef(null);

  const [chartData, setChartData] = useState(null);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 👈 disables the entire legend section
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#a0aec0" },
      },
      y: {
        grid: { drawBorder: false, color: "#f0f0f0" },
        ticks: {
          color: "#a0aec0",
          callback: (v) => v,
        },
      },
    },
  };

  const getTotals = async () => {
    try {
      const response = await apiGet(
        `/subscription/getTotalRevenue?adminId=${adminId}`
      );

      if (response.data.status === 200) {
        setTotals(response.data.data);

        const registeredUsersPerMonth = Array(12).fill(0);
        const subscribedUsersPerMonth = Array(12).fill(0);

        // All registered users (including PENDING)
        response.data.data.allSubscriptionPayments.forEach((payment) => {
          const createdAt = new Date(payment.createdAt);
          const month = createdAt.getMonth(); // 0 to 11
          registeredUsersPerMonth[month] += 1;
        });

        // Only subscribed users (PAID)
        response.data.data.subscriptionPayments.forEach((payment) => {
          const createdAt = new Date(payment.createdAt);
          const month = createdAt.getMonth();
          subscribedUsersPerMonth[month] += 1;
        });

        setChartData({
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Registered Users",
              data: registeredUsersPerMonth,
              borderColor: "#000000",
              backgroundColor: "black",
              tension: 0.4,
              fill: true,
              pointRadius: 0,
              borderWidth: 2,
            },
            {
              label: "Subscribed Users",
              data: subscribedUsersPerMonth,
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
      } else {
        snackbarEmitter(response.data.message, "error");
      }
    } catch (error) {
      snackbarEmitter("Error fetching profile", "error");
    }
  };

  useEffect(() => {
    fetchReports();
    getTotals();
  }, []);

  const data = [
    { label: "Registered", color: "#000" },
    { label: "Subscribed", color: "#AEC7ED" },
  ];
  const stats = [
    {
      title: "Total Users",
      number: totals.totalUsers,
      icon: <img src="/images/users.svg" alt="Users" width={"130%"} />,
    },
    {
      title: "Total Revenue",
      number: totals.totalRevenue,
      icon: <img src="/images/revenue.svg" alt="Revenue" width={"130%"} />,
    },
  ];

  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  const classes = {
    statsBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      p: { xs: "5px", md: "5px" },
      borderRadius: 1,
      boxShadow: 1,
      bgcolor: "#fff",
      gap: { xs: 1.5, md: 1 },
      height: "100%",
    },
    statTitle: {
      fontSize: { xs: "0.7rem", md: "0.8rem" },
      color: "text.secondary",
      lineHeight: 1.2,
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
      maxHeight: "50vh",
      overflowY: "auto",
    },
    reportTitle: {
      fontWeight: 600,
      fontSize: { xs: "1rem", md: "1.2rem" },
      mb: 1,
    },
    reportName: {
      fontWeight: "bold",
      fontSize: { xs: "0.9rem", md: "1rem" },
      // mb: 0.5,
    },
    reportLine: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    reportedText: {
      color: "grey",
      fontSize: { xs: "0.7rem", md: "0.8rem" },
    },
    replyText: {
      color: "orange",
      fontSize: { xs: "0.7rem", md: "0.8rem" },
      fontWeight: 600,
      cursor: "pointer",
    },
    totalUsersBox: {
      width: "100%",
      height: { xs: 400, md: 350 },
      mt: 4,
      padding: "40px 0px",
      backgroundColor: "#fff",
      boxShadow: "0px 4px 4px 0px #00000040",
      borderImageSource: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0.47%, #000000 100%),
      linear-gradient(0deg, #000000, #000000)`,
      borderImageSlice: 1,
      borderRadius: 4,
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
            <Grid size={{ xs: 10, md: 5.5, sm: 5 }}>
              <Box sx={classes.reportBox}>
                <Typography sx={classes.reportTitle}>Report</Typography>
                {reports.map((report, index) => (
                  <Box mt={2}>
                    <Typography sx={classes.reportName}>
                      {report.userId.username}
                    </Typography>
                    <Box sx={classes.reportLine}>
                      <Typography sx={classes.reportedText}>
                        Has reported a question on {report.questionId.syllabus}
                      </Typography>
                      <Typography
                        sx={classes.replyText}
                        onClick={() => handleNavigate(`/admin/feedback`)}
                      >
                        Reply
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid size={{ xs: 12, md: 12 }}>
              {chartData && (
                <Box sx={classes.totalUsersBox}>
                  <Box sx={classes.userLegendRow}>
                    <Typography sx={classes.legendTitle}>
                      Total Users
                    </Typography>
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
                        <Typography sx={classes.legendLabel}>
                          {item.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ width: "100%", height: "100%" }}>
                    <Line data={chartData} options={options} ref={chartRef} />
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Navbar>
    </>
  );
}

export default Dashboard;
