import Navbar from "../../../components/admin/Navbar";
import { apiGet, apiPostUpload, apiPost } from "../../../api/axios";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomButton from "../../../components/admin/CustomButton";
import CustomTypography from "../../../components/admin/CustomTypography";

function TrainingQuestion() {

    const [questions, setQuestions] = useState([]);

    const location = useLocation();
    const { category, syllabusName, bookName, chapterName, activeBook, syllabusid, chapterId, bookid } = location.state || {};

    console.log("syllabus id", syllabusid);
    console.log("chapter id", chapterId);
    console.log("book id", bookid);



    const fetchQuestions = async () => {
        try {
            const response = await apiGet(`/questionsByChapterId/${chapterId}`);
            if (response.data.status === 200 && response.data.data.length === 0) {
                snackbarEmitter('No questions found', 'info');
            }

            else if (response.data.status === 200 && response.data.data.length > 0) {
                setQuestions(response.data.data);
            }
            else {
                snackbarEmitter(response.data.message, 'error');
            }

        } catch (error) {
            snackbarEmitter('Something went wrong', 'error');
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [])

    // const filteredQuestions = questions.filter(q => q.syllabus === syllabusName && q.book === bookName && q.chapter === chapterName);

    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate('/admin/addQuestion',
            {
                state: {
                    syllabusName: syllabusName,
                    bookName: bookName,
                    chapterName: chapterName,
                    syllabusId: syllabusid,
                    chapterId: chapterId,
                    bookId: bookid
                }
            },);
    }

    //bulk upload
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleOpenUploadDialog = () => setUploadDialogOpen(true);
    const handleCloseUploadDialog = () => {
        setUploadDialogOpen(false);
        setSelectedFile(null);
    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const [bulkLoad, setBulkLoad] = useState(false);

    const handleUpload = async () => {
        if (!selectedFile) {
            snackbarEmitter('File not selected', 'warning');
            return;
        }

        setBulkLoad(true);

        try {

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('syllabus', syllabusName);
            formData.append('book', bookName);
            formData.append('chapter', chapterName);
            formData.append('chapterId', chapterId);
            formData.append('syllabusId', syllabusid);
            formData.append('bookId', bookid);

            const response = await apiPostUpload('/uploadQuestionsBulk', formData);

            setTimeout(() => {
                setBulkLoad(false);
                if (response.data.status === 200) {
                    snackbarEmitter(response.data.message, 'success');
                    handleCloseUploadDialog();
                }
                else {
                    snackbarEmitter(response.data.message, 'error');
                    handleCloseUploadDialog();
                }
                fetchQuestions();

            }, 500);


        } catch (error) {

            snackbarEmitter('Something went wrong', 'error');
            fetchQuestions();
        }
    };

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

    const [openStatusModal, setOpenStatusModal] = useState(false);
    const handleStatusModalOpen = () => setOpenStatusModal(true);
    const handleStatusModalClose = () => setOpenStatusModal(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        questionID: '',
        question: '',
        options: [],
        explanation: '',
        isactive: false

    });

    const handleStatusClick = (question) => {
        setFormData({
            questionID: question._id,
            question: question.question,
            options: question.options,
            explanation: question.explanation,
            isactive: question.isactive === true ? false : true
        });
        setOpenStatusModal(true);
    };

    const updateQuestion = async () => {

        const req = {
            questionId: formData.questionID,
            question: formData.question,
            options: formData.options,
            explanation: formData.explanation,
            isactive: formData.isactive
        }

        console.log('is active', req.isactive);



        setLoading(true);


        try {
            const response = await apiPost('/updateQuestion', req);

            setTimeout(() => {
                setLoading(false);
                if (response.data.status === 200) {
                    snackbarEmitter(response.data.message, 'success');
                    handleStatusModalClose();
                    fetchQuestions();
                }
                else {
                    snackbarEmitter(response.data.message, 'error');
                    handleStatusModalClose();
                    fetchQuestions();
                }
            }, 500)

        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                snackbarEmitter('Something went wrong', 'error');
            }, 500)

        }
    }

    const handleNavigate = () => {
        navigate('/admin/trainingChapter', {
            state: {
                syllabusTitle: syllabusName,
                syllabusID: syllabusid,
                category: category,
                selectBook: activeBook,
                activeBookID: bookid

            }
        });
    }

    return (

        <Navbar title={'Syllabus'}>
            <Grid
                container
                sx={{
                    flexDirection: 'column',
                    position: 'relative',
                    backgroundColor: '#f8f9fa',
                    padding: '10px',
                }}
            >

                <Grid sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} mb={2}>
                    <CustomTypography text={syllabusName} onClick={() => navigate('/admin/trainingsyllabus')} sx={{ fontSize: { xs: '10px', md: '14px', sm: '14px' }, cursor: 'pointer', textDecoration: 'underline' }} />
                    <CustomTypography text='>' sx={{ fontSize: { xs: '10px', md: '14px', sm: '14px' } }} />
                    <CustomTypography text={bookName} onClick={handleNavigate} sx={{ fontSize: { xs: '10px', md: '14px', sm: '14px' }, cursor: 'pointer', textDecoration: 'underline' }} />
                    <CustomTypography text='>' sx={{ fontSize: { xs: '10px', md: '14px', sm: '14px' } }} />
                    <CustomTypography text={chapterName} onClick={handleNavigate} sx={{ fontSize: { xs: '10px', md: '14px', sm: '14px' }, cursor: 'pointer', textDecoration: 'underline' }} />
                </Grid>
                {/* Header Buttons */}
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        mb: 2,
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: { xs: '16px', sm: '20px', md: '22px' },
                            fontWeight: 'bold',
                            mb: { xs: 1, sm: 0 },
                        }}
                    >
                        Questions
                    </Typography>

                    <Grid size={{ xs: 7, md: 4, sm: 5 }} sx={{ display: 'flex', gap: 2 }}>

                        <Grid >
                            <CustomButton children='Bulk upload' onClick={handleOpenUploadDialog} loading={false} bgColor='#EAB308' sx={{ width: { xs: '100%', md: '100%', sm: '100%' }, fontSize: { xs: '10px', md: '14px', sm: '14px' } }} />
                        </Grid>

                        <Grid >
                            <CustomButton children='+ Add Questions' onClick={handleAddClick} loading={false} bgColor='#EAB308' sx={{ width: { xs: '100%', md: '100%', sm: '100%' }, fontSize: { xs: '10px', md: '14px', sm: '14px' } }} />
                        </Grid>

                    </Grid>
                </Grid>

                {/* Table Section */}
                <Grid item xs={12} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            boxShadow: 'none',
                            maxHeight: 400,
                            overflowY: 'auto',
                            overflowX: { xs: 'auto', md: 'visible' },
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {['Ques. No', 'Questions', 'Category Name', 'Status', 'Action'].map((label) => (
                                        <TableCell key={label}>
                                            <Typography fontWeight="bold" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                                                {label}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions.length > 0 && questions.map((question, index) => (
                                    <TableRow key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{question.question}</TableCell>
                                        <TableCell>{category}</TableCell>
                                        <TableCell>
                                            {/* <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: question.isactive === true ? '#109CF1' : 'red',
                                                    color: 'white',
                                                    fontSize: { xs: '10px', sm: '12px' },
                                                    px: 1.5,
                                                    py: 0.5,
                                                    minWidth: 'auto',
                                                }}
                                                onClick={() => handleStatusClick(question)}
                                            >
                                                {question.isactive === true ? 'Active' : 'Inactive'}
                                            </Button> */}
                                            <CustomButton children={question.isactive === true ? 'Active' : 'Inactive'} onClick={() => handleStatusClick(question)} loading={false} bgColor={question.isactive === true ? '#109CF1' : '#D61508'} sx={{ width: { xs: '20%', sm: '20%', md: '20%' }, fontSize: { xs: '10px', sm: '11px', md: '12px' }, }} />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton size="small" onClick={() => handleEditClick(question)}>
                                                <EditSquareIcon
                                                    sx={{ color: 'orange', fontSize: { xs: '18px', sm: '20px' } }}
                                                />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>


            <Dialog open={uploadDialogOpen} onClose={handleCloseUploadDialog}>
                <DialogTitle>Upload File</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Choose a file to upload questions in bulk.
                    </Typography>
                    <Button
                        component="label"
                        variant="contained"
                        sx={{ mt: 1, p: 1, backgroundColor: '#EAB308', color: 'white' }}
                        startIcon={<CloudUploadIcon />}

                    >
                        <input
                            type="file"
                            hidden
                            accept=".json"
                            onChange={handleFileSelect}
                        />
                    </Button>
                    {selectedFile && (
                        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                            {selectedFile.name}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    {/* <Button
                        variant="contained"
                        sx={{ backgroundColor: 'orange', color: 'white' }}
                        onClick={handleUpload}
                    >
                        Upload
                    </Button> */}
                    <CustomButton children='Upload' onClick={handleUpload} loading={bulkLoad} bgColor='#EAB308' sx={{ width: { xs: '90%', md: '50%', sm: '60%' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }} />
                    {/* <Button onClick={handleCloseUploadDialog} >
                        Cancel
                    </Button> */}
                    <CustomButton children='Cancel' onClick={handleCloseUploadDialog} loading={false} bgColor='#CB1D02' sx={{ width: { xs: '90%', md: '50%', sm: '60%' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }} />
                </DialogActions>
            </Dialog>

            <Dialog open={openStatusModal} onClose={handleStatusModalClose} maxWidth="md">
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Status update</Typography>
                    <IconButton onClick={handleStatusModalClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>

                    <Grid container sx={{ display: 'flex', alignItems: 'center', gap: 3 }} >
                        <Grid item>
                            <Typography sx={{ fontSize: '16px' }}>
                                Do you want to change the status?
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid item>

                                    <CustomButton children='Yes' onClick={updateQuestion} loading={loading} bgColor='#EAB308' sx={{ width: '20%' }} />
                                </Grid>
                                <Grid item>
                                    <CustomButton children='No' onClick={handleStatusModalClose} bgColor='#BF0000' sx={{ width: '20%' }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>


        </Navbar>

    );
}

export default TrainingQuestion;
