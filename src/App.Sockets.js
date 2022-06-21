import logo from './logo.svg';
import './App.css';

import { webSocket } from 'rxjs/webSocket';
import { useEffect, useRef, useState } from 'react';
const demoSocketUrl = "wss://localhost:3001";

function App() {
  const socketRef = useRef();

  const [messages, saveMessages] = useState([]);

  useEffect(() => {
    socketRef.current = webSocket(demoSocketUrl);

    socketRef.current.subscribe({
      next: msg => saveMessages(
        previousMessages => previousMessages.concat(
          'message received: ' + msg
        )
      ),
      error: err => saveMessages(
        previousMessages => previousMessages.concat(
          JSON.stringify(err)
        )
      ),
      complete: () => saveMessages(
        previousMessages => previousMessages.concat(
          'complete'
        )
      )
    });

    return () => socketRef.current.complete();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {messages.map(
            message => <li>{message}</li>
          )}
        </ul>
        </header>
    </div>
  );
}

export default App;
