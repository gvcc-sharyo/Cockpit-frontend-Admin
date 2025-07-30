import { apiDelete, apiGet, apiPost } from "../../../../api/axios";
import CustomButton from "../../../../components/admin/CustomButton";
import { snackbarEmitter } from "../../../../components/admin/CustomSnackbar";
import CustomTable from "../../../../components/admin/CustomTable";
import CustomTextField from "../../../../components/admin/CustomTextField";
import CustomTypography from "../../../../components/admin/CustomTypography";
import Navbar from "../../../../components/admin/Navbar";

function Test() {
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

  const [test, setTest] = useState([]);

  const getTest = async () => {
    try {
      const response = await apiGet("/getTestAll");
    //   console.log("Fetched students:", response);
      if (response.status === 200) {
        setTest(response.data.data);
      }
    } catch (error) {
    //   console.error("Error fetching students:", error);
      snackbarEmitter("Something went wrong", "error");
    }
  };

  useEffect(() => {
    getTest();
    getSyllabus();
    getBooks();
  }, []);

  const [syllabus, setSyllabus] = useState([]);

  const getSyllabus = async () => {
    try {
      const response = await apiGet("/getSyllabus");
      //   console.log("Fetched syllabus:", response);
      if (response.status === 200) {
        setSyllabus(response.data.data);
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await apiGet("/getBooks");
      console.log("Fetched Books:", response);
      if (response.status === 200) {
        setBooks(response.data.books);
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await apiPost("/createTest", formData);
      console.log("Success:", response);
      getTest();

      // Reset form after successful submission
      setFormData({
        testName: "",
        syllabusId: "",
        bookId: "",
        duration: "",
        marks: "",
      });
      setErrors({});
      handleModalClose();
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

 const handleDelete = async (id) => {
  try {
    const response = await apiDelete(`/deleteTest/${id}`);
    console.log(response);
    getTest();
  } catch (error) {
    console.error("Error:", error);
  }
};


  const tableHeaders = [
    "Sr No",
    "Test Name",
    "Marks",
    "Duration (in Minutes)",
    "Action",
  ];

  const tableData = test.map((test) => ({
    row: [
      <Box>{test.testName}</Box>,
      <Box>{test.marks}</Box>,
      <Box>{test.duration}</Box>,
      <Box gap={1}>
        <IconButton onClick={() => console.log(test._id)} color="primary">
          <Visibility />
        </IconButton>
        <IconButton onClick={() => handleDelete(test._id)} color="error">
          <Delete />
        </IconButton>
      </Box>,
    ],
  }));

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
              text="Test"
              fontWeight={500}
              fontSize={{ xs: "18px", md: "22px", sm: "20px" }}
            />
          </Grid>
          <Grid>
            <CustomButton
              children="+ Add Test"
              onClick={handleModalOpen}
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
export default Test;
