import Navbar from "../../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import { apiGetToken, apiPostToken } from "../../../../api/axios";
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

function TrainingChapter() {
    const [books, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);
    const location = useLocation();
    const syllabusTitle = location.state;

    const fetchBooks = async () => {
        try {
            const response = await apiGetToken('/getBooks');
            setBooks(response.data.books);
            console.log("selected book", selectedBook);
            

        } catch (error) {
            console.error('Error fetching syllabus:', error);
        }
    };

    const [selectedBook, setSelectedBook] = useState(books[0]);

    const fetchChapters = async () => {
        try {
            const response = await apiGetToken('/getChapters');
            setChapters(response.data.chapters);

        } catch (error) {
            console.error('Error fetching syllabus:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchChapters();
    }, [])

    const filteredChapters = chapters.filter((chapter) => chapter.book === selectedBook);

    const [openModal, setOpenModal] = useState(false);
    const [bookName, setBookName] = useState([]);

    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => {
        setOpenModal(false);
        setBookName('');
    };

    const [openChapterModal, setOpenChapterModal] = useState(false);
    const [chapterName, setChapterName] = useState([]);

    const handleChapterModalOpen = () => setOpenChapterModal(true);
    const handleChapterModalClose = () => {
        setOpenChapterModal(false);
    };

    const handleAddBook = async () => {
        try {
            const response = await apiPostToken('/addBooks', { bookTitle: bookName });
            if (response.status === 200) {
                alert('Book added successfully');
                fetchBooks();
                handleModalClose();
            } else {
                alert('Failed to add book');
            }
        } catch (error) {
            console.error('Error adding book:', error);
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

    const handleAddChapter = async () => {
        const req = {
            syllabus: syllabusTitle,
            book: selectedBook,
            chapterno: formData.chapterno,
            chaptername: formData.chaptername,
            status: formData.status
        }

        try {
            const response = await apiPostToken('/addChapters', req);
            if (response.status === 200) {
                alert('Chapter added successfully');
                fetchChapters();
                handleChapterModalClose();
            } else {
                alert('Failed to add chapter');
            }
        } catch (error) {
            console.error('Error adding chapter:', error);
        }
    }

    const navigate = useNavigate();

    const handleChapterClick = (chapter) => {
        navigate(`/admin/trainingQuestion/${chapter.syllabus}/${chapter.book}/${chapter.chaptername}`)
    }

    return (
        <>
            <Navbar title="Training" />

            <Container maxWidth="xl" >

                <Grid container sx={{ flexDirection: 'column', position: "relative", backgroundColor: '#f8f9fa', padding: '10px' }} mt={-60} ml={30} >

                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid>
                            <Typography sx={{ fontSize: '30px' }} gutterBottom >Books for {syllabusTitle}</Typography>

                        </Grid>

                        <Box sx={{ minWidth: '150px', flexShrink: 0 }}>
                            <Button
                                onClick={handleModalOpen}
                                variant="outlined"
                                sx={{ backgroundColor: 'orange', color: 'white' }}
                            >
                                + Add books
                            </Button>
                        </Box>
                    </Grid>

                    <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                        <Box sx={{ display: 'flex', gap: '15px', padding: '10px', width: 'max-content' }}>
                            {
                                books.map((book) => (
                                    <Box
                                        key={book.bookTitle}
                                        onClick={() => setSelectedBook(book.bookTitle)}
                                        sx={{
                                            minWidth: '150px',
                                            padding: '7px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            backgroundColor: selectedBook === book.bookTitle ? '#FFEBAB' : '#fff',
                                            border: '1px solid #ccc',
                                            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                                            borderRadius: '10px',
                                            fontWeight: 'bold',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {book.bookTitle}
                                    </Box>
                                ))
                            }
                       </Box>
                    </Box>


                    <Grid size={{ xs: 6, md: 10 }} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '30px' }} gutterBottom >Chapters of {selectedBook}</Typography>
                        <Button variant="'outlined" sx={{ backgroundColor: 'orange', color: 'white', padding: '5px' }}
                            onClick={handleChapterModalOpen}>+ Add Chapters</Button>
                    </Grid>

                    <Grid>
                        <TableContainer component={Paper} elevation={0} sx={{
                            boxShadow: 'none',
                            maxHeight: 400,
                            overflowY: 'auto',
                        }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography fontWeight="bold">Chapter No</Typography></TableCell>
                                        <TableCell><Typography fontWeight="bold">Chapter Name</Typography></TableCell>
                                        <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
                                        <TableCell><Typography fontWeight="bold">Action</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredChapters.map((chapter, index) => (
                                        <TableRow key={index} sx={{ borderBottom: '1px solid #e0e0e0', cursor: 'pointer' }}>
                                            <TableCell >{index + 1}</TableCell>
                                            <TableCell onClick={() => handleChapterClick(chapter)}>{chapter.chaptername}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" sx={{ backgroundColor: chapter.status === 'active' ? '#109CF1' : 'red', color: 'white' }}>
                                                    {chapter.status}
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton>
                                                    <EditSquareIcon sx={{ color: 'orange' }} fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                </Grid>
            </Container>

            <Dialog open={openModal} onClose={handleModalClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Add Book</Typography>
                    <IconButton onClick={handleModalClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>

                    <Grid container sx={{ display: 'flex', gap: 3, mb: 3 }}>
                        <Grid size={{ xs: 6, md: 5 }}>
                            <Typography sx={{ fontSize: '14px' }} gutterBottom>Book title</Typography>
                            <TextField
                                fullWidth
                                label="Book Title"
                                name="title"
                                value={bookName}
                                onChange={(e) => setBookName(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            // fullWidth
                            variant="contained"
                            sx={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold' }}
                            onClick={handleAddBook}
                        >
                            Add
                        </Button>
                    </Grid>

                </DialogContent>
            </Dialog>

            <Dialog open={openChapterModal} onClose={handleChapterModalClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Add Chapters</Typography>
                    <IconButton onClick={handleChapterModalClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>

                    <Grid container sx={{ display: 'flex', gap: 3, mb: 3 }}>
                        <Grid size={{ xs: 6, md: 5 }}>
                            <Typography sx={{ fontSize: '14px' }} gutterBottom>Chapter No</Typography>
                            <TextField
                                fullWidth
                                label="Chapter No"
                                name="chapterno"
                                value={formData.chapterno}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 5 }}>
                            <Typography sx={{ fontSize: '14px' }} gutterBottom>Chapter name</Typography>
                            <TextField
                                fullWidth
                                label="Chapter name"
                                name="chaptername"
                                value={formData.chaptername}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ display: 'flex', gap: 3, mb: 3 }}>
                        <Grid size={{ xs: 6, md: 5 }}>
                            <Typography sx={{ fontSize: '14px' }} gutterBottom>Status</Typography>
                            <TextField
                                select
                                fullWidth
                                label="Choose"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>

                    <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            // fullWidth
                            variant="contained"
                            sx={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold' }}
                            onClick={handleAddChapter}
                        >
                            Add
                        </Button>
                    </Grid>

                </DialogContent>
            </Dialog>
        </>
    );
}

export default TrainingChapter;
