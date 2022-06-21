import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import './App.css';
import { TodosCounter } from './Todos/TodosCounter';
import TodoInput from './Todos/TodosInput';
import { TodosList } from './Todos/TodosList';
import { TodosProvider } from './Todos/TodosProvider';

export default function App() {
  return (
    <div className="App">
      <TodosProvider>
        <header className="App-header">
          <TodoInput />
          <TodosList />
          <TodosCounter />
        </header>
      </TodosProvider>
    </div>
  );
}