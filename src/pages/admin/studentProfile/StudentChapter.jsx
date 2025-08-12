import { apiGet, apiPost } from "../../../api/axios";
import Navbar from "../../../components/admin/Navbar";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import CustomTypography from "../../../components/admin/CustomTypography";

const StudentChapter = () => {
    const [books, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);
    const location = useLocation();
    const { syllabusTitle, syllabusId, studentId } = location.state || {};

    const [selectedBookID, setSelectedBookID] = useState(books[0]?._id);
    const [filteredChapters, setFilteredChapters] = useState([]);
    const [completedChapterIds, setCompletedChapterIds] = useState(new Set());

    useEffect(() => {
        const fetchBooksAndChapters = async () => {
            try {
                // const bookResponse = await apiGet('/getBooks');
                const bookResponse = await apiGet(`/booksBySyllabusId/${syllabusId}`);
                console.log(bookResponse, "bookResponse");

                const fetchedBooks = bookResponse?.data?.data;
                setBooks(fetchedBooks);
                setSelectedBookID(fetchedBooks[0]?._id);

                const chapterResponse = await apiGet(`/chaptersBySyllabusId/${syllabusId}`);
                setChapters(chapterResponse.data.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBooksAndChapters();
    }, []);

    const getStudentProgress = async () => {
        try {
            const response = await apiPost(`/studentTaskProgress`, { studentId: studentId });
            console.log(response, "responsegetStudentprogress");
            if (response?.data?.status === 200) {
                const taskStatus = response?.data?.data;
                console.log(taskStatus, "taskstatus");
                const completedIds = new Set();
                // setUserSyllabuses(taskStatus?.syllabuses || []);
                taskStatus?.syllabuses?.forEach((syllabus) => {
                    syllabus.books?.forEach((book) => {
                        book.chapters?.forEach((chapter) => {

                            if (chapter.isTaskCompleted) {
                                console.log(chapter, "chapter222");
                                completedIds.add(chapter._id);
                            }
                        });
                    });
                });
                setCompletedChapterIds(completedIds);
            }
            else {
                snackbarEmitter(response?.data?.message, "error");
            }
        }
        catch (err) {
            return err
            // snackbarEmitter("")
        }
    }

    // useEffect(() => {
    //   getStudentProgress();
    // }, []);

    useEffect(() => {

        const filterChapters = chapters.filter((chapter) => chapter.bookId === selectedBookID);
        setFilteredChapters(filterChapters);
        getStudentProgress();


    }, [chapters, selectedBookID]);


    return (
        <Navbar title="Student Profile">

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 5 }}>
                <ArrowCircleLeftRoundedIcon sx={{ color: "#EAB308", fontSize: "28px", cursor: "pointer" }} onClick={() => window.history.back()} />
                <CustomTypography
                    text={"Performance"}
                    fontWeight={500}
                    fontSize={{ xs: "14px", sm: "16px", md: "16px" }}
                />
                <CustomTypography
                    text={">"}
                    fontWeight={700}
                    fontSize={{ xs: "14px", sm: "16px", md: "16px" }}
                />
                <CustomTypography
                    text={syllabusTitle}
                    fontWeight={500}
                    fontSize={{ xs: "14px", sm: "16px", md: "16px" }}
                />

            </Box>


            <Box className="tabs-section" sx={{ p: 4, borderRadius: 2 }}>
                <Box className="custom-tabs" component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', overflowX: 'auto', borderRadius: '10px 10px 0 0', backgroundColor: '#F5F5F5' }}>
                    {books?.map((book, index) => (
                        <Box component="li" className="nav-item" key={index} sx={{ minWidth: { xs: '50%', sm: '25%' }, flex: 1, borderRight: '1px solid #EAEAEA', }}>
                            <Button
                                fullWidth
                                onClick={() => setSelectedBookID(book?._id)}
                                sx={{
                                    backgroundColor: selectedBookID === book?._id ? '#f5f5f5' : '#0f2848',
                                    color: selectedBookID === book?._id ? '#fbbd00' : '#fff',
                                    border: 'none',
                                    borderRight: '1px solid #f5f5f5',
                                    padding: '12px 20px',
                                    fontWeight: 600,
                                    fontSize: { xs: '11px', sm: '12px', md: '14px' },
                                    textTransform: 'uppercase',
                                    borderRadius: 0,
                                    transition: '0.3s',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%', // 
                                    '&:hover': {
                                        backgroundColor: selectedBookID === book?._id ? '#eaeaea' : '#16355c', // Optional hover bg
                                        color: selectedBookID === book?._id ? '#fbbd00' : '#EAB308', // keep text white when not active
                                    },
                                    '&:last-child': {
                                        borderRight: 'none',
                                    },
                                }}
                            >
                                {book.bookTitle}
                            </Button>
                        </Box>
                    ))}
                </Box>


                <Box className="chapter-list" sx={{ maxHeight: '400px', overflowY: 'auto', px: 4, py: 3, borderRadius: '0 0 10px 10px', backgroundColor: '#F5F5F5', }}>
                    {filteredChapters?.filter(chapter => chapter.isactive)?.map((chapter, index) => {
                        const isCompleted = completedChapterIds?.has(chapter?._id);
                        return (
                            <Paper
                                key={index}
                                sx={{
                                    backgroundColor: '#0f2b50',
                                    color: 'white',
                                    p: 2,
                                    mb: 2,
                                    borderRadius: 2,
                                    fontWeight: 500,


                                }}
                            >
                                <Grid container spacing={2} alignItems="right" display="flex" justifyContent="center">
                                    <Grid size={{ xs: 10, sm: 11 }} alignItems="left" display="grid" justifyContent={{ xs: "left", sm: "center" }} pl={{ xs: 0, sm: 4 }}>
                                        <Typography sx={{ fontWeight: 500 }}>
                                            Chapter {chapter?.chapterno}:  {chapter?.chaptername?.toUpperCase()}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 2, sm: 1 }} alignItems="center" display="flex" justifyContent={{ xs: "right" }} pr={{ xs: 0 }}>
                                        {isCompleted && (
                                            <CheckCircleIcon sx={{ color: '#27C76F', fontSize: 32 }} />
                                        )}
                                    </Grid>
                                </Grid>
                            </Paper>
                        );
                    })}
                </Box>
            </Box>
        </Navbar>
    );
};

export default StudentChapter;