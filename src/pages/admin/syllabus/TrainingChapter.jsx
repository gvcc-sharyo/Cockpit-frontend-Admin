import Navbar from "../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../../api/axios";
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Container,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    MenuItem
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomTextField from "../../../components/admin/CustomTextField";
import CustomButton from "../../../components/admin/CustomButton";

function TrainingChapter() {
    const [books, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);
    const location = useLocation();
    const {syllabusTitle, syllabusId} = location.state;


    const [filteredBooks, setFilteredBooks] = useState([]);

    const [selectedBook, setSelectedBook] = useState('');

   const fetchBooks = async () => {
    try {
        const response = await apiGet('/getBooks');

        if (response.data.status === 200) {
            const bookList = response.data.books;

            // Step 1: Filter books that have a syllabusId field
            const booksWithSyllabus = bookList.filter(book => book.syllabusId);

            // Step 2: Filter those books by matching syllabusTitle
            const filterBooks = booksWithSyllabus.filter(book => book.syllabusId.title === syllabusTitle);

            if (filterBooks.length === 0) {
                snackbarEmitter('No books found', 'info');
            }

            setFilteredBooks(filterBooks);

            if (filterBooks.length > 0) {
                setSelectedBook(filterBooks[0].bookTitle);
            }

        } else {
            snackbarEmitter(response.data.message, 'error');
        }

    } catch (error) {
        snackbarEmitter('Something went wrong', 'error');
    }
};


    const fetchChapters = async () => {
        try {
            const response = await apiGet('/getChapters');

            if (response.data.status === 200 && response.data.chapters.length === 0) {
                snackbarEmitter('No chapters found', 'info');
            }
            else if (response.data.status === 200) {
                setChapters(response.data.chapters);
            }
            else {
                snackbarEmitter(response.data.message, 'error');
            }

        } catch (error) {
            console.error('Error fetching syllabus:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchChapters();
    }, [])

    const filteredChapters = chapters.filter((chapter) => chapter.book === selectedBook && chapter.syllabus === syllabusTitle);

    const [openModal, setOpenModal] = useState(false);
    const [bookName, setBookName] = useState([]);

    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => {
        setOpenModal(false);
        setBookName('');
        setBookError('');
    };

    const [openChapterModal, setOpenChapterModal] = useState(false);
    const [chapterName, setChapterName] = useState([]);

    const handleChapterModalOpen = () => setOpenChapterModal(true);
    const handleChapterModalClose = () => {
        setOpenChapterModal(false);

        setFormData({
            chapterno: '',
            chaptername: '',
            status: ''
        });

    };

    const [bookError, setBookError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddBook = async () => {

        if (!bookName) {
            setBookError('Book name is required');
            return;
        }

        setLoading(true);

        try {
            const response = await apiPost('/addBooks', { bookTitle: bookName , syllabusId: syllabusId});

            setTimeout(() => {
                setLoading(false);
                if (response.data.status === 200) {
                    snackbarEmitter(response.data.message, 'success');
                    handleModalClose();
                } else {

                    snackbarEmitter(response.data.message, 'error');
                    handleModalClose();
                }
                fetchBooks();
            }, 1500)


        } catch (error) {

            setTimeout(() => {
                setLoading(false);
                snackbarEmitter('Something went wrong', 'error');
                fetchBooks();
            }, 1500);


        }
    }

    const [formData, setFormData] = useState({
        chapterno: '',
        chaptername: '',
        status: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [formErrors, setFormErrors] = useState({
        chapterno: '',
        chaptername: '',
        status: ''
    });

    const handleAddChapter = async () => {
        console.log("add chapter api called");

        if (!selectedBook) {
            snackbarEmitter('Please select a book', 'error');
            return;
        }

        const errors = {};

        if (!formData.chapterno) errors.chapterno = 'Chapterno is required';
        if (!formData.chaptername) errors.chaptername = 'Chaptername is required';
        // if (!formData.status) errors.status = 'Status is required';

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;


        const req = {
            syllabus: syllabusTitle,
            book: selectedBook,
            chapterno: formData.chapterno,
            chaptername: formData.chaptername,
            status: formData.status
        };

        console.log('req', req.book);


        // If editing, add chapterId to the request body
        if (isEditing) {
            req.chapterId = chapterId;
            req.isactive = isActive;

            console.log('isActive', isActive);


        }

        setLoading(true);

        try {
            const endpoint = isEditing ? '/updateChapter' : '/addChapters';
            const response = await apiPost(endpoint, req);

            setTimeout(() => {
                setLoading(false);
                if (response.data.status === 200) {
                    snackbarEmitter(response.data.message, 'success');
                    fetchChapters();
                    handleChapterModalClose();
                    handleStatusModalClose();
                } else {
                    snackbarEmitter(response.data.message, 'error');
                }
            }, 1500)


        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                snackbarEmitter('Something went wrong', 'error');
                fetchChapters();
            }, 1500);

        }
    };


    const navigate = useNavigate();

    const handleChapterClick = (chapter) => {
        navigate('/admin/trainingQuestion', {
            state: {
                syllabusName: chapter.syllabus,
                bookName: chapter.book,
                chapterName: chapter.chaptername,
            },
        });
    }


    //edit chapter
    const [isEditing, setIsEditing] = useState(false);
    const [chapterId, setChapterId] = useState('');
    const [isActive, setIsActive] = useState(false);

    const handleEditChapter = (chapter) => {
        setFormData({
            chapterno: chapter.chapterno,
            chaptername: chapter.chaptername,
            status: chapter.status,
        });
        setChapterId(chapter._id); // or use other unique field if no ID
        setIsEditing(true);
        setIsActive(chapter.isactive === true ? true : false);
        setOpenChapterModal(true);
    };

    const [openStatusModal, setOpenStatusModal] = useState(false);
    const handleStatusModalOpen = () => setOpenStatusModal(true);
    const handleStatusModalClose = () => setOpenStatusModal(false);

    const handleStatusClick = (chapter) => {
        setFormData({
            chapterno: chapter.chapterno,
            chaptername: chapter.chaptername,
            status: chapter.status,
        });
        setChapterId(chapter._id); // or use other unique field if no ID
        setIsActive(chapter.isactive === true ? false : true);
        setIsEditing(true);
        setOpenStatusModal(true);
    };

    return (

        <Navbar title={'Syllabus'}>

            <Grid container sx={{ flexDirection: 'column', position: "relative", backgroundColor: '#f8f9fa', padding: '10px' }} >

                <Grid size={{ xs: 12, md: 12, sm: 12 }} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }} >
                    <Grid size={{ xs: 6, md: 12, sm: 10 }}>
                        <Typography sx={{ fontSize: { xs: '16px', md: '22px', sm: '20px' } }} gutterBottom >Books for {syllabusTitle}</Typography>
                    </Grid>

                    <Grid size={{ xs: 6, md: 6, sm: 6 }}>
                        <CustomButton children=' + Add books' onClick={handleModalOpen} loading={false} bgColor='#EAB308' sx={{ width: { xs: '90%', md: '50%', sm: '60%' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }} />
                    </Grid>
                </Grid>

                <Box sx={{ maxWidth: '100%', overflowX: 'auto' }} mt={2}>
                    <Box sx={{ display: 'flex', gap: '15px', padding: '10px', width: 'max-content' }}>
                        {
                            filteredBooks.map((book) => (
                                <Box
                                    key={book.bookTitle}
                                    onClick={() => setSelectedBook(book.bookTitle)}
                                    sx={{
                                        minWidth: { xs: '100px', md: '150px', sm: '120px' },
                                        padding: '7px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        backgroundColor: selectedBook === book.bookTitle ? '#FFEBAB' : '#fff',
                                        border: '1px solid #ccc',
                                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                                        borderRadius: '10px',
                                        fontWeight: 'bold',
                                        flexShrink: 0,
                                        fontSize: { xs: '12px', md: '14px', sm: '14px' }
                                    }}
                                >
                                    {book.bookTitle}
                                </Box>
                            ))
                        }
                    </Box>
                </Box>

                <Grid
                    container
                    mt={4}
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        p: 2,
                        backgroundColor: '#fff',
                    }}
                    size={{ xs: 12, md: 12, sm: 12 }}
                >
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        size={{ xs: 12, md: 12, sm: 12 }}

                    >
                        <Typography
                            sx={{ fontSize: { xs: '16px', sm: '20px', md: '22px' } }}
                            gutterBottom
                        >
                            Chapters of {selectedBook}
                        </Typography>

                        <CustomButton children=' + Add chapters' onClick={handleChapterModalOpen} loading={false} bgColor='#EAB308' sx={{ width: { xs: '70%', md: '20%', sm: '30%' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }} />

                    </Grid>

                    <Grid item size={{ xs: 12, md: 12, sm: 12 }} mt={2} sx={{ maxWidth: '100%', overflowX: 'auto', overflowY: 'auto' }}>
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
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontWeight="bold" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                                                Chapter No
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight="bold" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                                                Chapter Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight="bold" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                                                Status
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight="bold" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                                                Action
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredChapters.map((chapter, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ borderBottom: '1px solid #e0e0e0', cursor: 'pointer' }}
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell onClick={() => handleChapterClick(chapter)}>
                                                {chapter.chaptername}
                                            </TableCell>
                                            <TableCell>
                                                {/* <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: chapter.isactive === true ? '#109CF1' : 'red',
                                                        color: 'white',
                                                        fontSize: { xs: '10px', sm: '12px' },
                                                        px: 1.5,
                                                        py: 0.5,
                                                        minWidth: 'auto',
                                                    }}
                                                    onClick={() => handleStatusClick(chapter)}
                                                >
                                                    {chapter.isactive === true ? 'Active' : 'Inactive'}
                                                </Button> */}
                                                 <CustomButton children= {chapter.isactive === true ? 'Active' : 'Inactive'} onClick={()=> handleStatusClick(chapter)} loading={false} bgColor={chapter.isactive === true ? '#109CF1' : '#D61508'} sx={{ width: { xs: '20%', sm: '20%', md: '20%' }, fontSize: { xs: '10px', sm: '11px', md: '12px' }, }} />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton size="small" onClick={() => handleEditChapter(chapter)}>
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


            </Grid>


            <Dialog open={openModal} onClose={handleModalClose} maxWidth="sm">
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Add Book</Typography>
                    <IconButton onClick={handleModalClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>

                    <Grid container sx={{ display: 'flex', alignItems: 'center', gap: 3 }} >
                        <Grid item size={{ xs: 10, md: 6, sm: 5 }}>

                            <CustomTextField
                                label="Book Title"
                                name="title"
                                value={bookName}
                                onChange={(e) => setBookName(e.target.value)}
                                placeholder="Book Title"
                                error={!!bookError} //error={bookError ? true : false}
                                helperText={bookError}
                            />

                        </Grid>

                        <Grid item mt={{ xs: 0, md: 3, sm: 3 }} >
                            <CustomButton children='Add' onClick={handleAddBook} loading={loading} bgColor='#EAB308' sx={{ width: '20%' }} />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            <Dialog open={openChapterModal} onClose={handleChapterModalClose} maxWidth="sm">
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Add Chapters</Typography>
                    <IconButton onClick={handleChapterModalClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>

                    <Grid container sx={{ display: 'flex', gap: 3, mb: 3 }}>
                        <Grid size={{ xs: 10, md: 5, sm: 5 }}>
                            <CustomTextField
                                label="Chapter No"
                                name="chapterno"
                                value={formData.chapterno}
                                onChange={handleInputChange}
                                placeholder="Chapter No"
                                error={!!formErrors.chapterno}
                                helperText={formErrors.chapterno}
                            />

                        </Grid>
                        <Grid size={{ xs: 10, md: 5, sm: 5 }}>
                            <CustomTextField
                                label="Chapter name"
                                name="chaptername"
                                value={formData.chaptername}
                                onChange={handleInputChange}
                                placeholder="Chapter name"
                                error={!!formErrors.chaptername}
                                helperText={formErrors.chaptername}
                            />
                        </Grid>
                    </Grid>
                    {/* <Grid container sx={{ display: 'flex', gap: 3, mb: 3 }}>
                        <Grid size={{ xs: 10, md: 5, sm: 10 }}>

                            <CustomTextField
                                label="Status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                placeholder="Choose"
                                error={!!formErrors.status}
                                helperText={formErrors.status}
                                select
                            >

                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </CustomTextField>
                        </Grid>
                    </Grid> */}

                    <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>

                        <CustomButton children={isEditing ? 'Update' : 'Add'} onClick={handleAddChapter} loading={loading} bgColor='#EAB308' sx={{ width: '20%' }} />
                    </Grid>

                </DialogContent>
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

                                    <CustomButton children='Yes' onClick={handleAddChapter} loading={loading} bgColor='#EAB308' sx={{ width: '20%' }} />
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

export default TrainingChapter;
