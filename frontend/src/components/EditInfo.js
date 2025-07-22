import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

const EditInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState(location.state.name);
    const [address, setAddress] = useState(location.state.address);

    const handleUpdate = (e) => {
        e.preventDefault();
        const student = { name, address };
        const id = location.state.id;

        fetch(`http://localhost:8080/student/getAll/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("Student updated");
            //navigate("/all"); UNCOMMENT
        });
    };

    return (
        <div className="edit-info">
            <h1>Edit Student Information</h1>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                />
                <input
                    type="email"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Email"
                />
                <Button type="submit">Update</Button>
            </form>
        </div>
    );
}

export default EditInfo;