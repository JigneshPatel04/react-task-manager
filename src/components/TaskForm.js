import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../actions/taskActions";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { generateId } from "../utils/idGenerator";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(""); // State for title validation error
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate title
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
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
      completed: false,
    };

    // Dispatch the addTask action to Redux
    dispatch(addTask(newTask));

    // Reset form fields
    setTitle("");
    setDescription("");

    // Update local storage with the new task
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = [...storedTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <Container>
      <h2>Add Task</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ fontSize: "1.5rem" }}
              />
              {titleError && (
                <Form.Text className="text-danger">{titleError}</Form.Text>
              )}{" "}
              {/* Display title validation error message */}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ fontSize: "1.5rem" }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Add Task
        </Button>
      </Form>
    </Container>
  );
};

export default TaskForm;
