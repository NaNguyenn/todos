import { useState, useEffect } from "react";
import taskService, { Task } from "../services/task-service";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

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
    }
  };

  return { tasks, fetchTasks };
};

export default useTasks;
