import Navbar from "../../../components/admin/Navbar";
import CustomTypography from "../../../components/admin/CustomTypography";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ReactSpeedometer from "react-d3-speedometer";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


function StudentPerformance() {


  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [countResult, setCountResult] = useState();
  const [userSyllabuses, setUserSyllabuses] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));

  // const handleClick = (title, id) => {
  //   console.log(title, id, "paramssssss");
  //   navigate('/chapter', { state: { title, id } });
  // };
  let data;
  useEffect(() => {
    const fetchFlightLogData = async () => {
      try {
        const requestBody = {
          fromDate: userData?.userRegisteredDate,
          toDate: new Date().toISOString(),
        }
        const response = await apiPost('/countTotalTest', requestBody);
        // Handle the response data as needed
        console.log(response.data, "fflightLogDetails");
        setCountResult(response?.data?.data)
        data = [
          {
            name: 'Score',
            value: 62, // percentage
            fill: '#F5B400',
          },
        ];
      } catch (error) {
      }
    }

    fetchFlightLogData();

    const fetchSyllabus = async () => {
      try {
        const response = await apiGet("/getSyllabus");
        setSyllabus(response.data.data);
        getStudentProgress();
      } catch (error) {
        console.error("Error fetching syllabus:", error);
      }
    };


    const getStudentProgress = async () => {
      try {
        const response = await apiGetToken(`/task/studentTaskProgress?userId=${userData._id}`);
        console.log(response, "responsegetStudentprogress");
        if (response?.data?.status === 200) {
          const taskStatus = response?.data?.data;
          console.log(taskStatus, "taskstatus");
          setUserSyllabuses(taskStatus?.syllabuses || []);
        }
      }
      catch (err) {
        return err
        // snackbarEmitter("")
      }
    }
    fetchSyllabus();

  }, []);

  const grade = useMemo(() => {
    const raw = countResult?.grade ?? 0;
    return raw > 0 && raw < 1 ? 1 : Number(raw.toFixed(2));
  }, [countResult]);


  return (
    <Navbar title="Student Profile">
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 5 }}>
        <ArrowCircleLeftRoundedIcon sx={{ color: "#EAB308", fontSize: "28px", cursor: "pointer" }} onClick={() => window.history.back()} />
        <CustomTypography
          text={"Performance"}
          mb={0}
          fontWeight={500}
          fontSize={{ xs: "14px", sm: "16px", md: "16px" }}
        />
      </Box>

      <Grid container sx={{ display: "flex", gap: 8, mb: 4 }}>

        <Grid size={{ xs: 4, md: 5, sm: 6 }} >
          <Card sx={{ p: 3, borderRadius: 3, border: " 1px solid #E5E7E9" }}>
            <CustomTypography
              text={"About"}
              sx={{ fontWeight: "bold", mb: 1 }}
            />

            <Box sx={{ display: "flex", gap: 4 }}>
              <Box sx={{ border: "1px solid #E5E7E9", borderRadius: "10px", padding: "20px" }} >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Avatar sx={{ width: 35, height: 35, }} ></Avatar>

                  <CustomTypography
                    text={"Bhumika prajapati"}
                    sx={{ fontWeight: "bold", mb: 0 }} />
                </Box>
                <CustomTypography text={"Info"} sx={{ fontWeight: "bold", mb: 1 }} />

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CalendarTodayIcon sx={{ color: "#EAB308" }} />

                  <Box >
                    <CustomTypography
                      text={"15 March 2020"}
                      sx={{ fontWeight: "bold", mb: 0 }} />

                    <CustomTypography
                      text={"Joined date"}
                      fontSize={{ xs: "10px", md: "12px", sm: "12px" }}
                      sx={{ color: '#9E9E9E', mb: 0 }} />

                  </Box>

                </Box>
              </Box>

              <Box>
                <CustomTypography text={"Contact"} sx={{ fontWeight: "bold", mb: 1 }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <EmailOutlinedIcon sx={{ color: "#EAB308" }} />

                  <Box >
                    <CustomTypography
                      text={'Email'}
                      sx={{ mb: 0, color: '#9E9E9E' }} />

                    <CustomTypography
                      text={"cockpit@gmail.com"}
                      // fontSize={{xs: "10px", md: "12px", sm: "12px"}}
                      sx={{ mb: 0 }} />

                  </Box>

                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <SmartphoneIcon sx={{ color: "#EAB308" }} />

                  <Box >
                    <CustomTypography
                      text={'Phone'}
                      sx={{ mb: 0, color: '#9E9E9E' }} />

                    <CustomTypography
                      text={"0987654321"}
                      // fontSize={{xs: "10px", md: "12px", sm: "12px"}}
                      sx={{ mb: 0 }} />

                  </Box>

                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item size={{ xs: 4, md: 4, sm: 8 }}>
          <Card sx={{ p: { xs: 1, sm: 1 }, borderRadius: 3, border: " 1px solid #E5E7E9", justifyContent: "center", textAlign: "center" }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <CustomTypography text={"Test Performance"} sx={{ fontWeight: "bold", mb: 0 }} />
                <Select
                  size="small"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  sx={{ fontSize: 14 }}
                >
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>

              </Box>
            </CardContent>
            {countResult && (

              <ReactSpeedometer
                value={grade}
                minValue={0}
                maxValue={100}
                segments={100}
                segmentColors={["#EAB308", "#F8EFE2"]}
                startColor="#EAB308"
                endColor="#F8EFE2"
                needleColor="#EAB308"
                needleTransition="easeElastic"
                needleHeightRatio={0.5}
                ringWidth={15}
                textColor="#000"
                customSegmentStops={[0, grade, 100]}
                currentValueText={`Your Grade: ${countResult?.grade ? countResult?.grade?.toFixed(2) : "0"}%`}
                height={180}
                width={270}
              />
            )}
            {/* <Typography variant="caption" color="text.secondary" mt={1}>
                {`Your grade is ${countResult?.grade.toFixed(2)}%`}
              </Typography> */}
          </Card>
        </Grid>
      </Grid>

      <CustomTypography
        text={"Training"}
        sx={{ fontWeight: "bold", mb: 2 }}
        fontSize={{ xs: "14px", md: "16px", sm: "16px" }}
      />

      <Box sx={{ maxWidth: '100%', overflowX: 'auto', mb: 4 }}>

        <Card sx={{ display: "flex", alignItems: "center", width: 'max-content', gap: 3, p: { xs: 1, sm: 1, md: 1 }, borderRadius: 3, border: " 1px solid #E5E7E9" }} >
          <img src="/images/btn.svg" alt="" />
          <CustomTypography
            text={"syllabus name"}
            mb={0}
            fontWeight={500}
            fontSize={{ xs: "14px", sm: "16px", md: "16px" }}
          />
        </Card>

      </Box>

      <CustomTypography
        text={"Test Analysis"}
        sx={{ fontWeight: "bold", mb: 2 }}
        fontSize={{ xs: "14px", md: "16px", sm: "16px" }}
      />

      <Box sx={{ maxWidth: '100%', overflowX: 'auto', mb: 4 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              // height: "100%",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "space-between",
            }}
          >
            <CardMedia
              component="img"
              height="100"
              image={"/images/frame.png"}
            // alt={course.title}
            />
            <Box sx={{ ml: 2 }}>
              <CardContent sx={{ px: 0 }}>
                <CustomTypography
                  text={"syllabus name"}
                  fontWeight={500}
                  mb={0} />
                <CustomTypography
                  text={"general"}
                  mb={0}
                  fontSize={{ xs: "10px", md: "12px", sm: "12px" }}
                  sx={{ color: '#EAB308' }}
                />
              </CardContent>
            </Box>

          </Card>
        </Box>


      </Box>

    </Navbar>
  );
}
export default StudentPerformance;
