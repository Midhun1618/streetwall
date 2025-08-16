import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const BACKEND_SERVER = process.env.BACKEND_SERVER;

  const fetchMessages = useCallback(async () => {
    const res = await axios.get(`${BACKEND_SERVER}/api/messages`);
    setMessages(res.data);
  }, [BACKEND_SERVER]);

  const postMessage = async () => {
    if (!text.trim()) return;
    await axios.post(`${BACKEND_SERVER}/api/messages`, { text });
    setText("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="container">
      <h2>Public Message Board</h2>
      <div className="input-area">
        <input
          type="text"
          placeholder="Write a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={postMessage}>POST</button>
      </div>

      <div className="messages">
        {messages.map((msg) => (
          <div className="message-box" key={msg._id}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
