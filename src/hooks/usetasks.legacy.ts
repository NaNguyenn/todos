import { useState, useEffect } from "react";
import taskService, { Task } from "../services/todo-service";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskHookError, setTaskHookError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  //Handle fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await taskService.getAll<Task>();
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTaskHookError(true);
      setLoading(false);
    }
  };

  // Handle task addition
  const addTask = async (newTask: Task) => {
    // Update tasks state instantly
    setTasks((prevTasks) => [...prevTasks, newTask]);

    try {
      await taskService.add(newTask);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      setTaskHookError(true);
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
      setTaskHookError(true);
    }
  };

  // Handle task delete
  const deleteTask = async (task: Task) => {
    // Update tasks state instantly
    setTasks((prevTasks) =>
      prevTasks.filter((prevTask) => prevTask.id !== task.id)
    );

    try {
      await taskService.delete(task);
    } catch (error) {
      console.error("Error deleting task:", error);
      setTaskHookError(true);
    }
  };

  return { tasks, taskHookError, loading, addTask, updateTask, deleteTask };
};

export default useTasks;
