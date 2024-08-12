import React, { useState, useEffect } from 'react';
import { Button, Paper, TextField, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";


export default function AllStudents(props) {
  
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const innerStyle = { padding: '50px 20px', width: 500, margin: "20px auto" };
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
        axios
          .get(
            "http://localhost:8080/search/" +
              search +
              "?page=" +
              currentPage //+
            //   "&size=" +
            //   this.state.booksPerPage
          )
          .then((response) => response.data)
          .then((data) => {
            setStudents(data.content);
            //   totalPages: data.totalPages,
            //   totalElements: data.totalElements,
            //   currentPage: data.number + 1,
            });
      };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', marginTop: '20px', marginRight: '40px' }}>
                <TextField id="fullWidth" label="Search" variant="outlined" size="small"
                onChange={searchChange}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon onClick={searchData}>  </SearchIcon>
                      </InputAdornment>
                    ),
                  }} />
            </div>
            <Paper elevation={3} style={innerStyle}>
                {students.map(student => (
                    <ul elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left", cursor: "pointer" }}
                        key={student.id}>
                        <li onClick={() => navigate(`/student/${student.id}`, { state: student })}>Name: {student.name}</li>
                        <li>Email: {student.address}</li>
                    </ul>
                ))}
            </Paper>

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