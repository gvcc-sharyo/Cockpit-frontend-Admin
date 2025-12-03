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
      // mt: 3,
      // width: "100%",
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
  
  };


  export default classes;