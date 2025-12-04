import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"
import Layout from "./Layout";
import { fetchMessages, fetchUser, storeMessage} from "../actions/main";

export default function MainPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    text_color: "black",
    text_background: "white",
  });
  const socket = useRef(null);

  useEffect(() => {
    async function load() {
      const msgs = await fetchMessages();
      const user = await fetchUser();
      setMessages(msgs);
      setUserInfo(user);
    }
    load()

    socket.current = new WebSocket("ws://127.0.0.1:8000/ws/chat/");

    socket.current.onopen = () => console.log("WebSocket connected");

    socket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);

      setMessages((prev) => [
        ...prev,
        {
          user: {
            username: data.username,
            text_color: data.text_color || "black",
            text_background: data.text_background || "white",
          },
          body: data.message,
        },
      ]);
    };

    socket.current.onclose = () => console.log("WebSocket disconnected");
    socket.current.onerror = (err) => console.error("WebSocket error:", err);

    return () => socket.current.close();
  }, []);

const sendMessage = async () => {
  if (!input.trim()) return;

  const newMessage = {
    user: userInfo,
    body: input,
  };

  setMessages(prev => [...prev, newMessage]);

  await storeMessage(input)

  setInput("");
};

  return (
    <Layout>
      <div style = {{
          border: "1px solid gray",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "10px",
          padding: "10px"
          }}>
        {messages.map((msg, idx) => {
          const isCurrentUser = msg.user.username === userInfo.username;
          return (
            <div
              key={idx}
              style={{
                color: msg.user.text_color,
                background: msg.user.text_background,
                padding: "5px",
                marginBottom: "5px",
                borderRadius: "5px",
                textAlign: isCurrentUser ? "right" : "left",
              }}
            >
              <strong>{msg.user.username}:</strong> {msg.body}
            </div>
          );
        })}
        <div/>
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ marginRight: "5px" }}
      />
      <button onClick={sendMessage}>Send</button>
      <p> Customize Settings <Link to="/settings"> Here! </Link></p>
    </Layout>
  );
}
