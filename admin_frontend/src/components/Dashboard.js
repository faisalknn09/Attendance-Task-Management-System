import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsonData from "../data.json";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [batches, setBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("isAuthenticated") !== "true") {
            navigate("/");
        } else {
            setBatches(jsonData.batches);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/");
    };

    const handleBatchChange = (e) => {
        setSelectedBatch(e.target.value);
        setSelectedStudent(""); // Reset student dropdown
    };

    const handleAddBatch = () => {
        const newBatchName = prompt("Enter Batch Name:");
        if (newBatchName && !batches.some(batch => batch.name === newBatchName)) {
            const updatedBatches = [...batches, { name: newBatchName, students: [] }];
            setBatches(updatedBatches);
        }
    };

    const handleAddStudent = () => {
        if (!selectedBatch) {
            alert("Select a batch first!");
            return;
        }
        const newStudent = prompt("Enter Student Name:");
        const updatedBatches = batches.map(batch => {
            if (batch.name === selectedBatch && !batch.students.includes(newStudent)) {
                return { ...batch, students: [...batch.students, newStudent] };
            }
            return batch;
        });
        setBatches(updatedBatches);
    };

    const handleSubmitAttendance = () => {
        if (!selectedBatch || !selectedStudent) {
            alert("Select a batch and a student first!");
            return;
        }
        const newRecord = {
            batch: selectedBatch,
            student: selectedStudent,
            time: new Date().toLocaleString(),
        };
        setAttendance([...attendance, newRecord]);
    };

    return (
        <div className="dashboard-container">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>

            <h2>Dashboard</h2>

            <div className="controls">
                <label>Batch:</label>
                <select onChange={handleBatchChange} value={selectedBatch}>
                    <option value="">Select Batch</option>
                    {batches.map((batch, index) => (
                        <option key={index} value={batch.name}>{batch.name}</option>
                    ))}
                </select>
                <button onClick={handleAddBatch}>Add Batch</button>

                <label>Name:</label>
                <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    disabled={!selectedBatch}
                >
                    <option value="">Select Student</option>
                    {selectedBatch &&
                        batches.find(batch => batch.name === selectedBatch)?.students.map((student, index) => (
                            <option key={index} value={student}>{student}</option>
                        ))}
                </select>
                <button onClick={handleAddStudent}>Add Student</button>

                <button className="submit-btn" onClick={handleSubmitAttendance}>Submit Attendance</button>
            </div>

            <h3>Attendance Records</h3>
            <ul className="attendance-list">
                {attendance.map((record, index) => (
                    <li key={index}>
                        {record.student} (Batch: {record.batch}) - {record.time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
