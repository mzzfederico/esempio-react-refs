import logo from './logo.svg';
import './App.css';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </header>
    </div>
  );
}

const Home = () => {
  const dropdownRef = useRef();
  const buttonRef = useRef();

  const [showDropdown, changeShowDropdown] = useState(false);

  useEffect(() => {
    const listener = e => {
      if (!dropdownRef.current) return;
      if (e.target === buttonRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      const rect = dropdownRef.current.getBoundingClientRect();

      if ((x > rect.x && x < rect.right) && (y > rect.y && y < rect.bottom)) { } else {
        if (showDropdown) changeShowDropdown(false);
      }
    }

    window.addEventListener('click', listener)
    return () => window.removeEventListener('click', listener)
  }, [showDropdown]);

  const risultati = [
    {text: "Lorem", value: 100},
    {text: "ipsum", value: 23},
    {text: "dolor", value: 55},
    {text: "sit", value: 67},
    {text: "amet", value: 12},
    {text: "consectetur", value: 34},
    {text: "adipisicing", value: 55},
    {text: "elit", value: 77},
    {text: "Et", value: 13},
    {text: "consequuntur", value: 34},
    {text: "amet", value: 11},
    {text: "velit", value: 5},
  ]

  return <>
    <div>
      <button
        ref={buttonRef}
        onClick={e => changeShowDropdown(s => !s)}>
        {"Mostra risultati"}
      </button>
      {showDropdown && <ul
        ref={dropdownRef}
        style={{
          border: "1px solid white",
          listStyle: "none",
          textAlign: "left"
        }}>
         {risultati
            .map(risultato => <li>{risultato.text}</li>)}
      </ul>}
    </div>
  </>
}

export default App;
