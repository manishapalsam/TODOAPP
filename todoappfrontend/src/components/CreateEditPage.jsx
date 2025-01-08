import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function CreateEditPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [createData, setCreateDate] = useState(null);
  const [taskName, setTaskName] = useState(location.state?.taskName || "");
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.categoryId || ""
  );
  const [selectedPriority, setSelectedPriority] = useState(
    location.state?.priorityId || ""
  );
  const [selectedStatus, setSelectedStatus] = useState(
    location.state?.isCompleted.toString() || "false"
  );

  const [taskNameError, setTaskNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [priorityError, setPriorityError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5218/api/Todo/Create-task")
      .then((response) => setCreateDate(response.data))
      .catch((error) => {
        alert(`Please try again later ${error.message}`);
        navigate("/");
      });
  }, []);

  const categories = createData?.categories || [];
  const priorities = createData?.priorities || [];

  const handleValidation = () => {
    let flag = false;

    if (taskName.trim() === "") {
      setTaskNameError(true);
      flag = true;
    } else {
      setTaskNameError(false);
    }

    if (selectedCategory === "") {
      setCategoryError(true);
      flag = true;
    } else {
      setCategoryError(false);
    }

    if (selectedPriority === "") {
      setPriorityError(true);
      flag = true;
    } else {
      setPriorityError(false);
    }

    if (selectedStatus === "") {
      setStatusError(true);
      flag = true;
    } else {
      setStatusError(false);
    }

    return flag;
  };

  const SubmitButton = async (e) => {
    e.preventDefault();

    if (handleValidation() === true) return;

    const taskData = {
      taskName,
      categoryId: selectedCategory,
      priorityId: selectedPriority,
      isCompleted: selectedStatus,
    };

    try {
      let response;
      if (location.state) {
        response = await axios.put(
          `http://localhost:5218/api/Todo/${location.state.id}`,
          taskData
        );
      } else {
        response = await axios.post("http://localhost:5218/api/Todo", taskData);
      }

      if (response.status === 200) {
        if (location.state) {
          alert("Data Edited Successfully");
          navigate("/");
        } else {
          alert("Data Saved Successfully");
          setTaskName("");
          setSelectedCategory("");
          setSelectedPriority("");
        }
      }
    } catch (error) {
      if (error.response?.status) {
        alert(`${error.response.data}!`);
      } else {
        alert(`${location.state ? "Failed to edit task" : "Failed to create task"}-${error.message}`);
        navigate("/");
      }
    }
  };

  const handleInputChange = (e) => {
    setTaskName(e.target.value);
    setTaskNameError(e.target.value.trim() === "");
  };

  const handleSelectChange = (e, field) => {
    const value = e.target.value;

    if (field === "category") {
      setSelectedCategory(value);
      setCategoryError(value === "");
    } else if (field === "priority") {
      setSelectedPriority(value);
      setPriorityError(value === "");
    } else {
      setSelectedStatus(value);
      setStatusError(value === "");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        {location.state ? "Edit Task" : "Create New Task"}
      </h1>
      <form onSubmit={SubmitButton} className="border p-4 shadow rounded">
        <div className="mb-3">
          <label className="form-label">Task Name:</label>
          <input
            type="text"
            className={`form-control ${taskNameError ? "is-invalid": taskName ? "is-valid" : ""}`}
            value={taskName}
            onChange={handleInputChange}
            placeholder="Enter task name"
          />
          {taskNameError && 
            <div className="invalid-feedback">Task name is required.</div>
          }
        </div>
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <select
            className={`form-select ${categoryError ? "is-invalid" : selectedCategory ? "is-valid" : ""}`}
            value={selectedCategory}
            onChange={(e) => handleSelectChange(e, "category")}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
          {categoryError && 
            <div className="invalid-feedback">Please select a category.</div>
          }
        </div>
        <div className="mb-3">
          <label className="form-label">Priority:</label>
          <select
            className={`form-select ${priorityError ? "is-invalid": selectedPriority? "is-valid" : ""}`}
            value={selectedPriority}
            onChange={(e) => handleSelectChange(e, "priority")}
          >
            <option value="">Select Priority</option>
            {priorities.map((priority) => (
              <option key={priority.priorityId} value={priority.priorityId}>
                {priority.level}
              </option>
            ))}
          </select>
          {priorityError && 
            <div className="invalid-feedback">Please select a priority.</div>
          }
        </div>

        {location?.state && 
          <div className="mb-3">
            <label className="form-label">Status:</label>
            <select
              className={`form-select ${statusError ? "is-invalid": selectedStatus ? "is-valid" : ""}`}
              value={selectedStatus}
              onChange={(e) => handleSelectChange(e, "status")}
            >
              <option value="">Select Status</option>
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </select>
            {statusError && 
              <div className="invalid-feedback">Please select a status.</div>
            }
          </div>
        }

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            {location.state ? "Update Task" : "Create Task"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEditPage;
