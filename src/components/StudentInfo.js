import * as React from 'react';
import {useState} from 'react';
import {useLocation} from 'react-router-dom'

function StudentInfo() {
    //const[students, setStudents]=useState([]);
    const location = useLocation();

    return (
        <div>
            <h1>{location.state.name}</h1>
            
            <p>Student Information will be displayed here</p>
        </div>
    );
}

export default StudentInfo;