import { TodoItem } from "./TodoItem";

export function TodoList({todos, toggleTodo, deleteTodo}) {
    return (
      <ul className="list">
        {/* The following is called "short circuiting". Therefore, whenever "todos.length === 0" is TRUE, the "No Todos" will be rendered. However if "todos.length === 0" is false, then the "No Todos" will not render at all and move to the rest of the code*/}
        {todos.length === 0 && "All empty here! Add items above ..."}
        {todos.map((todo) => {
          return (
              <TodoItem id={todo.id} completed={todo.completed} title={todo.title} key={todo.key} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
          );
        })}
      </ul>
    );
    
}