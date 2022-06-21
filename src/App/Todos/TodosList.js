import { useTodos } from "./useTodos";

export function TodosList() {
  const { todos, completeTodo } = useTodos();

  return (
    <>
      <ul>
        {todos.map(
          todo => (
            <li
              onClick={e => completeTodo(todo.date)}
              key={todo.date}>
              {todo.text} {todo.isComplete && "✓"}
            </li>)
        )}
      </ul>
    </>
  );
}