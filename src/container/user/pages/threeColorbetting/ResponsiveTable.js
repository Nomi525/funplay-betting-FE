import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import EventIcon from "@mui/icons-material/Event";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#000",
  color: "#fff",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Lighten border color
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#333",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#444",
  },
  "&:hover": {
    backgroundColor: "#555",
    cursor: "pointer",
  },
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#222",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  textAlign: "center",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Lighten border color
}));

const SmallTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
}));

const ResponsiveTable = ({ data }) => {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        bgcolor: "#000",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <SmallTypography variant="h5" align="center" sx={{ marginBottom: 2 }}>
        <EventIcon fontSize="small" /> Game Records
      </SmallTypography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderCell align="center" bgcolor="#222">
                Period
              </HeaderCell>
              <HeaderCell align="center" bgcolor="#222">
                Price
              </HeaderCell>
              <HeaderCell align="center" bgcolor="#222">
                Number
              </HeaderCell>
              <HeaderCell align="center" bgcolor="#222">
                Result
              </HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.period}>
                <StyledTableCell align="center">{row.period}</StyledTableCell>
                <StyledTableCell align="center">{row.price}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.resultNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      width: "16px",
                      height: "16px",
                      bgcolor:
                        row.resultColor === "Red"
                          ? "#f44336"
                          : row.resultColor === "Green"
                          ? "#4caf50"
                          : row.resultColor === "Violet"
                          ? "#8a2be2"
                          : "transparent",
                      borderRadius: "50%",
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResponsiveTable;
