// import React from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Grid,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";

// const styles = {
//   container: {
//     borderRadius: "16px",
//     p: 3,
//     backgroundColor: "#fff",
//     boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
//     height: "auto",
//     minHeight:"600px",
//     overflow: "auto",
//     width:"100%",

//     mt: 4,
//     "&::-webkit-scrollbar": {
//       width: "4px",
//     },
//     "&::-webkit-scrollbar-track": {
//       backgroundColor: "#f1f1f1",
//       borderRadius: "10px",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "#EAB308",
//       borderRadius: "10px",
//     },
//     "&::-webkit-scrollbar-thumb:hover": {
//       backgroundColor: "#EAB308",
//     },
//   },
//   heading: {
//     fontFamily: "Jost",
//     fontWeight: 600,
//     fontSize: "20px",
//     color: "#404040",
//     mb: 2,
//     lineHeight: "100%",
//   },
//   tableHeadCell: {
//     fontFamily: "Jost",
//     fontWeight: 600,
//     fontSize: "14px",
//     color: "#515151",
//     lineHeight: "100%",
//     border: "none",
//   },
//   tableCell: {
//     fontFamily: "Jost",
//     fontWeight: 400,
//     fontSize: "14px",
//     lineHeight: "24px",
//     letterSpacing: "0%",
//     color: "#515151",
//   },
//   paginationBox: {
//     display: "flex",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     mb: 2,
//   },
//   paginationLabel: {
//     fontFamily: "Jost",
//     fontWeight: 400,
//     fontSize: "14px",
//     lineHeight: "24px",
//     color: "#000",
//     mr: 1,
//   },
//   paginationInput: {
//     width: "40px",
//     "& .MuiOutlinedInput-root": {
//       height: "30px",
//       borderRadius: "8px",
//       fontFamily: "Inter",
//       fontWeight: 600,
//       fontSize: "14px",
//       color: "#EAB308",
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#EAB308",
//     },
//     "& .MuiInputBase-input": {
//       textAlign: "center",
//       padding: "5px 8px",
//     },
//   },
//   statusPaid: {
//     backgroundColor: "#D9FCD8",
//     color: "#027A48",
//     fontFamily: "Jost",
//     fontWeight: 500,
//     fontSize: "12px",
//     borderRadius: "12px",
//     px: 1.5,
//     py: 0.5,
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "4px",
//   },
//   statusCancelled: {
//     backgroundColor: "#FEE4E2",
//     color: "#B42318",
//     fontFamily: "Jost",
//     fontWeight: 500,
//     fontSize: "12px",
//     borderRadius: "12px",
//     px: 1.5,
//     py: 0.5,
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "4px",
//   },
// };

// const subscriptions = [
//   { invoice: "Invoice #1", date: "May 06, 2025", status: "Paid", amount: "₹1850" },
//   { invoice: "Invoice #1", date: "May 06, 2025", status: "Paid", amount: "₹1850" },
//   { invoice: "Invoice #1", date: "May 06, 2025", status: "Cancelled", amount: "₹1850" },
//   { invoice: "Invoice #1", date: "May 06, 2025", status: "Paid", amount: "₹1850" },
//   { invoice: "Invoice #1", date: "May 06, 2025", status: "Paid", amount: "₹1850" },
//   { invoice: "Invoice #1", date: "May 06, 2025", status: "Paid", amount: "₹1850" },
// ];

// const SubscriptionPlan = () => {
//   return (
//     <>
//       {/* Subscription Summary Card */}
//       <Paper
//         elevation={3}
//         sx={{
//           borderRadius: "12px",
//           p: { xs: 2, sm: 3,width:"100%" },
//           backgroundColor: "#fff",
//         }}
//       >
//         <Grid container spacing={2} alignItems="center">
//           <Grid size={{ xs: 12, md: 8 }}>
//             <Typography
//               sx={{
//                 fontFamily: "Jost",
//                 fontWeight: 600,
//                 fontSize: "16px",
//                 color: "#1A1A1A",
//                 mb: 0.5,
//               }}
//             >
//               Subscription Plan
//             </Typography>

//             <Typography
//               sx={{
//                 fontFamily: "Jost",
//                 fontWeight: 400,
//                 fontSize: "14px",
//                 color: "#6B7280",
//                 mb: 2,
//               }}
//             >
//               Your Subscription plan will expire soon please upgrade!
//             </Typography>

//             <Typography
//               sx={{
//                 fontFamily: "Inter",
//                 fontWeight: 500,
//                 fontSize: "18px",
//                 color: "#EAB308",
//               }}
//             >
//               ₹1850 <span style={{ fontWeight: 400 }}>/ month</span>
//             </Typography>
//           </Grid>

//           <Grid
//             size={{ xs: 12, md: 4 }}
//             sx={{
//               display: "flex",
//               justifyContent: { xs: "flex-start", md: "flex-end" },
//               alignItems: "center",
//               flexDirection: { xs: "row", md: "column" },
//               gap: 1,
//             }}
//           >
//             <Typography
//               sx={{
//                 fontFamily: "Inter",
//                 fontWeight: 600,
//                 fontSize: "12px",
//                 color: "#EAB308",
//               }}
//             >
//               9 Days Left
//             </Typography>

//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#EAB308",
//                 color: "#fff",
//                 borderRadius: "8px",
//                 textTransform: "none",
//                 fontFamily: "Jost",
//                 fontWeight: 600,
//                 px: 3,
                
//               }}
//             >
//               Upgrade
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Subscription Table */}
//       <Paper elevation={3} sx={styles.container}>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography sx={styles.heading}>Subscription</Typography>

//           <Box sx={styles.paginationBox}>
//             <Typography sx={styles.paginationLabel}>Showing</Typography>
//             <TextField
//               variant="outlined"
//               size="small"
//               value={12}
//               sx={styles.paginationInput}
//             />
//             <Typography sx={{ ...styles.paginationLabel, ml: 1 }}>
//               per page
//             </Typography>
//           </Box>
//         </Box>

//         <TableContainer>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 {["Invoice", "Billing dates", "Status", "Amount", "Action"].map((head, idx) => (
//                   <TableCell key={idx} sx={styles.tableHeadCell}>
//                     {head}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {subscriptions.map((row, idx) => (
//                 <TableRow key={idx}>
//                   <TableCell sx={styles.tableCell}>{row.invoice}</TableCell>
//                   <TableCell sx={styles.tableCell}>{row.date}</TableCell>
//                   <TableCell sx={styles.tableCell}>
//                     <Box
//                       sx={row.status === "Paid" ? styles.statusPaid : styles.statusCancelled}
//                     >
//                       <Box
//                         component="span"
//                         sx={{
//                           width: "6px",
//                           height: "6px",
//                           borderRadius: "50%",
//                           backgroundColor: row.status === "Paid" ? "#027A48" : "#B42318",
//                         }}
//                       />
//                       {row.status}
//                     </Box>
//                   </TableCell>
//                   <TableCell sx={styles.tableCell}>{row.amount}</TableCell>
//                   <TableCell sx={styles.tableCell}>
//                     <IconButton>
//                       <DownloadIcon sx={{ color: "#EAB308" }} />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </>
//   );
// };

// export default SubscriptionPlan;
