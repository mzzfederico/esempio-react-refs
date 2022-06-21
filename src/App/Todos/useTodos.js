import { useContext } from "react";
import { ADD_TODO, CHANGE_TEXT, COMPLETE_TODO } from "./constants";
import { todosContext } from "./TodosProvider";

export function useTodos() {
  const { dispatch, state } = useContext(todosContext);

  const addTodo = (text) => dispatch({ type: ADD_TODO, text, date: Date.now() }); /* AGGIUNGI UNA TAG! */
  const completeTodo = (date) => dispatch({ type: COMPLETE_TODO, todoDate: date });
  const saveInputValue = (text) => dispatch({ type: CHANGE_TEXT, text });

  return {
    todos: state.todos,
    inputValue: state.inputValue,
    addTodo,
    completeTodo,
    saveInputValue
    /* Aggiungere funzione che filtra i todo per tag? */
  }
}