import axios from "axios"

export const handleLogin = async(data) => {
  const config = {
    name: data.username,
    password: data.password,
  };

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/auth/", config);
    if (res.status === 200) {
      localStorage.setItem("access", res.data.tokens.access);
      localStorage.setItem("refresh", res.data.tokens.refresh);
    }
  }
  catch(e) {
    console.error(`Error Logging in ${e}`);
  }
}

export const handleRegister = async(data) => {
  const config = {
    name: data.username,
    password: data.password,
  };

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/register/", config);
    if (res.status === 201) {
      localStorage.setItem("access", res.data.tokens.access);
      localStorage.setItem("refresh", res.data.tokens.refresh);
    }
  }
  catch(e) {
    console.error(`Error Registering in ${e}`);
  }
}