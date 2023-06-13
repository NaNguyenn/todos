import { useState, useEffect } from "react";
import taskService, { Task } from "../services/task-service";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskHookError, setTaskHookError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  //Handle fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await taskService.getAll<Task>();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTaskHookError("An error occurred. Please press F5 refresh the page.");
    }
  };

  // Handle task addition
  const addTask = async (newTask: Task) => {
    // Update tasks state instantly
    setTasks((prevTasks) => [...prevTasks, newTask]);

    try {
      await taskService.add(newTask);
      // Fetch updated tasks from the API
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      setTaskHookError("An error occurred. Please press F5 refresh the page.");
    }
  };

  // Handle task update
  const updateTask = async (updatedTask: Task) => {
    // Update tasks state instantly
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

    try {
      await taskService.update(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      setTaskHookError("An error occurred. Please press F5 refresh the page.");
    }
  };

  // Handle task delete
  const deleteTask = async (task: Task) => {
    // Update tasks state optimistically
    setTasks((prevTasks) =>
      prevTasks.filter((prevTask) => prevTask.id !== task.id)
    );

    try {
      await taskService.delete(task);
      // Fetch updated tasks from the API
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      setTaskHookError("An error occurred. Please press F5 refresh the page.");
    }
  };

  return { tasks, taskHookError, addTask, updateTask, deleteTask };
};

export default useTasks;
