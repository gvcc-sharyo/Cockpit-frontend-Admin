
import CustomTypography from "./CustomTypography";
import CustomButton from "./CustomButton";

function CustomTable({
  maxWidth = "100%",
  handleClick = () => {},
  handleEdit,
  institutes = [],
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
            {institutes.map((institute, index) => (
              <TableRow key={index} sx={{ borderBottom: "1px solid #e0e0e0" }}>
                <TableCell>{index + 1}</TableCell>

                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleClick(institute)}
                >
                  {institute.instituteName}
                </TableCell>

                <TableCell>{institute.totalStudents}</TableCell>

                <TableCell>
                  <CustomButton
                    children={institute.isactive ? "Active" : "Inactive"}
                    loading={false}
                    bgColor={institute.isactive ? "#109CF1" : "#F44336"}
                    sx={{
                      width: { xs: "50px", sm: "60px", md: "70px" },
                      fontSize: { xs: "10px", sm: "11px", md: "12px" },
                    }}
                  />
                </TableCell>

                <TableCell>
                  <IconButton
                    onClick={() => handleEdit?.(institute)} // safely call handleEdit
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
