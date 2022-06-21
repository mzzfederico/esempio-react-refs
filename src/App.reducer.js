import { useEffect, useReducer, useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodosList />
      </header>
    </div>
  );
}

function TodosList() {
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

  function completeTodo(completedTodo) {
    dispatch({
      type: "COMPLETE_TODO",
      todoDate: completedTodo.date,
    });
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      dispatch({
        type: "ADD_TODO",
        date: Date.now()
      });
    }
  }

  return (
    <>
      <input
        type="text"
        onKeyDown={onKeyDown}
        onChange={e => {
          dispatch({
            type: "CHANGE_TEXT",
            text: e.target.value
          });
        }}
        value={state.inputValue}
      />
      <button onClick={() => {
        dispatch({
          type: "ADD_TODO",
          date: Date.now()
        })
      }}>Inserisci todo</button>
      <ul>
        {state.todos.map(
          todo => (
            <li
              onClick={() => completeTodo(todo)}
              key={todo.date}>
              {todo.text} {todo.isComplete && "✓"}
            </li>)
        )}
      </ul>
    </>
  );
}

function reducer(state, action) {
  const nuovoStato = Object.assign({}, state);

  /* { type: "LOAD_TODOS", todos: [...] } */
  if (action.type === "LOAD_TODOS") {
    nuovoStato.todos = action.todos;
  }

  /* {type: "CHANGE_TEXT", text: "..." } */
  if (action.type === "CHANGE_TEXT") {
    nuovoStato.inputValue = action.text;
  }

  /* {type: "ADD_TODO", date: "...." } */
  if (action.type === "ADD_TODO") {
    nuovoStato.todos = nuovoStato.todos.concat({
      text: nuovoStato.inputValue, isComplete: false, date: action.date
    });
    nuovoStato.inputValue = "";
  }

  /* {type: "COMPLETE_TODO", todoDate: "...." } */
  if (action.type === "COMPLETE_TODO") {
    nuovoStato.todos =nuovoStato.todos.map (
      todo => todo.date === action.todoDate
        ? { ...todo, isComplete: !todo.isComplete }
        : todo
    )
  }

  return nuovoStato;
}






function Box({ children }) {
  return (
    <div className='box'>{children}</div>
  )
}

export default App;
