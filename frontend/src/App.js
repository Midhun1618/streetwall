import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./App.css";
import messageCard from "./message-card.png";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const REACT_APP_BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;

  const fetchMessages = useCallback(async () => {
    const res = await axios.get(`${REACT_APP_BACKEND_SERVER}/api/messages`);
    setMessages(res.data);
  }, [REACT_APP_BACKEND_SERVER]);

  const postMessage = async () => {
    if (!text.trim()) return;
    await axios.post(`${REACT_APP_BACKEND_SERVER}/api/messages`, { text });
    setText("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="body">
      <div className="container">
        <div className="heading">Public Message Board</div>
        <div className="input-start">
          <input
            className="input-area"
            type="text"
            placeholder="Write a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="post-button" onClick={postMessage}>POST</div>
        </div>

        <div className="messages">
          {messages.map((msg) => (
            <div className="message-box" key={msg._id} style={{ backgroundImage: `url(${messageCard})` }}>
              {msg.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
