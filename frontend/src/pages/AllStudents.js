import * as React from 'react';
import {useState, useEffect} from 'react'
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';


export default function AllStudents(props) {
    const[students, setStudents]=useState([]);
    const innerStyle = {padding: '50px 20px', width:500, margin: "20px auto"};
    const [open, setOpen] = useState(false);
    const query = new URLSearchParams(window.location.search);
    const queryOpen = query.get("open");

    useEffect(()=> {
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result) => {
            setStudents(result);
        }
    )
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

    return (
        <div>
        <Paper elevation={3} style={innerStyle}>
            {students.map(student => (
                <ul elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left", cursor:"pointer"}} 
                key={student.id}> 
                
                    <li onClick={()=> navigate(`/student/${student.id}`,{state: student})}>Name: {student.name}</li>
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
    )

}