import Navbar from "../../../components/admin/Navbar";
import { useEffect, useState, useRef } from "react";
import { apiGet, apiPost, apiDelete } from "../../../api/axios";
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
    MenuItem,
    Menu
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomTextField from "../../../components/admin/CustomTextField";
import CustomButton from "../../../components/admin/CustomButton";
import CustomTypography from "../../../components/admin/CustomTypography";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function TrainingChapter() {
    const [books, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);
    const location = useLocation();
    const { syllabusTitle, syllabusId, category, selectBook } = location.state;

    const [filteredBooks, setFilteredBooks] = useState([]);

    const [selectedBook, setSelectedBook] = useState(filteredBooks[0]?.bookTitle);

    const fetchBooks = async () => {
        try {
            const response = await apiGet('/getBooks');

            if (response.data.status === 200) {
                const bookList = response.data.books;

                // Step 1: Filter books that have a syllabusId field
                // const booksWithSyllabus = bookList.filter(book => book.syllabusId);

                // Step 2: Filter those books by matching syllabusTitle
                const filterBooks = bookList.filter(book => book.syllabusId?.title === syllabusTitle);

                if (filterBooks.length === 0) {
                    snackbarEmitter('No books found', 'info');
                }

                setFilteredBooks(filterBooks);

                setSelectedBook(selectBook ? selectBook : filterBooks[0]?.bookTitle);

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
    const [bookData, setBookData] = useState({
        bookTitle: '',
        syllabusId: syllabusId
    });

    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => {
        setOpenModal(false);
        setIsEditing(false);
        setBookData({ bookTitle: '', syllabusId: syllabusId });
        closeMenu();        
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

        if (!bookData.bookTitle) {
            setBookError('Book name is required');
            return;
        }

        setLoading(true);

        const req = {
            bookTitle: bookData.bookTitle,
            syllabusId: syllabusId
        }

        if (isEditing) {
            req.bookId = menuItem._id;
        }

        try {
            const endpoint = isEditing ? '/updateBook' : '/addBooks';
            const response = await apiPost(endpoint, req);

            setTimeout(() => {
                setLoading(false);
                if (response.data.status === 200) {
                    snackbarEmitter(response.data.message, 'success');
                    fetchBooks();
                    closeMenu();
                    handleModalClose();
                } else {

                    snackbarEmitter(response.data.message, 'error');
                    fetchBooks();
                    closeMenu();
                    handleModalClose();
                }


            }, 1500)


        } catch (error) {

            setTimeout(() => {
                setLoading(false);
                snackbarEmitter('Something went wrong', 'error');
                fetchBooks();
                closeMenu();
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
                category: category,
                syllabusName: chapter.syllabus,
                bookName: chapter.book,
                chapterName: chapter.chaptername,
                activeBook: selectBook
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


    const [menuAnchor, setMenuAnchor] = useState(false);
    const [menuItem, setMenuItem] = useState([]);

    const openMenu = (e, item) => {

        setMenuAnchor(e.currentTarget);
        setMenuItem(item);
    };

    const closeMenu = () => {
        setMenuAnchor(null);
        setMenuItem([]);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setBookData({
            bookTitle: menuItem.bookTitle,
            syllabusId: syllabusId
        })
        handleModalOpen();

    };

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const handleDeleteModalClose = () => {
        setOpenDeleteModal(false);
        setDeleteId('');
    }

    const handleDelete = () => {
        setOpenDeleteModal(true);
        setDeleteId(menuItem._id);
    }

    const handleDeleteBook = async () => {

        setLoading(true);
        try {
            const response = await apiDelete(`/deleteBook/${deleteId}`);

            setTimeout(() => {
                setLoading(false);
                if (response.data.status === 200) {
                    snackbarEmitter(response.data.message, 'success');
                    handleDeleteModalClose();
                } else {
                    snackbarEmitter(response.data.message, 'error');
                    handleDeleteModalClose();
                }
                closeMenu();
                fetchBooks();
            }, 1500)

        } catch (error) {
            setLoading(false);
            snackbarEmitter('Something went wrong', 'error');
            handleDeleteModalClose();
            fetchBooks();
            closeMenu();
        }
    }


const bookRefs = useRef({});
useEffect(() => {
    if (selectedBook && bookRefs.current[selectedBook]) {
        bookRefs.current[selectedBook].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
}, [selectedBook, filteredBooks]);

    return (

        <Navbar title={'Syllabus'}>

            <Grid container sx={{ flexDirection: 'column', position: "relative", backgroundColor: '#f8f9fa', padding: '10px' }} >


                <Grid sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} mb={2}>
                    <CustomTypography text='Syllabus' onClick={() => navigate('/admin/trainingsyllabus')} sx={{ fontSize: { xs: '10px', md: '14px', sm: '14px' }, cursor: 'pointer', textDecoration: 'underline' }} />
                    <CustomTypography text='>' sx={{ fontSize: { xs: '10px', md: '14px', sm: '14px' } }} />
                    <CustomTypography text='Chapter' sx={{ fontSize: { xs: '10px', md: '14px', sm: '14px' }, cursor: 'pointer',  textDecoration: 'underline' }} />

                </Grid>

                <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }} >
                    <Grid size={{ xs: 6, md: 8, sm: 6 }}>
                        <CustomTypography text={`Books for ${syllabusTitle}`} fontSize={{ xs: '16px', sm: '18px', md: '18px' }} sx={{ mb: 2 }} fontWeight={600} />
                    </Grid>

                    {/* <Grid size={{ xs: 6, md: 4, sm: 4 }}> */}
                    <CustomButton children=' + Add books' onClick={handleModalOpen} loading={false} bgColor='#EAB308' sx={{ width: { xs: '45%', md: '15%', sm: '20%' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }} />
                    {/* </Grid> */}
                </Grid>

                <Box sx={{ maxWidth: '100%', overflowX: 'auto' }} mt={2}>
                    <Box sx={{ display: 'flex', gap: '15px', padding: '10px', width: 'max-content' }}>
                        {
                            filteredBooks.length > 0 && filteredBooks.map((book) => (
                                <Box  ref={(el) => (bookRefs.current[book.bookTitle] = el)} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', boxShadow: 3, borderRadius: '10px', px: 2, py: 1, minWidth: { xs: '45px', md: '120px', sm: '60px' }, bgcolor: selectedBook === book.bookTitle ? '#FFEBAB' : '#fff' }}>
                                    {/* <CustomButton children={book.bookTitle} onClick={() => setSelectedBook(book.bookTitle)} loading={false} bgColor={selectedBook === book.bookTitle ? '#FFEBAB' : '#fff'}
                                        sx={{ color: 'black', py: 0, minWidth: { xs: '45px', md: '120px', sm: '60px' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }}
                                    /> */}
                                    <CustomTypography text={book.bookTitle} fontSize={{ xs: '12px', sm: '13px', md: '14px' }} fontWeight={600} onClick={() => setSelectedBook(book.bookTitle)} sx={{ cursor: 'pointer' }} />

                                    <IconButton
                                        onClick={(e) => openMenu(e, book)}
                                    // sx={{ position: 'absolute', top: 20, right: 0 }}
                                    >
                                        <MoreHorizIcon />
                                    </IconButton>

                                </Box>


                            ))
                        }

                        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}
                        >
                            <MenuItem onClick={handleEdit} >Edit</MenuItem>
                            <MenuItem onClick={handleDelete} >Delete</MenuItem>
                        </Menu>
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
                        {/* <Typography
                            sx={{ fontSize: { xs: '16px', sm: '20px', md: '22px' } }}
                            gutterBottom
                        >
                            Chapters of {selectedBook}
                        </Typography> */}
                        <CustomTypography text={`Chapters for ${selectedBook}`} fontSize={{ xs: '16px', sm: '18px', md: '18px' }} sx={{ mb: 2 }} fontWeight={600} />

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
                                            <CustomTypography text="Chapter No" fontSize={{ xs: '12px', sm: '14px', md: '14px' }} mb={0} fontWeight={600} />
                                        </TableCell>
                                        <TableCell>
                                            <CustomTypography text="Chapter Name" fontSize={{ xs: '12px', sm: '14px', md: '14px' }} mb={0} fontWeight={600} />
                                        </TableCell>
                                        <TableCell>
                                            <CustomTypography text="Status" fontSize={{ xs: '12px', sm: '14px', md: '14px' }} mb={0} fontWeight={600} />
                                        </TableCell>
                                        <TableCell>
                                            <CustomTypography text="Action" fontSize={{ xs: '12px', sm: '14px', md: '14px' }} mb={0} fontWeight={600} />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredChapters.length > 0 && filteredChapters.map((chapter, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ borderBottom: '1px solid #e0e0e0', cursor: 'pointer' }}
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell onClick={() => handleChapterClick(chapter)}>
                                                {/* {chapter.chaptername} */}
                                                <CustomTypography text={chapter.chaptername} fontSize={{ xs: '14px', sm: '16px', md: '16px' }} mb={0} fontWeight={400} />
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
                                                <CustomButton children={chapter.isactive === true ? 'Active' : 'Inactive'} onClick={() => handleStatusClick(chapter)} loading={false} bgColor={chapter.isactive === true ? '#109CF1' : '#D61508'} sx={{ width: { xs: '20%', sm: '20%', md: '20%' }, fontSize: { xs: '10px', sm: '11px', md: '12px' }, }} />
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
                    <CustomTypography text="Add book" fontSize={{ xs: '16px', sm: '18px', md: '18px' }} mb={0} fontWeight={600} />
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
                                value={bookData.bookTitle}
                                onChange={(e) => setBookData({ ...bookData, bookTitle: e.target.value })}
                                placeholder="Book Title"
                                error={!!bookError} //error={bookError ? true : false}
                                helperText={bookError}
                            />

                        </Grid>

                        <Grid item mt={{ xs: 0, md: 3, sm: 3 }} >
                            <CustomButton children={isEditing ? 'Update' : 'Add'} onClick={handleAddBook} loading={loading} bgColor='#EAB308' sx={{ width: '20%' }} />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            <Dialog open={openChapterModal} onClose={handleChapterModalClose} maxWidth="sm">
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CustomTypography text="Add chapters" fontSize={{ xs: '16px', sm: '18px', md: '18px' }} mb={0} fontWeight={600} />
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
                    <CustomTypography text="Status update" fontSize={{ xs: '16px', sm: '18px', md: '18px' }} mb={0} fontWeight={600} />
                    <IconButton onClick={handleStatusModalClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>

                    <Grid container sx={{ display: 'flex', alignItems: 'center', gap: 3 }} >
                        <Grid item>
                            <CustomTypography text="Do you want to change the status" fontSize={{ xs: '14px', sm: '16px', md: '16px' }} mb={0} fontWeight={400} />
                        </Grid>
                        <Grid item>
                            <Grid  container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid item>

                                    <CustomButton children='Yes' onClick={handleAddChapter} loading={loading} bgColor='#EAB308' sx={{ width: '20%' }} />
                                </Grid>
                                <Grid item>
                                    <CustomButton children='No' onClick={handleStatusModalClose} bgColor='#BF0000' sx={{ width: { xs: '50%', md: '30%', sm: '30%' }, fontSize: { xs: '11px', md: '13px', sm: '13px' } }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>



            <Dialog open={openDeleteModal} onClose={handleDeleteModalClose} maxWidth="md">
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CustomTypography text="Confirm deletion" fontSize={{ xs: '16px', sm: '18px', md: '18px' }} mb={0} fontWeight={600} />
                    <IconButton onClick={handleDeleteModalClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>

                    <Grid container sx={{ display: 'flex', alignItems: 'center', gap: 3 }} >
                        <Grid item>
                            <CustomTypography text="Do you want to delete this book?" fontSize={{ xs: '14px', sm: '16px', md: '16px' }} mb={0} fontWeight={400} />
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>

                                    <CustomButton children='Yes' onClick={handleDeleteBook} loading={loading} bgColor='#EAB308' sx={{ width: '20%' }} />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleDeleteModalClose}
                                        sx={{ backgroundColor: '#BF0000', color: 'white' }}
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
