import React from 'react';
import "./App.css";
import Chatbot from "./components/Chatbot.jsx";

function App() {
  const config = {}; // Your configuration options
  const messageParser = (userMessage) => userMessage; // Your message parsing logic
  const actionProvider = (parsedMessage) => 'Bot response'; // Your action provider logic
  return (
    <div>
      <Chatbot config={config} messageParser={messageParser} actionProvider={actionProvider} />
    </div>
  );
}

export default App;
