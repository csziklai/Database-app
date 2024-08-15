import React, { useState, useEffect } from 'react';
import { Button, Paper, TextField, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function AllStudents(props) {
  
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const query = new URLSearchParams(window.location.search);
    const queryOpen = query.get("open");

    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudents(result);
            });
    }, []);

    useEffect(() => {
        if (queryOpen) {
            setOpen(true);
        }
    }, [queryOpen]);

    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="inherit" size="small" onClick={handleClose}>
                Close
            </Button>
        </React.Fragment>
    );

    // const changePage = (event) => {
    //     let targetPage = parseInt(event.target.value);
    //     if (this.state.search) {
    //       this.searchData(targetPage);
    //     } else {
    //       this.findAllBooks(targetPage);
    //     }
    //     this.setState({
    //       [event.target.name]: targetPage,
    //     });
    //   };
    

    const searchChange = (event) => {
      setSearch(event.target.value);
    };


    const searchData = (currentPage) => {
        currentPage -= 1;
            fetch(`http://localhost:8080/student/search/${search}`)
                .then(res => res.json())
                .then((result) => {
                    setStudents(result.content);
                });
        setSearch("");

      };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchData();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', marginTop: '20px', marginRight: '40px' }}>
                <TextField id="fullWidth" label="Search" variant="outlined" size="small"
                onChange={searchChange}
                onKeyDown={handleKeyPress}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon style = {{ cursor: "pointer"}} onClick={searchData}></SearchIcon>
                      </InputAdornment>
                    ),
                  }} />
            </div>
            {(students.length === 0) ? <h4>No results found.</h4> : ''}
            <TableContainer component={Paper} style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1000px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Credits</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {students.map((student) => (
                    <TableRow
                    key={student.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" style = {{ cursor: "pointer"}} onClick={() => navigate(`/student/${student.id}`, { state: student })}>
                        {student.name}
                    </TableCell>
                    <TableCell align="right">{student.address}</TableCell>
                    <TableCell align="right">{student.credits}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message="Student deleted"
                action={action}
            />
        </div>
    );
}