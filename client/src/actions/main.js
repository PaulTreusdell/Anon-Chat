import axios from "axios"

export const fetchMessages = async () => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  }

  try {
    const res = await axios.get("http://127.0.0.1:8000/api/messages/", config);

    const mapped = res.data.map((msg) => ({
      user: msg.user,
      body: msg.body,
    }));
    return mapped;
  } catch (e) {
      console.error("Error fetching messages:", e);
  }
};

export const fetchUser = async () => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  }

  try {
    const res = await axios.get("http://127.0.0.1:8000/api/auth/", config);
    return {
      username: res.data.name,
      text_color: res.data.text_color || "black",
      text_background: res.data.text_background || "white",
    };
  } catch (e) {
      console.error("Error fetching user info:", e);
  }
};

export const storeMessage = async (input) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` } 
  }
  try {
    await axios.post(
      "http://127.0.0.1:8000/api/messages/add/", 
      { message: input }, config
    );
} catch (e) {
    console.error("Error saving message:", e);
}
}