import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import "./Table.css";

function createData(id,name,time) {
  return {
    id,
    name,
    time,
    order: [
      {
        id:1,
        orderName: "Pizza",
        price: 100,
        amount: 3,
      },
      {
        id:2,
        orderName: "Burger",
        price: 60,
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [isCompleted, setCompleted] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} className={isCompleted ? "green-row" : ""}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">{row.time}</TableCell>
        {/* <TableCell align="right">{row.carbs}</TableCell> */}
        {/* <TableCell align="right">{row.protein}</TableCell> */} 
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} className={isCompleted ? "light-green" : ""}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Orders
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontWeight: "bold", fontSize:"1.1rem"}}>Items</TableCell>
                    <TableCell style={{fontWeight: "bold", fontSize:"1.1rem"}}>Order Name</TableCell>
                    <TableCell align="left" style={{fontWeight: "bold", fontSize:"1.1rem"}}>Amount</TableCell>
                    <TableCell align="left" style={{fontWeight: "bold", fontSize:"1.1rem"}}>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.order.map((orderRow) => (
                    <TableRow key={orderRow.id}>
                      <TableCell component="th" scope="row">
                        {orderRow.id}
                      </TableCell>
                      <TableCell>{orderRow.orderName}</TableCell>
                      <TableCell align="left">{orderRow.amount}</TableCell>
                      <TableCell align="left">
                        {Math.round(orderRow.amount * orderRow.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <button onClick={()=>{
                    setCompleted(true);
                  }}>Completed</button>
                  <button onClick={()=>{
                    setCompleted(false);
                  }}>Pending</button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    order: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(1,"Vivek", "1:30 PM"),
  createData(2,"Kirtan","2:45 PM"),
  createData(3,"Het", "3:00 PM"),
  createData(4,"Pratham", "3:12 PM"),
  createData(5,"Armin","4:10 PM"),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper} className='table-container'>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left" style={{fontWeight: "bold", fontSize:"1.4rem"}}>ID</TableCell>
            <TableCell align="center" style={{fontWeight: "bold", fontSize:"1.4rem"}}>Name</TableCell>
            <TableCell align="center" style={{fontWeight: "bold", fontSize:"1.4rem"}}>Time</TableCell>
            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
