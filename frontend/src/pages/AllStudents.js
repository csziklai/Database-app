import React, { useState, useEffect } from 'react';
import { Button, Paper, TextField, Snackbar, TablePagination, TableFooter, Box, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


export default function AllStudents(props) {
  
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const query = new URLSearchParams(window.location.search);
    const queryOpen = query.get("open");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [userCount, setUserCount] = useState(0);

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
    

    const searchChange = (event) => {
      setSearch(event.target.value);
    };


    const searchData = (currentPage) => {
        currentPage -= 1;
            fetch(`http://localhost:8080/student/search/${search}`)
                .then(res => res.json())
                .then((result) => {setStudents(result.content)
                });
        setSearch("");

      };

    useEffect(() => {
        fetch("http://localhost:8080/student/count")
            .then(res => res.json())
            .then(data => setUserCount(data))
            .catch(error => console.error('Error fetching user count:', error));
    }, []);

        // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userCount) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchData();
        }
    };

    function TablePaginationActions(props) {
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

          return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

    TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
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
                {(rowsPerPage > 0
            ? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : students
          ).map((student) => (
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
                <TableFooter>
                <TableRow>
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={userCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                        select: {
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                        },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
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