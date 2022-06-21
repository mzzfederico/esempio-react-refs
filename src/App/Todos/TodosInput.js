import { useContext } from "react";
import { todosContext, useTodos } from "./TodosProvider";

export default function TodoInput() {
  const { addTodo, saveInputValue, inputValue } = useTodos();

  return (
    <>
      <input
        type="text"
        onKeyDown={e => {
          if (e.key === "Enter") addTodo();
        }}
        onChange={e => saveInputValue(e.target.value)}
        value={inputValue}
      />

      <button onClick={() => addTodo()}>{'Inserisci todo'}</button>
    </>
  );
}