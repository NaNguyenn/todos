import { useState } from "react";
import styles from "./List.module.css";
import { ReactComponent as CheckboxIcon } from "../../assets/checkbox-icon.svg";
import { Task } from "../../services/task-service";
import useTasks from "../../hooks/useTasks";

const List = () => {
  // Initialize new task
  const [newTask, setNewTask] = useState({
    title: "",
    order: 1,
    completed: false,
  });

  // Initialize error
  const [taskError, setTaskError] = useState(false);

  // Get all tasks and functions from hook
  const { tasks, loading, taskHookError, addTask, updateTask, deleteTask } =
    useTasks();

  // Get the highest order of current tasks
  const currentMaxOrder = tasks.reduce(
    (max, task) => Math.max(max, task.order),
    0
  );

  //Handle add task form input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTask = {
      title: event.target.value,
      order: currentMaxOrder + 1,
      completed: false,
    };
    setNewTask(inputTask);
  };

  // Handle add task form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await addTask(newTask);

      // Reset new task
      setNewTask({
        title: "",
        order: currentMaxOrder + 2, //Keep new task at highest order
        completed: false,
      });
    } catch (error) {
      // console.error("Error adding task:", error);
      setTaskError(true);
    }
  };

  // Handle task completion check
  const handleCheckbox = async (task: Task) => {
    // Switch completed state of checked task
    const updatedTask = { ...task, completed: !task.completed };

    try {
      await updateTask(updatedTask);
    } catch (error) {
      // console.error("Error updating task:", error);
      setTaskError(true);
    }
  };

  // Handle task deleting
  const handleDelete = async (task: Task) => {
    try {
      await deleteTask(task);
    } catch (error) {
      // console.error("Error deleting task:", error);
      setTaskError(true);
    }
  };

  if (loading) {
    return <p className={styles.loadingMessage}>Loading...</p>;
  }

  return (
    <>
      {/* Display error if necessary */}
      {(taskError || taskHookError) && (
        <p className={styles.errorMessage}>
          An error occured. Please press F5 to refresh
        </p>
      )}
      {/* Form to add new task */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskTitle"
          value={newTask.title}
          onChange={handleInputChange}
          className={styles.formInput}
          placeholder="What needs to be done?"
          required
          autoComplete="off"
        />
        <button type="submit" hidden></button>
      </form>

      {/* List of tasks */}
      <ul className={styles.listGroup}>
        {tasks
          .sort((a, b) => b.order - a.order)
          .map((task) => (
            <li className={styles.listItem} key={task.id}>
              {/* Checkbox for task completion */}
              <div
                className={`${styles.checkboxInput} ${
                  task.completed ? styles.checkedCheckbox : ""
                }`}
                onClick={() => handleCheckbox(task)}
              >
                <CheckboxIcon className={task.completed ? "" : styles.hidden} />
              </div>
              {/* Task title */}
              <span
                className={`${styles.listItemTitle} ${
                  task.completed ? styles.checkedTitle : ""
                }`}
              >
                {task.title}
              </span>
              {/* Delete task button */}
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(task)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default List;
