import Navbar from "../../../../components/admin/Navbar";
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
import { useParams, useNavigate } from "react-router-dom";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { apiGet, apiGetToken, apiPostUpload } from "../../../../api/axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { snackbarEmitter } from "../../../../components/admin/CustomSnackbar";

function TrainingQuestion() {

    const [questions, setQuestions] = useState([]);

    const { syllabusName, bookName, chapterName } = useParams();

    const fetchQuestions = async () => {
        try {
            const response = await apiGetToken('/questions');
            if (response.data.status === 200 && response.data.data.length === 0) {
                snackbarEmitter('No questions found', 'info');
            }

            else if (response.data.status === 200) {
                snackbarEmitter(response.data.message, 'success');
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
        navigate('/admin/addQuestion');
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

    const handleUpload = async () => {
        if (!selectedFile) {
            snackbarEmitter('File not selected', 'warning');
            return;
        }

        try {

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('syllabus', syllabusName);
            formData.append('book', bookName);
            formData.append('chapter', chapterName);

            await apiPostUpload('/uploadQuestionsBulk',formData);

            if (response.data.status === 200) {
                snackbarEmitter(response.data.message, 'success');
                handleCloseUploadDialog();
            }
            else {
                snackbarEmitter(response.data.message, 'error');
                handleCloseUploadDialog();
            }
            
        } catch (error) {
            snackbarEmitter('Something went wrong', 'error');
        }
    };


    return (

        <Navbar title={'Training'}>
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

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            sx={{
                                backgroundColor: 'orange',
                                color: 'white',
                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                px: 1.5,
                                py: 0.5,
                            }}
                            onClick={handleOpenUploadDialog}
                        >
                            Bulk Upload
                        </Button>
                        <Button
                            onClick={handleAddClick}
                            variant="outlined"
                            sx={{
                                backgroundColor: 'orange',
                                color: 'white',
                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                px: 1.5,
                                py: 0.5,
                            }}
                        >
                            + Add Questions
                        </Button>
                    </Box>
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
                                                    backgroundColor: '#109CF1',
                                                    color: 'white',
                                                    fontSize: { xs: '10px', sm: '12px' },
                                                    px: 1.5,
                                                    py: 0.5,
                                                    minWidth: 'auto',
                                                }}
                                            >
                                                Active
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton size="small">
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
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: 'orange', color: 'white' }}
                        onClick={handleUpload}
                    >
                        Upload
                    </Button>
                    <Button onClick={handleCloseUploadDialog} >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>


        </Navbar>

    );
}

export default TrainingQuestion;
