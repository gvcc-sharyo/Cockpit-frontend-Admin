import Navbar from "../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Box,
  FormControl,
  Divider,
  Radio,
  RadioGroup,
  MenuItem,
} from "@mui/material";
import CustomTypography from "../../../components/admin/CustomTypography";
import CustomTextArea from "../../../components/admin/CustomTextArea";
import { useLocation, useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../../../api/axios";
import CustomButton from "../../../components/admin/CustomButton";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomTextField from "../../../components/admin/CustomTextField";
import Training from "../../../components/admin/Training";

function AddQuestion() {
  const location = useLocation();

  const { syllabusName, bookName, chapterName, question } = location.state || {};

  // const [loading, setLoading] = useState(false);
  // const [options, setOptions] = useState([1, 2]);
  // const [formData, setFormData] = useState({
  //   syllabus: syllabusName || "",
  //   book: bookName || "",
  //   chapter: chapterName || "",
  //   question: question?.question || "",
  //   options: question?.options || [
  //     { id: 1, text: "", isCorrect: false },
  //     { id: 2, text: "", isCorrect: false },
  //   ],
  //   explanation: question?.explanation || "",
  // });

  // const [errors, setErrors] = useState({});

  // const validateForm = () => {
  //   const newErrors = {};
  //   if (!formData.syllabus.trim()) newErrors.syllabus = "Syllabus is required.";
  //   if (!formData.book.trim()) newErrors.book = "Book is required.";
  //   if (!formData.chapter.trim()) newErrors.chapter = "Chapter is required.";
  //   if (!formData.question.trim()) newErrors.question = "Question is required.";
  //   if (!formData.explanation.trim())
  //     newErrors.explanation = "Explanation is required.";
  //   formData.options.forEach((opt, i) => {
  //     if (!opt.text.trim())
  //       newErrors[`option_${i}`] = "Option text is required.";
  //   });
  //   if (!formData.options.some((opt) => opt.isCorrect)) {
  //     newErrors.correct = "Please select the correct answer.";
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // // =================== Input Handlers ===================
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  //   setErrors((prev) => ({
  //     ...prev,
  //     [name]: undefined,
  //   }));
  // };

  // const handleExplanationChange = (value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     explanation: value,
  //   }));
  //   setErrors((prev) => ({
  //     ...prev,
  //     explanation: undefined,
  //   }));
  // };

  // // =================== Option Handlers ===================
  // const handleOptionTextChange = (index, value) => {
  //   setFormData((prev) => {
  //     const newOptions = [...prev.options];
  //     newOptions[index] = { ...newOptions[index], text: value };
  //     return { ...prev, options: newOptions };
  //   });
  //   setErrors((prev) => ({
  //     ...prev,
  //     [`option_${index}`]: undefined,
  //   }));
  // };

  // const handleOptionCorrectChange = (value) => {
  //   const index = parseInt(value.split("-")[1]);
  //   setFormData((prev) => {
  //     const newOptions = prev.options.map((option, i) => ({
  //       ...option,
  //       isCorrect: i === index,
  //     }));
  //     return { ...prev, options: newOptions };
  //   });
  //   setErrors((prev) => ({
  //     ...prev,
  //     correct: undefined,
  //   }));
  // };

  // const handleAddOption = () => {
  //   const newId = options.length + 1;
  //   setOptions((prev) => [...prev, newId]);
  //   setFormData((prev) => ({
  //     ...prev,
  //     options: [...prev.options, { id: newId, text: "", isCorrect: false }],
  //   }));
  // };

  // const handleDeleteOption = (indexToDelete) => {
  //   setOptions((prev) => prev.filter((_, index) => index !== indexToDelete));
  //   setFormData((prev) => ({
  //     ...prev,
  //     options: prev.options
  //       .filter((_, index) => index !== indexToDelete)
  //       .map((option, index) => ({ ...option, id: index + 1 })),
  //   }));
  //   setErrors((prev) => {
  //     const newErrors = { ...prev };
  //     delete newErrors[`option_${indexToDelete}`];
  //     return newErrors;
  //   });
  // };

  // // =================== Submit Handler ===================
  // const navigate = useNavigate();

  // const handleSubmit = async () => {
  //   if (!validateForm()) {
  //     snackbarEmitter("Please fill all required fields", "error");
  //     return;
  //   }

  //   setLoading(true);
  //   const isUpdate = !!question?._id;
  //   const payload = isUpdate
  //     ? {
  //         questionId: question._id,
  //         question: formData.question,
  //         options: formData.options,
  //         explanation: formData.explanation,
  //       }
  //     : formData;
  //   console.log("Submitting:", payload);
  //   try {
  //     const endpoint = isUpdate ? "/updateQuestion" : "/uploadQuestions";
  //     const response = await apiPost(endpoint, payload);
  //     if (response?.data?.status === 200) {
  //       setTimeout(() => {
  //         setLoading(false);
  //         snackbarEmitter(response.data.message, "success");
  //         navigate("/admin/trainingQuestion", {
  //           state: {
  //             syllabusName: formData.syllabus,
  //             bookName: formData.book,
  //             chapterName: formData.chapter,
  //           },
  //         });
  //         if (!isUpdate) {
  //           setFormData({
  //             syllabus: "",
  //             book: "",
  //             chapter: "",
  //             question: "",
  //             options: [
  //               { id: 1, text: "", isCorrect: false },
  //               { id: 2, text: "", isCorrect: false },
  //             ],
  //             explanation: "",
  //           });
  //           setErrors({});
  //         }
  //       }, 1500);
  //     } else {
  //       setLoading(false);
  //       console.error("Submission failed with response:", response);
  //       snackbarEmitter(response.data.message, "error");
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Submission error:", error);
  //     snackbarEmitter("Something went wrong", "error");
  //   }
  // };

  // const [syllabus, setSyllabus] = useState([]);
  // const getSyllabus = async () => {
  //   try {
  //     const response = await apiGet("/getSyllabus");
  //     const titles = response.data.data
  //       .map((item) => item.title)
  //       .filter(Boolean);
  //     setSyllabus(titles);
  //     console.log(titles);
  //   } catch (error) {
  //     console.error("Error fetching syllabus:", error);
  //   }
  // };

  // const [book, setBook] = useState([]);
  // const getBooks = async () => {
  //   try {
  //     const response = await apiGet("/getBooks");
  //     const booksList = response.data.books
  //       .map((item) => item.bookTitle)
  //       .filter(Boolean);
  //     setBook(booksList);
  //     console.log(booksList);
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //   }
  // };

  // const [chapters, setChapters] = useState([]);
  // const getChapters = async () => {
  //   try {
  //     const response = await apiGet("/getChapters");
  //     const chapterList = response.data.chapters.map(
  //       (item) => item.chaptername
  //     );
  //     console.log(chapterList);
  //     setChapters(chapterList);
  //     // const booksList = response.data.books.map((item) => item.bookTitle).filter(Boolean);
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //   }
  // };

  // useEffect(() => {
  //   getSyllabus();
  //   getBooks();
  //   getChapters();
  // }, []);

  return (
    <>
      <Navbar title="Syllabus">
        <Training syllabusName={syllabusName} bookName={bookName} chapterName={chapterName} question={question}/>
        {/* <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Syllabus"
              select
              required
              placeholder="Syllabus"
              name="syllabus"
              value={formData.syllabus}
              onChange={handleInputChange}
              error={!!errors.syllabus}
              helperText={errors.syllabus}
              SelectProps={{ native: false }}
            >
              {syllabus.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Book"
              required
              select
              placeholder="Book"
              name="book"
              value={formData.book}
              onChange={handleInputChange}
              error={!!errors.book}
              helperText={errors.book}
              SelectProps={{ native: false }}
            >
              {book.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Chapter"
              required
              placeholder="Chapter"
              name="chapter"
              value={formData.chapter}
              onChange={handleInputChange}
              error={!!errors.chapter}
              helperText={errors.chapter}
              select
              SelectProps={{ native: false }}
            >
              {chapters.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
              </CustomTextField>



          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#EAB308",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                +Add Image
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid size={{ xs: 12, md: 12 }}>
            <CustomTextArea
              value={formData.question}
              onChange={(e) =>
                handleInputChange({
                  target: { name: "question", value: e.target.value },
                })
              }
              error={!!errors.question}
              helperText={errors.question}
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
          <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
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
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.correct}>
          <RadioGroup
            onChange={(e) => handleOptionCorrectChange(e.target.value)}
          >
            {formData.options.map((option, index) => (
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
                    error={!!errors[`option_${index}`]}
                    helperText={errors[`option_${index}`]}
                  />
                </Box>
              </Box>
            ))}
          </RadioGroup>
          {!!errors.correct && (
            <Box sx={{ color: "#d32f2f", fontSize: "0.75rem", mt: 1 }}>
              {errors.correct}
            </Box>
          )}
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
              error={!!errors.explanation}
              helperText={errors.explanation}
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
          <CustomButton
            onClick={handleSubmit}
            loading={loading}
            bgColor="#EAB308"
            borderRadius="10px"
            sx={{
              px: { xs: 2, sm: 4 },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {question?._id ? "Update Question" : "Add Question"}
          </CustomButton>
          <Button
            variant="outlined"
            fullWidth={{ xs: true, sm: false }}
            sx={{
              color: "#fff",
              fontWeight: "bold",
              backgroundColor: "#BF0000",
              borderRadius: "10px",
              px: { xs: 2, sm: 4 },
            }}
          >
            Cancel
          </Button>
        </Box> */}
      </Navbar>
    </>
  );
}
export default AddQuestion;