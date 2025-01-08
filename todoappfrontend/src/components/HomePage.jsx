import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios'; 

function HomePage() {
    const navigate = useNavigate();

    // View button click based on type
    const ViewButtonClick = async (type) => {
        try {
            console.log();
            const response = await axios.get(`http://localhost:5218/api/Todo?type=${type}`);
            console.log(response.data);
            navigate('/table', { state: { todos: response.data } }); // Pass data to the ToDoView component
        } catch (error) {
            alert(`Please try again later: ${error.message}`);
        }
    };

    // Function to handle "Create New Task" button click
    const CreateNewTaskClick = () => {
        navigate('/createedit'); // Navigate and pass data
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Welcome to To-Do App</h1>
            <div className="text-center mb-4">
                <button className="btn btn-primary me-2" onClick={CreateNewTaskClick}>
                    Create New Task
                </button>
            </div>
            <div className="d-flex justify-content-center">
                <button
                    className="btn btn-secondary me-2"
                    onClick={() => ViewButtonClick('work')}
                >
                    Work To Do
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => ViewButtonClick('Personal')}
                >
                    Personal To Do
                </button>
            </div>
        </div>
    );
}

export default HomePage;