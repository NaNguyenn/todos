import { useState } from "react";
import styles from "./List.module.css";
import { ReactComponent as CheckboxIcon } from "../../assets/checkbox-icon.svg";
import taskService, { Task } from "../../services/task-service";
import useTasks from "../../hooks/useTasks";

const List = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    order: 1,
    completed: false,
  });
  const { tasks, fetchTasks } = useTasks();

  //Handle add task form input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTask = {
      title: event.target.value,
      order: 1,
      completed: false,
    };
    setNewTask(inputTask);
  };

  // Handle add task form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await taskService.add(newTask);
      // console.log("New task added:", response.data);
      setNewTask({
        title: "",
        order: 1,
        completed: false,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle task completion check
  const handleCheckbox = async (task: Task) => {
    try {
      await taskService.update(task);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle task deleting
  const handleDelete = async (task: Task) => {
    try {
      await taskService.delete(task);
      // console.log("Task deleted:", taskId);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
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
        {tasks.map((task) => (
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
