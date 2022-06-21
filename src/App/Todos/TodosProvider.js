import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer";

export const todosContext = createContext(null);

export function TodosProvider({children}) {
  const [state, dispatch] = useReducer(reducer, {
    inputValue: "",
    todos: []
  });

  useEffect(() => {
    const todoLocal = localStorage.getItem("todos");
    if (todoLocal) {
      dispatch({
        type: "LOAD_TODOS",
        todos: JSON.parse(todoLocal)
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <todosContext.Provider value={{state, dispatch}}>
      {children}
    </todosContext.Provider>
  )
}

export function useTodos() {
  const { dispatch, state } = useContext(todosContext);

  const addTodo = (text) => dispatch({ type: "ADD_TODO", text, date: Date.now() });
  const completeTodo = (date) => dispatch({ type: "COMPLETE_TODO", todoDate: date });
  const saveInputValue = (text) => dispatch({ type: "CHANGE_TEXT", text });

  return {
    todos: state.todos,
    inputValue: state.inputValue,
    addTodo,
    completeTodo,
    saveInputValue
  }
}