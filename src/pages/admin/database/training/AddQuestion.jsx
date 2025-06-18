import Navbar from "../../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Box,
  FormControl,
  Divider,
  Radio,
  RadioGroup,
} from "@mui/material";
import CustomTextField from "../../../../components/admin/CustomTextField";
import CustomTypography from "../../../../components/admin/CustomTypography";
import CustomTextArea from "../../../../components/admin/CustomTextArea";
import { useLocation } from "react-router-dom";
import { apiPostToken } from "../../../../api/axios";
function AddQuestion() {
  const location = useLocation();
  const { syllabusName, bookName, chapterName, question } =
    location.state || {};
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
  const handleSubmit = async () => {
    const isUpdate = !!question?._id;
    const payload = isUpdate
      ? {
          questionId: question._id,
          question: formData.question,
          options: formData.options,
          explanation: formData.explanation,
        }
      : formData;
    console.log("Submitting:", payload);
    try {
      const endpoint = isUpdate ? "/updateQuestion" : "/uploadQuestions";
      const response = await apiPostToken(endpoint, payload);
      console.log("Response:", response);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };
  useEffect(() => {
    if (location.state) {
      console.log("Received state from navigation:");
      console.log("Syllabus:", location.state.syllabusName);
      console.log("Book:", location.state.bookName);
      console.log("Chapter:", location.state.chapterName);
      console.log("Question object:", location.state.question);
    } else {
      console.log("No state received from navigation.");
    }
  }, []);
  return (
    <>
      <Navbar title="Training">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Syllabus"
              required
              placeholder="Syllabus"
              name="syllabus"
              value={formData.syllabus}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Book"
              required
              placeholder="Book"
              name="book"
              value={formData.book}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Chapter"
              required
              placeholder="Chapter"
              name="chapter"
              value={formData.chapter}
              onChange={handleInputChange}
            />
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
        <FormControl fullWidth sx={{ mt: 2 }}>
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
          <Button
            variant="contained"
            fullWidth={{ xs: true, sm: false }}
            sx={{
              backgroundColor: "#EAB308",
              color: "white",
              fontWeight: "bold",
              borderRadius: "10px",
              px: { xs: 2, sm: 4 },
            }}
            onClick={handleSubmit}
          >
            {question?._id ? "Update Question" : "Add Question"}
          </Button>
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
        </Box>
      </Navbar>
    </>
  );
}
export default AddQuestion;