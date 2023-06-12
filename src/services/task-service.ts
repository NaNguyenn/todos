import create from "./http-services";

export interface Task {
    id?: string;
    title: string;
    completed: boolean;
  }

export default create('/tasks')