import logo from './logo.svg';
import './App.css';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  const [mousePosition, saveMousePosition] = useState({ x: 0, y: 0 });
  const [tooltipText, saveTooltipText] = useState("");

  useEffect(() => {
    const listener = (e) => {
      var x = e.clientX;
      var y = e.clientY;

      saveMousePosition({ x, y });
    };

    window.addEventListener('mousemove', listener);
    return () => {
      window.removeEventListener('mousemove', listener)
    }
  }, []);

  return (
    <div className="App">
      <tooltipContext.Provider value={{ ...mousePosition, text: tooltipText, saveText: saveTooltipText }}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </header>
        <Tooltip />
      </tooltipContext.Provider>
    </div>
  );
}

const tooltipContext = createContext({ x: 0, y: 0, text: "" });

const Tooltip = () => {
  const {text, x, y} = useContext(tooltipContext);

  return text ? (
    <span style={{
      position: "fixed",
      top: y + 5,
      left: x + 5,
      background: "white",
      color: "black"
    }}>
      {text}
    </span>
  ) : null;
}

const Home = () => {
  const tooltip = useContext(tooltipContext);

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
    <ul>
      {risultati.map(risultato => <li
        onMouseLeave={() => tooltip.saveText("")}
        onMouseEnter={() => tooltip.saveText(risultato.value)}>{risultato.text}</li>)}
    </ul>
  </>
}

export default App;
