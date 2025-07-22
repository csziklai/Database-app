import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

const StudentInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            navigate("/all?open=true");
        }
    }, [open, navigate]);

    const handleClick = (e) => {
        const student = { name: location.state.name, address: location.state.address };
        const id = location.state.id;

        fetch(`http://localhost:8080/student/getAll/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("Student deleted");
            setOpen(true);
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        const student = { name: location.state.name, address: location.state.address };
        navigate(`/edit/${student.id}`, { state: student });

    }

    return (
        <div className="card">
            <div className='card-body' style={{ width: '18rem' }}>
                <h1 className='card-title'>{location.state.name}</h1>
                <p className='card-text'>Email: {location.state.address}</p>
                <Button onClick={handleEdit}>Edit</Button>
                <Button color="error" onClick={handleClick}>Delete</Button>

            </div>
        </div>
    );
};

export default StudentInfo;