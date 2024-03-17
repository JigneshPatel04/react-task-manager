import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import TaskForm from "./components/TaskForm";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Task Manager
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Task List
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/task/new">
              Add Task
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/task/new" element={<TaskForm />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
