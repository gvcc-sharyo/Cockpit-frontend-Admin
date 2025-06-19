import { useState, useEffect } from "react";
import {
  Box, Grid, Typography, IconButton, Collapse, Button, Avatar,
  Dialog, DialogTitle, DialogContent, Divider, FormControl, FormControlLabel, Radio,
  RadioGroup,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from "../../../components/admin/Navbar";
import CustomTypography from "../../../components/admin/CustomTypography";
import CustomTextArea from "../../../components/admin/CustomTextArea";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import { apiGet, apiPost } from "../../../api/axios";
import CustomButton from "../../../components/admin/CustomButton";

function Feedback() {
  const [open, setOpen] = useState(null);

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

  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await apiGet('/reports');

      if (response.data.status === 200 && response.data.data.length === 0) {
        snackbarEmitter('No reports found', 'info');
      }
      else if (response.data.status === 200) {
        snackbarEmitter(response.data.message, 'success');
        setReports(response.data.data);
      }
      else {
        snackbarEmitter(response.data.message, 'error');
      }



    } catch (error) {
      snackbarEmitter('Something went wrong', 'error');
    }
  };

  useEffect(() => {
    fetchReports();
  }, [])

  const filteredReports = reports.filter((report) => report.status === 'pending');

  const handleModalClose = () => {

    setOpenModal(false);
    setFormData({
      questionId: "",
      question: "",
      options: [
        { id: 1, text: "", isCorrect: false },
        { id: 2, text: "", isCorrect: false },
      ],
      explanation: "",
    });
  };

  const [formData, setFormData] = useState({
    questionId: "",
    question: "",
    options: [
      { id: 1, text: "", isCorrect: false },
      { id: 2, text: "", isCorrect: false },
    ],
    explanation: "",
  });
  const [options, setOptions] = useState([1, 2]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleOptionTextChange = (index, value) => {
    setFormData((prev) => {
      const newOptions = [...prev.options];
      newOptions[index] = { ...newOptions[index], text: value };
      return { ...prev, options: newOptions };
    });
  };
  const handleOptionCorrectChange = (value) => {
    const index = parseInt(value.split("-")[1]);
    setFormData((prev) => {
      const newOptions = prev.options.map((option, i) => ({
        ...option,
        isCorrect: i === index,
      }));
      return { ...prev, options: newOptions };
    });
  };
  const handleExplanationChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      explanation: value,
    }));
  };
  const handleAddOption = () => {
    const newId = options.length + 1;
    setOptions((prev) => [...prev, newId]);
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { id: newId, text: "", isCorrect: false }],
    }));
  };
  const handleDeleteOption = (indexToDelete) => {
    setOptions((prev) => prev.filter((_, index) => index !== indexToDelete));
    setFormData((prev) => ({
      ...prev,
      options: prev.options
        .filter((_, index) => index !== indexToDelete)
        .map((option, index) => ({ ...option, id: index + 1 })),
    }));
  };

  const [loading, setLoading] = useState(false)
  const handleUpdate = async () => {

    const req = {
      questionId: formData.questionId,
      question: formData.question,
      options: formData.options,
      explanation: formData.explanation
    }

    setLoading(true);

    try {
      const response = await apiPost('/updateQuestion', req);

      setTimeout(() => {
        setLoading(false);
        if (response.data.status === 200) {
          snackbarEmitter(response.data.message, 'success');
          handleModalClose();
          fetchReports();
        }
        else {
          snackbarEmitter(response.data.message, 'error');
          handleModalClose();
          fetchReports();
        }
      }, 1500)


    } catch (error) {

      setTimeout(() => {
        setLoading(false);
        snackbarEmitter('Something went wrong', 'error');
        handleModalClose();
        fetchReports();
      }, 1500)


    }
  };

  const [openModal, setOpenModal] = useState(false);


  const handleModalOpen = (report) => {
    setOpenModal(true);
    setFormData({
      questionId: report.questionId._id,
      question: report.questionId.question,
      options: report.questionId.options,
      explanation: report.questionId.explanation,
    });
  }

  const updateReport = async (report, status) => {

    const req = {
      reportId: report._id,
      status: status
    }

    setLoading(true);

    try {
     const response = await apiPost('/updateReport', req);

      setTimeout(() => {
        setLoading(false);
        
        if(response.data.status === 200){
          snackbarEmitter('Report updated successfully', 'success');
              fetchReports();
        }
        else{
          setLoading(false);
          snackbarEmitter(response.data.message, 'error');
          fetchReports();
        }

    
      }, 1500)
    }
    catch (error) {
      setTimeout(() => {
        setLoading(false);
        snackbarEmitter('Something went wrong', 'error');
        fetchReports();
      }, 1500)
    }
  }



  return (
    <Navbar title={"Feedback"}>
      <Grid container justifyContent="center">

        {
          filteredReports.length > 0 && filteredReports.map((report, index) => (
            <Grid size={{ xs: 10, sm: 10, md: 10 }} >
              {/* Toggle Box */}
              <Box sx={styles.toggleBox} onClick={() => setOpen(open === index ? null : index)}>
                <Grid sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar>U</Avatar>
                  <CustomTypography
                    fontSize={{ xs: '12px', sm: '13px', md: '14px' }}
                    fontWeight={500}
                    text=' User has reported a question on syllabus and chapter'
                    mb={0} />
                </Grid>

                <IconButton>
                  {open === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              {/* Expandable Content */}
              <Collapse in={open === index} >
                <Grid container spacing={2} mt={1} sx={{ justifyContent: "center", backgroundColor: '#F0F0F0' }}>
                  {/* Question & Our Answer Box */}
                  <Grid size={{ xs: 8, sm: 10, md: 10 }}>
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
                        text={report.questionId.question}
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
                        text={report.questionId.explanation}
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
                        text={report.reason}
                      />
                    </Box>
                  </Grid>

                  <Box sx={styles.buttonGroup} mb={2}>
                    {/* <Button sx={styles.actionButton}>Approve</Button>
                    <Button sx={styles.actionButton}>Decline</Button>
                    <Button sx={styles.actionButton} onClick={() => handleModalOpen(report)}>Show question</Button> */}
                     <CustomButton children='Approve' onClick={() => updateReport(report, 'resolved')} loading={loading} bgColor='#1E9609' sx={{ width: '30%' }} />
                     <CustomButton children='Decline' onClick={() => updateReport(report, 'pending')} loading={loading} bgColor='red' sx={{ width: '30%' }} />
                     <CustomButton children='Show question' onClick={() => handleModalOpen(report)} loading={loading} bgColor='#EAB308' sx={{ width: '40%' }} />
                  </Box>
                </Grid>

                {/* Action Buttons */}

              </Collapse>
            </Grid>
          ))
        }


      </Grid>


      <Dialog open={openModal} onClose={handleModalClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Update Question</Typography>
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid size={{ xs: 12, md: 12, sm:12 }}>
              <CustomTextArea
                value={formData.question}
                onChange={(e) =>
                  handleInputChange({
                    target: { name: "question", value: e.target.value },
                  })
                }
              />
            </Grid>
          </Grid>
          <Divider sx={{ border: "1px solid #DBDBDB", mb: 2 }} />
          <Box
            sx={{
              justifyContent: "space-between",
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <CustomTypography text="Selected Correct Options" />
            <CustomTypography text="Choices" />
            <Box sx={{ width: { xs: "50%", sm: "auto" } }}>
              <Button
                onClick={handleAddOption}
                variant="contained"
                fullWidth={true}
                sx={{
                  backgroundColor: "#EAB308",
                  color: "white",
                  borderRadius: "10px",
                  whiteSpace: "nowrap",
                }}
              >
                +Add Option
              </Button>
            </Box>
          </Box>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <RadioGroup
              onChange={(e) => handleOptionCorrectChange(e.target.value)}
            >
              {formData.options.length > 0 && formData.options.map((option, index) => (
                <Box
                  key={option.id}
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Radio
                    value={`option-${index}`}
                    checked={option.isCorrect}
                    sx={{ mt: 2, mr: { xs: -2, md: 2 } }}
                  />
                  <Box
                    sx={{ width: "-webkit-fill-available", marginLeft: "50px" }}
                  >
                    <Box
                      sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}
                    >
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleDeleteOption(index)}
                        sx={{ padding: 0, minWidth: "auto", fontWeight: "bold" }}
                      >
                        Delete
                      </Button>
                    </Box>
                    <CustomTextArea
                      value={option.text}
                      onChange={(e) =>
                        handleOptionTextChange(index, e.target.value)
                      }
                    />
                  </Box>
                </Box>
              ))}
            </RadioGroup>
          </FormControl>
          <Divider sx={{ border: "1px solid #DBDBDB", mb: 2, mt: 2 }} />
          <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
            <CustomTypography text={"Solution"} />
            <Box
              sx={{
                width: "-webkit-fill-available",
                marginLeft: { xs: "20px", md: "50px" },
              }}
            >
              <CustomTextArea
                value={formData.explanation}
                onChange={(e) => handleExplanationChange(e.target.value)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mt: 4,
            }}
          >
            <CustomButton children='Update question' onClick={handleUpdate} loading={loading} bgColor='#EAB308' sx={{ width: '30%' }} />
          </Box>

        </DialogContent>
      </Dialog>



    </Navbar>
  );
}

export default Feedback;
