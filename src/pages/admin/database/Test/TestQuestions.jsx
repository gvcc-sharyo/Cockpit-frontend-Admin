import { EditSquare } from "@mui/icons-material";
import { apiDelete, apiGet, apiPost } from "../../../../api/axios";
import CustomButton from "../../../../components/admin/CustomButton";
import { snackbarEmitter } from "../../../../components/admin/CustomSnackbar";
import CustomTable from "../../../../components/admin/CustomTable";
import CustomTextField from "../../../../components/admin/CustomTextField";
import CustomTypography from "../../../../components/admin/CustomTypography";
import Navbar from "../../../../components/admin/Navbar";

function TestQuestions() {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const [formData, setFormData] = useState({
    testName: "",
    duration: "",
    marks: "",
    syllabusId: "",
    bookId: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.testName.trim()) newErrors.testName = "Test Name is required";
    if (!formData.syllabusId) newErrors.syllabusId = "Syllabus is required";
    if (!formData.bookId) newErrors.bookId = "Book is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.marks.trim()) newErrors.marks = "Marks are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [testQuestions, setTestQuestions] = useState([]);

  const getTestQuestions = async () => {
    try {
      const response = await apiGet(`/getTestQuestionsByTestId/${testId}`);
    //   console.log("Fetched students:", response);
      if (response.data.status === 200) {
        setTest(response.data.data);
      }
    } catch (error) {
    //   console.error("Error fetching students:", error);
      snackbarEmitter("Something went wrong", "error");
    }
  };

  useEffect(() => {
    getTestQuestions();
  }, []);



  const tableHeaders = [
    "Sr No",
    "Questions",
    "Active",
    "Action",
  ];

  const tableData = testQuestions.map((testquestions) => ({
    row: [
      <Box>{testquestions.question}</Box>,
      <CustomButton children={testquestions.isactive === true ? 'Active' : 'Inactive'} onClick={() => handleStatusClick(testquestions)} loading={false} bgColor={testquestions.isactive === true ? '#109CF1' : '#D61508'} sx={{ width: { xs: '20%', sm: '20%', md: '20%' }, fontSize: { xs: '10px', sm: '11px', md: '12px' }, }} />,
      <Box>
        <IconButton  color="primary">
          <EditSquareIcon sx={{ color: '#EAB308', fontSize: { xs: '18px', sm: '20px' } }} />
        </IconButton>
      </Box>,
    ],
  }));

  const handleEditClick = (question) => {
        navigate('/admin/addQuestion/', {
            state: {
                syllabusName: syllabusName,
                bookName: bookName,
                chapterName: chapterName,
                question: question,
                syllabusId: syllabusid,
                chapterId: chapterId,
                bookId: bookid
            }
        });
    };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      px:2
    },
    dialogTitle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    formGrid: {
      display: "flex",
      gap: 2,
      mb: 3,
      justifyContent: { md: "center", xs: "left" },
    },
  };

  return (
    <>
      <Navbar title="Test">
        <Grid container sx={styles.container} size={{ xs: 12, sm: 12, md: 12 }}>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <CustomTypography
              text="Test Questions"
              fontWeight={500}
              fontSize={{ xs: "18px", md: "22px", sm: "20px" }}
            />
          </Grid>
          <Grid>
            <CustomButton
              children="+ Add Questions"
            //   onClick={handleNavigate}
              loading={false}
              bgColor="#EAB308"
              sx={{
                width: { xs: "100%", md: "100%", sm: "100%" },
                fontSize: { xs: "12px", md: "14px", sm: "14px" },
              }}
            />
          </Grid>
        </Grid>

        <Grid mt={2} size={{p:2}}>
          <CustomTable
            maxWidth={"100%"}
            tableHeaders={tableHeaders}
            tableData={tableData}
            //   handleEdit={handleEdit}
          />
        </Grid>

        <Dialog open={openModal} onClose={handleModalClose} fullWidth>
          <DialogTitle sx={styles.dialogTitle}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Add Test
            </Typography>
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2} sx={styles.formGrid}>
              <Grid size={{ xs: 12, md: 10 }}>
                <CustomTextField
                  label="Test Name*"
                  name="testName"
                  placeholder="Enter"
                  value={formData.testName}
                  onChange={(e) =>
                    setFormData({ ...formData, testName: e.target.value })
                  }
                  error={!!errors.testName}
                  helperText={errors.testName}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 5 }}>
                <CustomTextField
                  label="Syllabus*"
                  select
                  value={formData.syllabusId}
                  onChange={(e) =>
                    setFormData({ ...formData, syllabusId: e.target.value })
                  }
                  error={!!errors.syllabusId}
                  helperText={errors.syllabusId}
                >
                  {syllabus.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>

              <Grid size={{ xs: 12, md: 5 }}>
                <CustomTextField
                  label="Books*"
                  select
                  value={formData.bookId}
                  onChange={(e) =>
                    setFormData({ ...formData, bookId: e.target.value })
                  }
                  error={!!errors.bookId}
                  helperText={errors.bookId}
                >
                  {books.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.bookTitle}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>

              <Grid size={{ xs: 12, md: 5 }}>
                <CustomTextField
                  label="Duration* (in Minutes)"
                  name="duration"
                  placeholder="Enter"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  error={!!errors.duration}
                  helperText={errors.duration}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 5 }}>
                <CustomTextField
                  label="Marks*"
                  name="marks"
                  placeholder="Enter"
                  value={formData.marks}
                  onChange={(e) =>
                    setFormData({ ...formData, marks: e.target.value })
                  }
                  error={!!errors.marks}
                  helperText={errors.marks}
                />
              </Grid>

              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CustomButton
                  children="Add"
                  loading={false}
                  bgColor="#EAB308"
                  sx={{ width: "50%" }}
                  onClick={handleSubmit} 
                />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Navbar>
    </>
  );
}
export default TestQuestions;
