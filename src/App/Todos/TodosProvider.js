import { createContext, useEffect, useReducer } from "react";
import {  LOAD_TODOS } from "./constants";
import reducer from "./reducer";

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
        type: LOAD_TODOS,
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

