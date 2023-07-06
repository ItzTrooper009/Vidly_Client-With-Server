import React, { useEffect, useState } from "react";
import getCustomers from "../services/customerService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Customers = () => {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const customers = await getCustomers();
        setCustomers(customers);
        // Handle the rental array here
      } catch (error) {
        // Handle any error that occurred during the request
      }
    }

    fetchData();
  }, []);
  return (
    <TableContainer>
      {/* {console.log("Hehehe", customers)} */}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{}}>
            <TableCell align="center" sx={{ fontWeight: 800 }}>
              Customer Name
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 800 }}>
              Membership Type
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 800 }}>
              Phone number
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers?.map((customers) => (
            <TableRow
              key={Math.random() * 5386}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {customers.name}
              </TableCell>
              <TableCell align="center">
                {customers.isGold === true ? "Gold Membership" : "General"}
              </TableCell>
              <TableCell align="center">{customers.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Customers;
