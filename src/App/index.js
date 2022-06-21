import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import './App.css';
import { TodosCounter } from './Todos/TodosCounter';
import TodosInput from './Todos/TodosInput';
import { TodosList } from './Todos/TodosList';
import { TodosProvider } from './Todos/TodosProvider';

export default function App() {
  return (
    <div className="App">
      <TodosProvider>
        {/* Creare un router con due rotte:   /   e   /:tag */}
        {/* La rotta / mostra tutti i todo */}
        {/* La rotta /todo/:tag prende il param tag da useParams e mostra solo i todo che corrispondono */}
        {/* Es. /todo/spesa mostra solo i todo con dentro {...text: bla bla bla, tag: "spesa"} */}
        {/* Bisogna aggiungere un campo di input in TodosInput, che quando fa addTodo, mette anche la tag */}

        <header className="App-header">
          <TodosInput />
          <TodosList />
          <TodosCounter />
        </header>
      </TodosProvider>
    </div>
  );
}