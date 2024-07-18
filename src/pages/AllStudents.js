import * as React from 'react';
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function AllStudents() {
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

    return (
    <Paper elevation={3} style={innerStyle}>
    {students.map(student => (
        <ul elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}> 
        <li>Name: {student.name}</li>
        <li>Address: {student.address}</li>
        </ul>
    ))}
    
</Paper>
)

}