import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';

const EditInfo = () => {
    const paperStyle = {padding: '50px 20px', width:600, margin: "20px auto"}
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState(location.state.name);
    const [address, setAddress] = useState(location.state.address);

    const handleUpdate = (e) => {
        e.preventDefault();
        const student = { name, address };
        const id = location.state.id;
        console.log(id);

        fetch(`http://localhost:8080/student/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("Student updated");
            navigate("/all");
        });
    };

    return (
        <div className="edit-info">
            <Paper elevation={3} style = {paperStyle}>
            <h1>Edit Student Information</h1>
            <form onSubmit={handleUpdate} style={{ marginTop: '20px' }}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="email"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Email"
                    style={{ marginRight: '10px' }}
                />
                <Button type="submit">Update</Button>
            </form>
            </Paper>
        </div>
    );
}

export default EditInfo;