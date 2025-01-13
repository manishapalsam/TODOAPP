import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ToDoView() {
    const location = useLocation();
    const navigate = useNavigate();
    const todos = location.state?.todos || []; // Retrieve data from location state
    const [searchTerm, setSearchTerm] = useState(""); // State to store search term
    const [filteredTodos, setFilteredTodos] = useState(todos); // State to store filtered todos

    // Function to handle search input
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // Filter the todos array based on the search term
        const filtered = todos.filter((todo) =>
            todo.taskName.toLowerCase().includes(value) ||
            todo.category.categoryName.toLowerCase().includes(value) ||
            todo.priority.level.toLowerCase().includes(value)
        );
        setFilteredTodos(filtered);
    };

    // Function to handle delete button
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5218/api/Todo/${id}`);

            const filtered = todos.filter((item) => item.id !== id);

            const filtered = todos.filter((item) => item.id !== id)

            setFilteredTodos(filtered);
            alert("Item deleted successfully");
        } catch (error) {
            alert(
                error.response?.status
                    ? `${error.response.data}!`
                    : `Failed to delete item: ${error.message}!`
            );
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">To-Do List</h1>
           
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search tasks, categories, or priorities"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            
            {filteredTodos.length > 0 ? (
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Sr No</th>
                            <th>Task Name</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Actions</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTodos.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.taskName}</td>
                                <td>{item.category.categoryName}</td>
                                <td>{item.priority.level}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn me-2"
                                        onClick={() => navigate('/createedit', { state: item })}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    {item.isCompleted ? 
                                        <b className="bi bi-check-circle text-success"></b>
                                     : 
                                        <b className="bi bi-x-circle text-danger"></b> 
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-muted">No tasks available</p>
            )}

            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default ToDoView;
