import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  // hooks
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  // when refreshing the page, the data persists (i.e. anything on the todo list or anything that was checked) because, first, the useState above checks the local storage and getting the values if it exists (if it doesn't it will default to an empty array). Then, in the useEffect below, everytime I modify the "todos", it will run the function "localStorage.setItem("ITEMS", JSON.stringify(todos))" which will save the new value from the "todos" in my local storage. Therfore, everytime I add an item, delete an item, or check an item off, the "localStorage.setItem("ITEMS", JSON.stringify(todos))" function is called and updating the todo items in the list in the local storage. And if we refresh the page, the data is being pulled from calling this function "localStorage.setItem("ITEMS", JSON.stringify(todos)).

  // side note: you cannot render hooks conditionally. I.e. you cannot do the following
  // if (todos.length > 0) {
  //   useEffect(() => {
  //     localStorage.setItem("ITEMS", JSON.stringify(todos));
  //   }, [todos]);
  // }
  // No ifs, loops, after returns. the hooks need to be at the top of the file. A rule of hooks.

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  // helper functions
  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      // the following is saying, if my todo item is NOT equal to the above id, then I want to keep it (this makes sure the item i want to delete is selected and not included in the list):
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  // returning jsx
  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
