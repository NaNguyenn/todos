import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_TODOS } from "../graphql/queries";
import { Todo } from "../services/todo-service";
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from "../graphql/mutations";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoHookError, setTodoHookError] = useState(false);
  const { data, loading, error } = useQuery(GET_ALL_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  useEffect(() => {
    if (data) {
      setTodos(data.listTodo);
      // console.log(data.listTodo);
    }
    if (error) {
      console.error("Error fetching todos:", error);
      setTodoHookError(true);
    }
  }, [data]);

  // Handle todo addition
  const handleCreateTodo = (newTodo: Todo) => {
    console.log(newTodo);
    createTodo({
      variables: {
        title: newTodo.title,
      },
    });
  };

  // Handle todo update
  const handleUpdateTodo = (updatedTodo: Todo) => {
    updateTodo({
      variables: {
        input: {
          id: updatedTodo.id,
          title: updatedTodo.title,
          isActive: updatedTodo.isActive,
        },
      },
    });
  };

  // Handle todo delete
  const handleDeleteTodo = (todo: Todo) => {
    console.log(todo);
    deleteTodo({
      variables: {
        id: todo.id,
      },
    });
  };

  return {
    todos,
    todoHookError,
    loading,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};

export default useTodos;
