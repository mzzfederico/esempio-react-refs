import { useEffect, useState } from 'react';
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
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoLocal = localStorage.getItem("todos");
    if (todoLocal) setTodos(JSON.parse(todoLocal));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function completeTodo(completedTodo) {
    setTodos(todos => todos.map(
      todo => todo.date === completedTodo.date
        ? { ...todo, isComplete: !todo.isComplete }
        : todo
    ))
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      setTodos(todos => todos.concat({
        text: e.target.value, isComplete: false, date: Date.now()
      }))
      setInputValue("");
    }
  }

  return (
    <>
      <input
        type="text"
        onKeyDown={onKeyDown}
        onChange={e => setInputValue(e.target.value)}
        value={inputValue}
      />
      <ul>
        {todos.map(
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

function Box({ children }) {
  return (
    <div className='box'>{children}</div>
  )
}

export default App;
