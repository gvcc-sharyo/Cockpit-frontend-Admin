import Navbar from "../../../../components/admin/Navbar";
import { snackbarEmitter } from "../../../../components/admin/CustomSnackbar";
import CustomTextField from "../../../../components/admin/CustomTextField";
import CustomButton from "../../../../components/admin/CustomButton";
import CustomTypography from "../../../../components/admin/CustomTypography";
import CustomTextArea from "../../../../components/admin/CustomTextArea";
import { apiGet } from "../../../../api/axios";
import { useState, useEffect } from "react";
import { Grid, MenuItem, Box, Collapse, FormControl, Radio, RadioGroup,Button, Divider, IconButton } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Test() {

    const [formData, setFormData] = useState({
        duration: "",
        syllabus: "",
        book: "",
        syllabusId: "",
        bookId: "",
        question: "",
        options: [
            { id: 1, text: "", isCorrect: false },
            { id: 2, text: "", isCorrect: false },
        ],
        explanation: "",
    });

    const [syllabus, setSyllabus] = useState([]);
    const [book, setBook] = useState([]);

    const getSyllabus = async () => {
        try {
            const response = await apiGet("/getSyllabus");
            if (response.data.status === 200) {
                setSyllabus(response.data.data); // full syllabus objects
            }
        } catch (error) {
            snackbarEmitter("Something went wrong", "error");
        }
    };

    const getBooks = async (selectedSyllabusId) => {
        // console.log("syllabus id for req", formData.syllabusId);
        try {

            const response = await apiGet(`/booksBySyllabusId/${selectedSyllabusId}`);
            if (response.data.status === 200) {
                setBook(response.data.data); // full book objects
            }
        } catch (error) {
            snackbarEmitter("Something went wrong", "error");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "syllabus") {
            const selected = syllabus.find((s) => s._id === value);
            setFormData((prev) => ({
                ...prev,
                syllabus: selected?.title,
                syllabusId: selected?._id || "",
                book: "",
                bookId: "",
            }));
            //   setErrors((prev) => ({ ...prev, syllabus: undefined }));
            getBooks(selected?._id);
            setBook([]);
            return;
        }

        if (name === "book") {
            const selected = book.find((b) => b._id === value);

            setFormData((prev) => ({
                ...prev,
                book: selected?.bookTitle,
                bookId: selected?._id || "",
            }));
            //   setErrors((prev) => ({ ...prev, book: undefined }));
            return;
        }

        // ✅ Generic fallback for other fields like "question"
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.syllabus.trim()) newErrors.syllabus = "Syllabus is required.";
        if (!formData.book.trim()) newErrors.book = "Book is required.";
        if (!formData.question.trim()) newErrors.question = "Question is required.";
        formData.options.forEach((opt, i) => {
            if (!opt.text.trim())
                newErrors[`option_${i}`] = "Option text is required.";
        });
        if (!formData.options.some((opt) => opt.isCorrect)) {
            newErrors.correct = "Please select the correct answer.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOptionTextChange = (index, value) => {
        setFormData((prev) => {
            const newOptions = [...prev.options];
            newOptions[index] = { ...newOptions[index], text: value };
            return { ...prev, options: newOptions };
        });
        setErrors((prev) => ({ ...prev, [`option_${index}`]: undefined }));
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
        setErrors((prev) => ({ ...prev, correct: undefined }));
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
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[`option_${indexToDelete}`];
            return newErrors;
        });
    };


    useEffect(() => {

        getSyllabus();
    }, []);


     const [open, setOpen] = useState(false);
     const handleToggle = () => {
  setOpen(prev => !prev);
};

    const data = [

        {
            label: "Syllabus*",
            name: "syllabus",
            value: formData.syllabusId,
            onChange: handleInputChange,
            error: !!errors.syllabus,
            helperText: errors.syllabus,
            options: syllabus.map(item => ({
                label: item.title,
                value: item._id
            })),
        },
        {
            label: "Book*",
            name: "book",
            value: formData.bookId,
            onChange: handleInputChange,
            error: !!errors.book,
            helperText: errors.book,
            options:
                book.filter(item => item.syllabusId?._id === formData.syllabusId)
                    .map(item => ({
                        label: item.bookTitle,
                        value: item._id
                    })),
        },
    ];



    const styles = {
    addImageBox: { display: "flex", justifyContent: "flex-end" },
    addImageButton: {
      backgroundColor: "#EAB308",
      color: "white",
      borderRadius: "10px",
      whiteSpace: "nowrap",
      textTransform: "none",
      fontFamily: "Lexend",
      fontWeight: 300,
      fontSize: "16px",
    },
    questionAreaGrid: { mt: 2, mb: 2 },
    divider: { border: "1px solid #DBDBDB", mb: 2 },
    dividerWithMargin: { border: "1px solid #DBDBDB", mb: 2, mt: 2 },
    optionsHeaderBox: {
      justifyContent: "space-between",
      display: "flex",
      flexWrap: "wrap",
      gap: 2,
    },
    addOptionBox: { width: { xs: "100%", sm: "auto" } },
    addOptionButton: {
      backgroundColor: "#EAB308",
      color: "white",
      borderRadius: "10px",
      whiteSpace: "nowrap",
      textTransform: "none",
      fontFamily: "Lexend",
      fontWeight: 300,
      fontSize: "16px",
    },
    radioFormControl: { mt: 2 },
    optionItemBox: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      mb: 2,
    },
    radio: {
      mt: 2,
      mr: { xs: -2, md: 2 },
      "&.Mui-checked": {
        color: "#EAB308",
      },
    },
    textAreaWrapper: {
      width: "-webkit-fill-available",
      marginLeft: { xs: "20px", md: "100px" },
    },
    deleteButtonBox: {
      display: "flex",
      justifyContent: "flex-end",
      mb: 1,
    },
    deleteButton: {
      padding: 0,
      minWidth: "auto",
      fontWeight: 500,
      textTransform: "none",
      fontFamily: "Jost",
      fontSize: "14px",
    },
    errorText: { color: "#d32f2f", fontSize: "0.75rem", mt: 1 },
    solutionBox: { display: "flex", width: "100%", alignItems: "center", mb: 2 },
    solutionTextArea: {
      width: "-webkit-fill-available",
      marginLeft: { xs: "10px", md: "100px" },
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: { xs: "column", sm: "row" },
      gap: 2,
      mt: 4,
    },
    submitButton: {
      px: { xs: 2, sm: 4 },
      width: { xs: "60%", sm: "auto" },
      textTransform: "none",
      backgroundColor: "#EAB308",
      color: "white",
      borderRadius: "10px",
      whiteSpace: "nowrap",
      fontFamily: "Lexend",
      fontWeight: 300,
      fontSize: "16px",
    },
    cancelButton: {
      color: "#fff",
      backgroundColor: "#BF0000",
      borderRadius: "10px",
      px: { xs: 2, sm: 4 },
      textTransform: "none",
      whiteSpace: "nowrap",
      fontFamily: "Lexend",
      fontWeight: 300,
      fontSize: "16px",
    },
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
  };


    return (
        <>
            <Navbar title="Test">
                <Grid container spacing={5}>
                    <Grid size={{ xs: 12, md: 4, sm: 4 }}>
                        <CustomTextField label='Duration(in minutes)*' required placeholder='Duration' name='duration' value={formData.duration} onChange={handleInputChange} error={!!errors.duration} helperText={errors.duration} />
                    </Grid>

                    {data.map((field, index) => (

                        <Grid key={index} size={{ xs: 12, md: 4, sm: 4 }}>

                            <CustomTextField label={field.label} required select placeholder={field.label} name={field.name} value={field.value} onChange={field.onChange} error={field.error} helperText={field.helperText} SelectProps={{ native: false }} disabled={field.disabled} >
                                {field.options.map((item, idx) => (
                                    <MenuItem key={idx} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                        </Grid>
                    ))}
                </Grid>
                <Grid size={{ xs: 12, md: 11, sm: 11 }} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} mt={4} >

                    <CustomButton children='Bulk upload' loading={false} bgColor='#EAB308' sx={{ width: { xs: '40%', md: '15%', sm: '20%' }, fontSize: { xs: '10px', md: '14px', sm: '14px' } }} />

                </Grid>

                <Grid size={{ xs: 12, sm: 11, md: 11 }} >
                    {/* Toggle Box */}
                    <Box sx={styles.toggleBox} onClick={handleToggle}>
                        <Grid sx={{ display: "flex", alignItems: "center", gap: 2 }} >
                            <CustomTypography
                                fontSize={{ xs: '12px', sm: '13px', md: '14px' }}
                                fontWeight={500}
                                text='Question'
                                mb={0} />
                        </Grid>

                        <IconButton>
                            {open? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </Box>

                    {/* Expandable Content */}
                    <Collapse in={open} >
                        <Grid container spacing={2}  sx={{ display: 'flex', justifyContent: "center", backgroundColor: '#F0F0F0' }}>
                            {/* Question & Our Answer Box */}
                            <Grid size={{ xs: 8, sm: 10, md: 10 }}>
                                <Grid size={{ xs: 12, md: 12 }} mb={4} mt={3}>
                                    <CustomTextArea value={formData.question} onChange={(e) => handleInputChange({ target: { name: "question", value: e.target.value } })} error={!!errors.question} helperText={errors.question} />
                                </Grid>
                                  <Divider sx={styles.divider} />
                                <Box sx={styles.optionsHeaderBox}>
                                    <CustomTypography text="Select Correct Option" />
                                    <CustomTypography text="Choices" />
                                    <Box sx={styles.addOptionBox}>
                                        <Button onClick={handleAddOption} variant="contained" fullWidth sx={styles.addOptionButton} > +Add Option</Button>
                                    </Box>
                                </Box>
                                <FormControl fullWidth sx={styles.radioFormControl} error={!!errors.correct}>
                                        <RadioGroup onChange={(e) => handleOptionCorrectChange(e.target.value)}>
                                          {formData.options.map((option, index) => (
                                            <Box key={option.id} sx={styles.optionItemBox}>
                                              <Radio value={`option-${index}`} checked={option.isCorrect} sx={styles.radio} />
                                              <Box sx={styles.textAreaWrapper}>
                                                <Box sx={styles.deleteButtonBox}>
                                                  <Button variant="text" color="primary" onClick={() => handleDeleteOption(index)} sx={styles.deleteButton}>Delete</Button>
                                                </Box>
                                                <CustomTextArea value={option.text} onChange={(e) => handleOptionTextChange(index, e.target.value)} error={!!errors[`option_${index}`]} helperText={errors[`option_${index}`]} />
                                              </Box>
                                            </Box>
                                          ))}
                                        </RadioGroup>
                                        {!!errors.correct && <Box sx={styles.errorText}>{errors.correct}</Box>}
                                </FormControl>
                                      <Divider sx={styles.dividerWithMargin} />
                                      <Box sx={styles.solutionBox} >
                                        <CustomTypography text="Solution" />
                                        <Box sx={styles.solutionTextArea}>
                                          <CustomTextArea value={formData.explanation} onChange={(e) => handleExplanationChange(e.target.value)}  />
                                        </Box>
                                      </Box>
                            </Grid>

                        </Grid>

                    </Collapse>
                </Grid>

            </Navbar>
        </>
    );
}
export default Test;