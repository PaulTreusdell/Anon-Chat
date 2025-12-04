import axios from "axios"

export const handleSettings = async(data) => {
  const accessConfig = {
    headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}
  };
  const refreshConfig = {
    refresh: localStorage.getItem("refresh")
  };

  try {
    await axios.put("http://127.0.0.1:8000/api/auth/", data, accessConfig);
  }
  catch (e) {
    if (e.response.status === 401) {
      const refreshResponse = await axios.post("http://127.0.0.1:8000/api/auth/refresh/", refreshConfig);
      localStorage.setItem("access", refreshResponse.data.access);
    } else {
        console.error(`Failed To Retrieve Data ${e}`);
      }
  }
};