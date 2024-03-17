import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, setTasks } from "../actions/taskActions";
import { ListGroup, Button } from "react-bootstrap";
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

  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem("tasks"); // Clear tasks from local storage when unmounting
  //   };
  // }, []);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    // Update local storage after deleting task
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <h2>Task List</h2>
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item
            key={task.id}
            className="d-flex justify-content-between align-items-center"
          >
            <Link to={`/task/${task.id}`}>{task.title}</Link>
            <Button variant="danger" onClick={() => handleDelete(task.id)}>
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TaskList;
