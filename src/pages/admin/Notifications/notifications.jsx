import Navbar from "../../../components/admin/Navbar";

const NotificationItem = ({ text, time, unread, bgColor = "#fff" }) => (
    
  <Card
    variant="outlined"
    sx={{
      mb: 2,
      p: 2,
      borderRadius: 2,
      bgcolor: bgColor,
      boxShadow: unread ? 2 : 0,
    }}
  >
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
          B
        </Avatar>
      </Grid>
      <Grid item xs>
        <Typography fontWeight={600}>{text}</Typography>
        <Typography variant="caption" color="text.secondary">
          {time}
        </Typography>
      </Grid>
      {unread && (
        <Grid item>
          <Box
            sx={{
              width: 8,
              height: 8,
              bgcolor: "#2563EB",
              borderRadius: "50%",
            }}
          />
        </Grid>
      )}
    </Grid>
  </Card>
);

const Notifications = () => {

  return (
   <Navbar title={"Notifications"}>
     <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
    
      <Card
        sx={{
          mb: 3,
          p: 2,
          borderRadius: 2,
        }}
        elevation={1}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" fontWeight="bold">
              Notifications
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#EAB308",
                color: "#fff",
                borderRadius: 2,
                textTransform: "none",
                px: 2,
              }}
            >
              Mark all as read
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Box
        sx={{
          bgcolor: "#fff",
          p: 2,
          borderRadius: 2,
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Typography variant="subtitle1" fontWeight="bold">
              Today
            </Typography>
          </Grid>
          <Grid item>
            <Checkbox size="small" />
            <Typography component="span" variant="body2">
              Select all
            </Typography>
          </Grid>
        </Grid>

        <NotificationItem
          text="Bhumika & 4 Others have reported a question on air navigation"
          time="3min ago"
          unread
          bgColor="#FFFBCC"
        />
        <NotificationItem
          text="Bhumika has Subscribed for 6 Months"
          time="3min ago"
          unread
          bgColor="#FFFBCC"
        />
        <NotificationItem
          text="Bhumika & 4 Others have reported a question on air navigation"
          time="3min ago"
          unread={false}
        />
      </Box>

      <Box
        sx={{
          bgcolor: "#fff",
          p: 2,
          borderRadius: 2,
          mt: 3,
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Grid item>
            <Typography variant="subtitle1" fontWeight="bold">
              Yesterday 18th November, 2022
            </Typography>
          </Grid>
          <Grid item>
            <Checkbox size="small" />
            <Typography component="span" variant="body2">
              Select all
            </Typography>
          </Grid>
        </Grid>

        {[...Array(3)].map((_, idx) => (
          <NotificationItem
            key={idx}
            text="Bhumika & 4 Others have reported a question on air navigation"
            time="3min ago"
            unread={false}
          />
        ))}
      </Box>
    </Box>
   </Navbar>
   
  );
};

export default Notifications;
