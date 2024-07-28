import * as React from 'react';
import {useState, useEffect} from 'react'
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom';

export default function AllStudents(props) {
    const[students, setStudents]=useState([]);
    const innerStyle = {padding: '50px 20px', width:500, margin: "20px auto"};


    useEffect(()=> {
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result) => {
            setStudents(result);
        }
    )
    }, []);

    const navigate = useNavigate();

    return (
        <Paper elevation={3} style={innerStyle}>
            {students.map(student => (
                <ul elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} 
                key={student.id}> 
                
                    <li onClick={()=> navigate(`/student/${student.id}`,{state: students})}>Name: {student.name}</li>
                    <li>Email: {student.address}</li>
                </ul>
            ))}
        </Paper>
    )

}