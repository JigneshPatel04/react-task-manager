// taskActions.js
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const SET_TASKS = "SET_TASKS"; // Define action type

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    payload: id,
  };
};

export const updateTask = (task) => {
  return {
    type: UPDATE_TASK,
    payload: task,
  };
};

// Define setTasks action creator
export const setTasks = (tasks) => {
  console.log("setTasks", tasks);
  return {
    type: SET_TASKS,
    payload: tasks,
  };
};
