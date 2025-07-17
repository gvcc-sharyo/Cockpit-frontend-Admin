import { apiPost } from "../../../api/axios";
import { differenceInDays, addMonths } from "date-fns";

const styles = {
  container: {
    borderRadius: "16px",
    p: 3,
    backgroundColor: "#fff",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
    height: "auto",
    maxHeight: "600px",
    overflow: "auto",
    width: "auto",

    mt: 4,
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#EAB308",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#EAB308",
    },
  },
  heading: {
    fontFamily: "Jost",
    fontWeight: 600,
    fontSize: "20px",
    color: "#404040",
    mb: 2,
    lineHeight: "100%",
  },
  tableHeadCell: {
    fontFamily: "Jost",
    fontWeight: 600,
    fontSize: "14px",
    color: "#515151",
    lineHeight: "100%",
    border: "none",
  },
  tableCell: {
    fontFamily: "Jost",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "24px",
    letterSpacing: "0%",
    color: "#515151",
  },
  paginationBox: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    mb: 2,
  },
  paginationLabel: {
    fontFamily: "Jost",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "24px",
    color: "#000",
    mr: 1,
  },
  paginationInput: {
    width: "40px",
    "& .MuiOutlinedInput-root": {
      height: "30px",
      borderRadius: "8px",
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: "14px",
      color: "#EAB308",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EAB308",
    },
    "& .MuiInputBase-input": {
      textAlign: "center",
      padding: "5px 8px",
    },
  },
  statusPaid: {
    backgroundColor: "#D9FCD8",
    color: "#027A48",
    fontFamily: "Jost",
    fontWeight: 500,
    fontSize: "12px",
    borderRadius: "12px",
    px: 1.5,
    py: 0.5,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  statusCancelled: {
    backgroundColor: "#FEE4E2",
    color: "#B42318",
    fontFamily: "Jost",
    fontWeight: 500,
    fontSize: "12px",
    borderRadius: "12px",
    px: 1.5,
    py: 0.5,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  leftGrid: {
    title: {
      fontFamily: "Jost",
      fontWeight: 600,
      fontSize: "16px",
      color: "#1A1A1A",
      mb: 0.5,
    },
    subtitle: {
      fontFamily: "Jost",
      fontWeight: 400,
      fontSize: "14px",
      color: "#6B7280",
      mb: 2,
    },
    price: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: "18px",
      color: "#EAB308",
    },
  },
  rightGrid: {
    wrapper: {
      display: "flex",
      justifyContent: { xs: "flex-start", md: "flex-end" },
      alignItems: "center",
      flexDirection: { xs: "row", md: "column" },
      gap: 1,
    },
    daysLeft: {
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: "12px",
      color: "#EAB308",
    },
    button: {
      backgroundColor: "#EAB308",
      color: "#fff",
      borderRadius: "8px",
      textTransform: "none",
      fontFamily: "Jost",
      fontWeight: 600,
      px: 3,
      "&:hover": {
        backgroundColor: "#d4a107",
      },
    },
  },
};

const SubscriptionPlan = ({ instituteId }) => {
  const [subscriptionsHistory, setSubscriptionsHistory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);


  useEffect(() => {
    const subscriptionPlan = async () => {
      try {
        await apiPost(`/admin/addInstituteSubscription`, { instituteId });
      } catch (error) {
        console.error("Error fetching subscription plan:", error);
      }
    };

    const subscriptionHistory = async () => {
      try {
        const response = await apiPost(`/admin/instituteSubscriptionHistory`, {
          instituteId,
        });
        console.log("Subscription History Response:", response.data.data);

        const formatted = response.data.data?.map((item, index) => ({
          ...item,
          invoice: `INVOICE-${index + 1}`,
          date: new Date(item.createdAt).toLocaleDateString(),
          status: item.status === "Active" ? "Paid" : "Cancelled",
          amount: `₹${item.subscriptionAmt}` || 0,
        }));

        setSubscriptionsHistory(formatted);
      } catch (error) {
        console.error("Error fetching subscription history:", error);
      }
    };

    subscriptionPlan();
    subscriptionHistory();
  }, [instituteId]);

  let latestSubscription = null;

  for (let i = 0; i < subscriptionsHistory.length; i++) {
    let sub = subscriptionsHistory[i];
    if (sub.status === "Paid") {
      if (latestSubscription === null || new Date(sub.createdAt) > new Date(latestSubscription.createdAt)) {
        latestSubscription = sub;
      }
    }
  }

  let amount = 0;
  let period = 0;

  if (latestSubscription) {
    amount = latestSubscription.subscriptionAmt;
    period = parseInt(latestSubscription.subscriptionPeriod);
  }

  let startDate = latestSubscription
    ? new Date(latestSubscription.createdAt)
    : new Date();
  let endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + period);

  let today = new Date();
  let timeDiff = endDate.getTime() - today.getTime();
  let daysLeft = Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 0);




  return (
    <>
      <Paper
        elevation={3}
        sx={{
          borderRadius: "12px",
          p: { xs: 2, sm: 3 },
          backgroundColor: "#fff",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography sx={styles.leftGrid.title}>
              Subscription Plan
            </Typography>
            <Typography sx={styles.leftGrid.subtitle}>
              Your subscription plan will expire soon. Please upgrade!
            </Typography>
            <Typography sx={styles.leftGrid.price}>
              ₹1500{" "}
              <span style={{ fontWeight: 400 }}>
                / 1 month
              </span>
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }} sx={styles.rightGrid.wrapper}>
            <Typography sx={styles.rightGrid.daysLeft}>
              {daysLeft > 0
                ? `${daysLeft} Day${daysLeft > 1 ? "s" : ""} Left`
                : "Expired"}
            </Typography>
            <Button variant="contained" sx={styles.rightGrid.button} onClick={handleModalOpen}>
              Upgrade
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={styles.container}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={styles.heading}>Subscription</Typography>
        </Box>

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["Invoice", "Billing dates", "Status", "Amount"].map(
                  (head, idx) => (
                    <TableCell key={idx} sx={styles.tableHeadCell}>
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptionsHistory.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={styles.tableCell}>{row.invoice}</TableCell>
                  <TableCell sx={styles.tableCell}>{row.date}</TableCell>
                  <TableCell sx={styles.tableCell}>
                    <Box
                      sx={
                        row.status === "Paid"
                          ? styles.statusPaid
                          : styles.statusCancelled
                      }
                    >
                      <Box
                        component="span"
                        sx={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor:
                            row.status === "Paid" ? "#027A48" : "#B42318",
                        }}
                      />
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell sx={styles.tableCell}>{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default SubscriptionPlan;
