import { apiPost } from "../../../api/axios";
import { differenceInDays, addMonths } from "date-fns";
import CustomTextField from "../../../components/admin/CustomTextField";
import CustomButton from "../../../components/admin/CustomButton";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";

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

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#EAB308",
      borderRadius: "10px",
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
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    subscriptionAmt: "",
    subscriptionPeriod: "",
    transactionId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subscriptionPlan = async () => {
    try {
      const response = await apiPost(`/admin/addInstituteSubscription`, {
        instituteId,
        ...formData,
      });
      snackbarEmitter(response.data.message, "success");
      setFormData({
        subscriptionAmt: "",
        subscriptionPeriod: "",
        transactionId: "",
      });
      // console.log("Subscription plan response:", response);
      setOpen(false);
      subscriptionHistory();
    } catch (error) {
      snackbarEmitter("Error adding subscription plan", "error");
      // console.error("Error fetching subscription plan:", error);
    }
  };

  const [daysLeft, setDaysLeft] = useState(0);
  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState("");



  const subscriptionHistory = async () => {
    try {
      const response = await apiPost(`/admin/instituteSubscriptionHistory`, {
        instituteId,
      });

      const formatted = response.data.data?.map((item, index, arr) => ({
        ...item,
        invoice: `Invoice-${arr.length - index}`,
        date: new Date(item.createdAt).toLocaleDateString(),
        activationDate: new Date(item.subscriptionStartDate).toLocaleDateString(),
        status: item.status,
        amount: `₹${item.subscriptionAmt}`,
        ActiveDays: item.ActiveDays,
      }));

      setSubscriptionsHistory(formatted);

      if (formatted.length > 0) {
        setDaysLeft(formatted[0].ActiveDays);
        setAmount(formatted[0].subscriptionAmt);
        setPeriod(formatted[0].subscriptionPeriod);
      } else {
        setDaysLeft(0);
        setAmount(0);
        setPeriod("");
      }

    } catch (error) {
      console.error("Error fetching subscription history:", error);
    }
  };

  useEffect(() => {
    subscriptionHistory();
  }, []);




  console.log("subscriptionHistory", subscriptionsHistory);


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
              {" "}
              Subscription Plan{" "}
            </Typography>
            <Typography sx={styles.leftGrid.price}>
              {amount} <span style={{ fontWeight: 400 }}>/ {period} days</span>{" "}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }} sx={styles.rightGrid.wrapper}>
            <Typography sx={styles.rightGrid.daysLeft}>
              {daysLeft > 0
                ? `${daysLeft} Day${daysLeft > 1 ? "s" : ""} Left`
                : "Expired"}
            </Typography>
            <Button
              variant="contained"
              sx={styles.rightGrid.button}
              onClick={() => setOpen(true)}
            >
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
                {["Invoice", "Billing dates", "Activation Date", "Status", "Amount"].map(
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
                  <TableCell sx={styles.tableCell}>{row.activationDate}</TableCell>
                  <TableCell sx={styles.tableCell}>
                    <Box
                      sx={
                        row.status === "Active"
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
                            row.status === "Active" ? "#027A48" : "#B42318",
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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Update Subscription</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Subscription Amount"
                name="subscriptionAmt"
                type="number"
                value={formData.subscriptionAmt}
                onChange={handleChange}
                placeholder="Enter"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Subscription Period"
                name="subscriptionPeriod"
                select
                fullWidth
                required
                value={formData.subscriptionPeriod}
                onChange={handleChange}
                placeholder="Enter"
              >
                <MenuItem value="30">1 Month</MenuItem>
                <MenuItem value="90">3 Months</MenuItem>
                <MenuItem value="180">6 Months</MenuItem>
                <MenuItem value="365">1 Year</MenuItem>
                <MenuItem value="548">1 Year 6 Months</MenuItem>
                <MenuItem value="730">2 Year</MenuItem>

              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                label="Transaction ID"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="Enter Transaction ID"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <CustomButton
            children="Update"
            bgColor="#EAB308"
            sx={{ width: "20%" }}
            onClick={() => {
              subscriptionPlan();
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SubscriptionPlan;
