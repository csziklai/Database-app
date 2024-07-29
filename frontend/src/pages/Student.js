import * as React from 'react';
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Link } from "react-router-dom";

export default function Student() {
    const paperStyle = {padding: '50px 20px', width:600, margin: "20px auto"}
    //const innerStyle = {padding: '50px 20px', width:500, margin: "20px auto"}
    const[name, setName]=useState('')
    const[address, setAddress]=useState('')
    //const[students, setStudents]=useState([])

    const handleClick = (e)=>{
        //e.preventDefault()
        const student = {name, address}
        console.log(student)
        fetch("http://localhost:8080/student/add", {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(student)
        }).then(()=> {
            console.log("New student added")
        })
    }


  return (
    <Paper elevation = {3} style = {paperStyle}>
        <h1>Add Student</h1>
    <Box
    
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Full name" variant="outlined" fullWidth
      value ={name}
      onChange={(e)=> setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
      value={address}
      onChange={(e)=> setAddress(e.target.value)}
      />
      <Link to="/all"><Button variant="contained" onClick={handleClick}>Submit</Button></Link>
      

    </Box>

    </Paper>


  );
}
