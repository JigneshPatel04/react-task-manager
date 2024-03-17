// TaskDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../actions/taskActions";
import { Form, Button } from "react-bootstrap";

const TaskDetails = () => {
  const { id } = useParams();
  const tasks = useSelector((state) => state.tasks);
  const task = tasks.find((task) => task.id === parseInt(id));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      navigate("/");
    }
  }, [task, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      description,
    };
    dispatch(updateTask(updatedTask));
    // Update local storage after updating task
    const updatedTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");
  };

  return (
    <div>
      {task && (
        <div>
          <h2>Edit Task</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Task
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
