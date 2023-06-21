import { useState } from "react";
import styles from "./List.module.css";
import { ReactComponent as CheckboxIcon } from "../../assets/checkbox-icon.svg";
import { Todo } from "../../services/todo-service";
import useTodos from "../../hooks/useTodos";

const List = () => {
  // Initialize new todo
  const [newTodo, setNewTodo] = useState({
    title: "",
  });

  // Initialize error
  const [todoError, setTodoError] = useState(false);

  // Get all todos and functions from hook
  const {
    todos,
    loading,
    todoHookError,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  } = useTodos();

  //Handle add todo form input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTodo = {
      title: event.target.value,
      isActive: true,
    };
    setNewTodo(inputTodo);
  };

  // Handle add todo form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      handleCreateTodo(newTodo);

      // Reset new todo
      setNewTodo({
        title: "",
      });
    } catch (error) {
      console.error("Error adding todo:", error);
      setTodoError(true);
    }
  };

  // Handle todo completion check
  const handleCheckbox = async (todo: Todo) => {
    // Switch completed state of checked todo
    const updatedTodo = { ...todo, isActive: !todo.isActive };

    try {
      handleUpdateTodo(updatedTodo);
    } catch (error) {
      // console.error("Error updating todo:", error);
      setTodoError(true);
    }
  };

  // Handle todo deleting
  const handleDelete = async (todo: Todo) => {
    try {
      handleDeleteTodo(todo);
    } catch (error) {
      // console.error("Error deleting todo:", error);
      setTodoError(true);
    }
  };

  if (loading) {
    return <p className={styles.loadingMessage}>Loading...</p>;
  }

  return (
    <>
      {/* Display error if necessary */}
      {(todoError || todoHookError) && (
        <p className={styles.errorMessage}>
          An error occured. Please press F5 to refresh
        </p>
      )}
      {/* Form to add new todo */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todoTitle"
          value={newTodo.title}
          onChange={handleInputChange}
          className={styles.formInput}
          placeholder="What needs to be done?"
          required
          autoComplete="off"
        />
        <button type="submit" hidden></button>
      </form>

      {/* List of todos */}
      <ul className={styles.listGroup}>
        {todos.map((todo) => (
          <li className={styles.listItem} key={todo.id}>
            {/* Checkbox for todo completion */}
            <div
              className={`${styles.checkboxInput} ${
                !todo.isActive ? styles.checkedCheckbox : ""
              }`}
              onClick={() => handleCheckbox(todo)}
            >
              <CheckboxIcon className={!todo.isActive ? "" : styles.hidden} />
            </div>
            {/* Todo title */}
            <span
              className={`${styles.listItemTitle} ${
                !todo.isActive ? styles.checkedTitle : ""
              }`}
            >
              {todo.title}
            </span>
            {/* Delete todo button */}
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(todo)}
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
