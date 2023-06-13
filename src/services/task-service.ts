import create from "./http-services";

export interface Task {
  id?: string;
  title: string;
  order: number;
  completed: boolean;
}

export default create("/tasks");
