import React, { useState } from "react";
import { Box, Grid, Typography, IconButton, Collapse, Button, Avatar } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Navbar from "../../../components/admin/Navbar";
import CustomTypography from "../../../components/admin/CustomTypography";

function Feedback() {
  const [open, setOpen] = useState(false);

  const styles = {
    toggleBox: {
      bgcolor: "#fff",
      borderRadius: 2,
      boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
      p: { xs: 2, md: 3 },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      mt: 2,
    },
    sectionBox: {
      bgcolor: "#fff",
      borderRadius: 2,
      boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
      p: { xs: 2, md: 2 },
      mt: 2,
      width: "100%",
    },
    sectionTitle: {
      color: "orange",
      fontWeight: 600,
      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
      mb: 1,
    },
    sectionText: {
      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
      color: "#333",
    },
    buttonGroup: {
      mt: 2,
      display: "flex",
      gap: 2,
      justifyContent: "center",
    },
    actionButton: {
      bgcolor: "green",
      color: "#fff",
      '&:hover': {
        bgcolor: "darkgreen",
      },
      px: 3,
      py: 1,
      fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" }
    }
  };

  return (
    <Navbar title={"Feedback"}>
      <Grid container justifyContent="center">
        <Grid size={{ xs: 10, sm: 10, md: 10 }} >
          {/* Toggle Box */}
          <Box sx={styles.toggleBox} onClick={() => setOpen(!open)}>
            <Grid sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar>U</Avatar>
              <CustomTypography
                fontSize={{ xs: '12px', sm: '13px', md: '14px' }}
                fontWeight={500}
                text=' User has reported a question on syllabus and chapter'
                mb={0} />
            </Grid>

            <IconButton>
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          {/* Expandable Content */}
          <Collapse in={open} >
            <Grid container spacing={2} mt={1} sx={{justifyContent: "center", backgroundColor:'#F0F0F0'}}>
              {/* Question & Our Answer Box */}
              <Grid size={{ xs: 8, sm: 10, md: 10}}>
                <Box sx={styles.sectionBox}>
                  <CustomTypography
                    fontSize={{ xs: '12px', sm: '13px', md: '14px' }}
                    color='orange'
                    fontWeight={500}
                    text='Question'
                    mb={0} />

                  <CustomTypography
                    fontSize={{ xs: '12px', sm: '13px', md: '14px' }}
                    fontWeight={500}
                    text='   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est iusto illum ex molestiae exercitationem!'
                    mb={0} />

                 <CustomTypography
                    fontSize={{ xs: '12px', sm: '13px', md: '14px' }}
                    color='orange'
                    fontWeight={500}
                    text='Our Answer'
                    mb={0}
                    sx={{ mt: 2 }} />

                  <CustomTypography
                    fontSize={{ xs: '12px', sm: '13px', md: '14px' }}
                    fontWeight={500}
                    text='   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est iusto illum ex molestiae exercitationem!'
                    mb={0} />
                </Box>
              </Grid>

              {/* Student Answer Box */}
              <Grid size={{ xs: 8, sm: 10, md: 10 }}>
                <Box sx={styles.sectionBox}>
                 <CustomTypography
                    fontSize={{ xs: '12px', sm: '13px', md: '14px' }}
                    color='orange'
                    fontWeight={500}
                    text='Student Answer'
                    mb={0}
                     />

                  <CustomTypography
                    fontSize={{ xs: '12px', sm: '13px', md: '14px' }}
                    fontWeight={500}
                    text=' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, doloremque amet. Incidunt, quisquam, harum magnam nesciunt possimus libero, a laboriosam amet cupiditate cum esse.'
                    mb={0}
                       />
                </Box>
              </Grid>

                <Box sx={styles.buttonGroup} mb={2}>
              <Button sx={styles.actionButton}>Approve</Button>
              <Button sx={styles.actionButton}>Decline</Button>
            </Box>
            </Grid>

            {/* Action Buttons */}
          
          </Collapse>
        </Grid>
      </Grid>
    </Navbar>
  );
}

export default Feedback;
