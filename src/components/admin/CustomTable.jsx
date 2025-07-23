
import CustomTypography from "./CustomTypography";
import CustomButton from "./CustomButton";

function CustomTable({
  maxWidth = "100%",
  handleClick = () => { },
  handleEdit,
  tableData = [],
  tableHeaders = [],
}) {
  return (
    <Grid>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          boxShadow: "none",
          maxHeight: 400,
          overflowY: "auto",
          maxWidth: maxWidth,
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={index}>
                  <CustomTypography
                    text={header}
                    fontSize={{ xs: "12px", sm: "14px", md: "14px" }}
                    mb={0}
                    fontWeight={600}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data, index) => (
              <TableRow key={index} sx={{ borderBottom: "1px solid #e0e0e0" }}>
                <TableCell>{index + 1}</TableCell>

                {
                  data.map((item, index) => (
                    <TableCell sx={{ cursor: "pointer" }}
                      onClick={() => handleClick(data)} key={index}>{item}</TableCell>
                  ))
                }

                {/* <TableCell>{data.totalStudents}</TableCell> */}

                <TableCell>
                  <CustomButton
                    children={data.isactive ? "Active" : "Inactive"}
                    loading={false}
                    bgColor={data.isactive ? "#109CF1" : "#F44336"}
                    sx={{
                      width: { xs: "50px", sm: "60px", md: "70px" },
                      fontSize: { xs: "10px", sm: "11px", md: "12px" },
                    }}
                  />
                </TableCell>

                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(data)} // safely call handleEdit
                  >
                    <img
                      src="/images/edit.svg"
                      alt="Edit"
                      style={{ width: 20, height: 20 }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default CustomTable;
