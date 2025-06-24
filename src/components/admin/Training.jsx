import { useEffect, useState } from "react";
import { Grid, Button, Box, FormControl, Divider, Radio, RadioGroup, MenuItem } from "@mui/material";
import CustomTypography from "./CustomTypography";
import CustomTextArea from "./CustomTextArea";
import { useLocation, useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../../api/axios";
import CustomButton from "./CustomButton";
import { snackbarEmitter } from "./CustomSnackbar";
import CustomTextField from "./CustomTextField";

function Training({syllabusName,bookName,chapterName, question, report = false, modalClose,}) {

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([1, 2]);
  const [formData, setFormData] = useState({
    syllabus: syllabusName || "",
    book: bookName || "",
    chapter: chapterName || "",
    question: question?.question || "",
    options: question?.options || [
      { id: 1, text: "", isCorrect: false },
      { id: 2, text: "", isCorrect: false },
    ],
    explanation: question?.explanation || "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.syllabus.trim()) newErrors.syllabus = "Syllabus is required.";
    if (!formData.book.trim()) newErrors.book = "Book is required.";
    if (!formData.chapter.trim()) newErrors.chapter = "Chapter is required.";
    if (!formData.question.trim()) newErrors.question = "Question is required.";
    if (!formData.explanation.trim())
      newErrors.explanation = "Explanation is required.";
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

  // =================== Input Handlers ===================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, ...(name === "syllabus" ? { book: "", chapter: "" } : name === "book" ? { chapter: "" } : {}) }));
    setErrors((prev) => ({...prev, [name]: undefined,}));
   
    if (name === "syllabus") {
      getBooks(value);
      setBook([]);
      setChapters([]); 
    }
   
    if (name === "book") {
      getChapters(formData.syllabus, value);
      setChapters([]); 
    }
  };

  const handleExplanationChange = (value) => {
    setFormData((prev) => ({ ...prev, explanation: value, }));
    setErrors((prev) => ({ ...prev,explanation: undefined,}));
  };

  // =================== Option Handlers ===================
  const handleOptionTextChange = (index, value) => {
    setFormData((prev) => {
      const newOptions = [...prev.options];
      newOptions[index] = { ...newOptions[index], text: value };
      return { ...prev, options: newOptions };
    });

    setErrors((prev) => ({...prev,[`option_${index}`]: undefined,}));
  };

  const handleOptionCorrectChange = (value) => {
    const index = parseInt(value.split("-")[1]);
    setFormData((prev) => {
      const newOptions = prev.options.map((option, i) => ({ ...option,isCorrect: i === index,}));
      return { ...prev, options: newOptions };
    });
    setErrors((prev) => ({ ...prev,correct: undefined,}));
  };

  const handleAddOption = () => {
    const newId = options.length + 1;
    setOptions((prev) => [...prev, newId]);
    setFormData((prev) => ({...prev,options: [...prev.options, { id: newId, text: "", isCorrect: false }],}));
  };

  const handleDeleteOption = (indexToDelete) => {
    setOptions((prev) => prev.filter((_, index) => index !== indexToDelete));
    setFormData((prev) => ({...prev,options: prev.options.filter((_, index) => index !== indexToDelete).map((option, index) => ({ ...option, id: index + 1 })),
    }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`option_${indexToDelete}`];
      return newErrors;
    });
  };

  // =================== Submit Handler ===================
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!validateForm()) {
      snackbarEmitter("Please fill all required fields", "error");
      return;
    }

    setLoading(true);
    const isUpdate = !!question?._id;
    const payload = isUpdate ? {questionId: question._id,question: formData.question, options: formData.options,explanation: formData.explanation,} : formData;
    // console.log("Submitting:", payload);
    try {
      const endpoint = isUpdate ? "/updateQuestion" : "/uploadQuestions";
      const response = await apiPost(endpoint, payload);
      if (response?.data?.status === 200) {
        setTimeout(() => {
          setLoading(false);
          snackbarEmitter(response.data.message, "success");

          if (report === true) {
            modalClose();
          } else {
           navigate("/admin/trainingQuestion", { state: { syllabusName: formData.syllabus, bookName: formData.book, chapterName: formData.chapter } });

          }

          if (!isUpdate) {
           setFormData({ syllabus: "", book: "", chapter: "", question: "", options: [{ id: 1, text: "", isCorrect: false }, { id: 2, text: "", isCorrect: false }], explanation: "" });
            setErrors({});
          }
        }, 1500);
      } else {
        setLoading(false);
        console.error("Submission failed with response:", response);
        snackbarEmitter(response.data.message, "error");
      }
    } catch (error) {
      setLoading(false);
      console.error("Submission error:", error);
      snackbarEmitter("Something went wrong", "error");
    }
  };



  const [syllabus, setSyllabus] = useState([]);

  const getSyllabus = async () => {
    try {
      const response = await apiGet("/getSyllabus");
      if (response.data.status === 200) {
        const titles = response.data.data.map((item) => item.title).filter(Boolean);
        setSyllabus(titles);
        // console.log("Response for Syllabus :", response.data);
      } else {
        snackbarEmitter(response.data.message, "error");
      }
    } catch (error) {
      snackbarEmitter("Something went wrong", "error");
    }
  };



  const [book, setBook] = useState([]);
  const getBooks = async (syllabus = "") => {
  try {
    const response = await apiGet("/getBooks");

    if (response.data.status === 200) {
      const booksList = response.data.books.filter(book => book.syllabusId?.title === syllabus).map(book => book.bookTitle).filter(Boolean);
      setBook(booksList);
      // console.log("Filtered Books:", booksList);
    } else {
      snackbarEmitter(response.data.message, "error");
      setBook([]);
    }
  } catch (error) {
    snackbarEmitter("Something went wrong", "error");
    setBook([]);
  }
};


  const [chapters, setChapters] = useState([]);


  const getChapters = async (syllabus = "", book = "") => {
  try {
    const response = await apiGet(syllabus && book  ? `/getChapters?syllabus=${encodeURIComponent(syllabus)}&book=${encodeURIComponent(book)}`: "/getChapters");

    if (response.data.status === 200) {
      const chapterList = response.data.chapters.filter(item =>item.book === book && item.chaptername).map(item => item.chaptername);

      // console.log("Filtered Chapters:", chapterList);
      setChapters(chapterList);
    } else {
      snackbarEmitter(response.data.message, "error");
      setChapters([]);
    }
  } catch (error) {
    snackbarEmitter("Something went wrong", "error");
    setChapters([]);
  }
};


  useEffect(() => {getSyllabus(); getBooks();  getChapters(); }, []);

  const data = [
  { label: "Syllabus", name: "syllabus", value: formData.syllabus, onChange: handleInputChange, error: !!errors.syllabus, helperText: errors.syllabus, options: syllabus, disabled: report },
  { label: "Book", name: "book", value: formData.book, onChange: handleInputChange, error: !!errors.book, helperText: errors.book, options: book, disabled: report || !formData.syllabus },
  { label: "Chapter", name: "chapter", value: formData.chapter, onChange: handleInputChange, error: !!errors.chapter, helperText: errors.chapter, options: chapters, disabled: report || !formData.book }
];




  const styles = {
    addImageBox: { display: "flex", justifyContent: "flex-end" },
    addImageButton: {
      backgroundColor: "#EAB308",
      color: "white",
      borderRadius: "10px",
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
      fontWeight: "bold",
    },
    errorText: { color: "#d32f2f", fontSize: "0.75rem", mt: 1 },
    solutionBox: { display: "flex", width: "100%", alignItems: "center" },
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
    },
    cancelButton: {
      color: "#fff",
      fontWeight: "bold",
      backgroundColor: "#BF0000",
      borderRadius: "10px",
      px: { xs: 2, sm: 4 },
    },
  };

  return (


    <>
      <Grid container spacing={2}>
        {data.map((field, index) => (
          <Grid key={index} size={{ xs: 12, md: 4 }}>
            <CustomTextField label={field.label} required select placeholder={field.label} name={field.name} value={field.value} onChange={field.onChange} error={field.error} helperText={field.helperText} SelectProps={{ native: false }} disabled={field.disabled}>
              {field.options.map((item, idx) => (
                <MenuItem key={idx} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
        ))}

        <Grid size={{ xs: 12 }}>
          <Box sx={styles.addImageBox}>
            <Button variant="contained" sx={styles.addImageButton}>+Add Image</Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={styles.questionAreaGrid}>
        <Grid size={{ xs: 12, md: 12 }}>
          <CustomTextArea value={formData.question} onChange={(e) => handleInputChange({ target: { name: "question", value: e.target.value },})} error={!!errors.question} helperText={errors.question}/>
        </Grid>
      </Grid>

      <Divider sx={styles.divider} />

      <Box sx={styles.optionsHeaderBox}>
        <CustomTypography text="Selected Correct Options" />
        <CustomTypography text="Choices" />
        <Box sx={styles.addOptionBox}>
          <Button onClick={handleAddOption} variant="contained" fullWidth sx={styles.addOptionButton}>+Add Option</Button>
        </Box>
      </Box>

      <FormControl fullWidth sx={styles.radioFormControl}  error={!!errors.correct}>
        <RadioGroup onChange={(e) => handleOptionCorrectChange(e.target.value)}>
          {formData.options.map((option, index) => (
            <Box key={option.id} sx={styles.optionItemBox}>
              <Radio value={`option-${index}`} checked={option.isCorrect} sx={styles.radio} />
              <Box sx={styles.textAreaWrapper}>
                <Box sx={styles.deleteButtonBox}>
                  <Button variant="text" color="primary" onClick={() => handleDeleteOption(index)} sx={styles.deleteButton} >
                    Delete
                  </Button>
                </Box>
                <CustomTextArea value={option.text} onChange={(e) => handleOptionTextChange(index, e.target.value)} error={!!errors[`option_${index}`]} helperText={errors[`option_${index}`]} />

              </Box>
            </Box>
          ))}
        </RadioGroup>
        {!!errors.correct && <Box sx={styles.errorText}>{errors.correct}</Box>}
      </FormControl>

      <Divider sx={styles.dividerWithMargin} />

      <Box sx={styles.solutionBox}>
        <CustomTypography text="Solution" />
        <Box sx={styles.solutionTextArea}>
          <CustomTextArea value={formData.explanation} onChange={(e) => handleExplanationChange(e.target.value)} error={!!errors.explanation} helperText={errors.explanation} />
        </Box>
      </Box>

      <Box sx={styles.buttonGroup}>
        <CustomButton onClick={handleSubmit} loading={loading} bgColor="#EAB308" borderRadius="10px" sx={styles.submitButton}>{question?._id ? "Update Question" : "Add Question"}</CustomButton>
        <Button variant="outlined" sx={styles.cancelButton}> Cancel</Button>
      </Box>
    </>
  );
}

export default Training;


