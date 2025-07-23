import CustomTypography from "./CustomTypography";
import CustomButton from "./CustomButton";

function CustomTable({
  maxWidth = "100%",
  tableData = [],
  tableHeaders = [],
}) {
  // Define local handlers instead of expecting them from props
 

  return (
    <Grid container>
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
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
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
              <TableRow
                key={index}
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  cursor: "pointer",
                }}
              
              >
                <TableCell
                  sx={{
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {index + 1}
                </TableCell>

                {(data.row || []).map((item, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default CustomTable;
