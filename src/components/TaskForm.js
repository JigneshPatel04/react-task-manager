import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../actions/taskActions";
import { Container, Form, Button } from "react-bootstrap";
import { generateId } from "../utils/idGenerator";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status
  const [titleError, setTitleError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate title
    if (!title.trim()) {
      setTitleError("Title is required");
      return; // Do nothing if title is empty
    }
    // Reset title validation error
    setTitleError("");

    // Generate a unique ID for the new task
    const taskId = generateId();

    // Create the new task object
    const newTask = {
      id: taskId,
      title,
      description,
      status,
      completed: false,
    };

    // Dispatch the addTask action to Redux
    dispatch(addTask(newTask));

    // Reset form fields
    setTitle("");
    setDescription("");
    setStatus("Pending"); // Reset status to default

    // Update local storage with the new task
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = [...storedTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <Container>
      <h2>Add Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleError && (
            <Form.Text className="text-danger">{titleError}</Form.Text>
          )}{" "}
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4} // Reduce the number of rows
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </Form.Control>
        </Form.Group>
        <div style={{ marginTop: "1rem" }}>
          <Button variant="primary" type="submit">
            Add Task
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default TaskForm;
