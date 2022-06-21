import { useTodos } from "./TodosProvider";

export function TodosCounter() {
  const { todos } = useTodos();

    return (
      <footer>
        <p>Todo scritti: <b>{ todos.length }</b></p>
        <p>Todo completati: <b>{ todos.filter(todo => todo.isComplete).length }</b></p>
      </footer>
    )
  }