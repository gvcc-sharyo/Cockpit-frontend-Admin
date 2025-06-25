import Navbar from "../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    Container,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { apiGet, apiPostUpload, apiPost } from "../../../api/axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomButton from "../../../components/admin/CustomButton";
import CloseIcon from '@mui/icons-material/Close';

function TrainingQuestion() {

    const [questions, setQuestions] = useState([]);

    const location = useLocation();
    const { syllabusName, bookName, chapterName } = location.state || {};

    const fetchQuestions = async () => {
        try {
            const response = await apiGet('/questions');
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

    const filteredQuestions = questions.filter(q => q.syllabus === syllabusName && q.book === bookName && q.chapter === chapterName);

    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate('/admin/addQuestion',
            {
                state: {
                    syllabusName,
                    bookName,
                    chapterName,
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

            }, 1500);


        } catch (error) {

            snackbarEmitter('Something went wrong', 'error');
            fetchQuestions();
        }
    };

    const handleEditClick = (question) => {
        navigate('/admin/addQuestion/', {
            state: {
                syllabusName,
                bookName,
                chapterName,
                question
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
            }, 1500)

        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                snackbarEmitter('Something went wrong', 'error');
            }, 1500)

        }
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
                                    {['Ques. No', 'Questions', 'Category Name', 'Active', 'Action'].map((label) => (
                                        <TableCell key={label}>
                                            <Typography fontWeight="bold" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                                                {label}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredQuestions.map((question, index) => (
                                    <TableRow key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{question.question}</TableCell>
                                        <TableCell>General</TableCell>
                                        <TableCell>
                                            <Button
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
                                            </Button>
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
                        sx={{ mt: 1, p: 1, backgroundColor: 'orange', color: 'white' }}
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
                    <CustomButton children='Cancel' onClick={handleCloseUploadDialog} loading={false} bgColor='#EAB308' sx={{ width: { xs: '90%', md: '50%', sm: '60%' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }} />
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
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>

                                    <CustomButton children='Yes' onClick={updateQuestion} loading={loading} bgColor='#EAB308' sx={{ width: '20%' }} />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleStatusModalClose}
                                    >
                                        No
                                    </Button>
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
