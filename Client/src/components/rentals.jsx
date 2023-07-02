import React, { useEffect, useState } from "react";
import getRentals from "../services/rentleService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Rentals = () => {
  const [rental, setRental] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const rental = await getRentals();
        setRental(rental);
        // Handle the rental array here
      } catch (error) {
        console.log("Error:", error);
        // Handle any error that occurred during the request
      }
    }

    fetchData();
  }, []);
  return (
    <TableContainer>
      {console.log(rental)}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{}}>
            <TableCell align="center" sx={{ fontWeight: 800 }}>
              Customer
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 800 }}>
              Movie
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 800 }}>
              Issue Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rental?.map((rental) => (
            <TableRow
              key={Math.random() * 5306}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {rental.customer.name}
              </TableCell>
              <TableCell align="center">{rental.movie.title}</TableCell>
              <TableCell align="center">{rental.dateOut}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Rentals;
