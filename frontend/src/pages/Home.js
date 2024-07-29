import * as React from 'react';
import Button from '@mui/material/Button';
import {Link } from "react-router-dom";
import '../styles.css';


export default function Home() {
    return (
        <div className='home'>
            <h1>Welcome.</h1>
            <div className='buttons'>
            <Link to="/add">
                <Button variant="contained" 
                className="button" sx={{ padding: '10px', margin: '10px' }}
                >Add student</Button>
            </Link>
            <Link to="/all">
                <Button variant="contained" sx={{ padding: '10px', margin: '10px' }}
                >View students</Button>
            </Link>
            </div>
        </div>

    )
}