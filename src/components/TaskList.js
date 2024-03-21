import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, setTasks } from "../actions/taskActions";
import { ListGroup, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks) || []; // Provide a default value for tasks
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      dispatch(setTasks(storedTasks));
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      dispatch(deleteTask(id));
      // Update local storage after deleting task
      const updatedTasks = tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <Row className="mb-3">
        <Col xs={8}>
          <h5>Task</h5>
        </Col>
        <Col>
          <h5>Status</h5>
        </Col>
        <Col>
          <h5>Action</h5>
        </Col>
      </Row>
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item
            key={task.id}
            className="d-flex justify-content-between align-items-center"
          >
            <Col xs={8}>
              <Link to={`/task/${task.id}`}>{task.title}</Link>
            </Col>
            <Col>
              <div>{task.status}</div>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            </Col>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TaskList;
