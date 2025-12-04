import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { handleLogin } from "../actions/auth" 

export default function LoginPage() {
  const [data, setData] = useState({
    username: "",
    password: "",
  })
  const navigate = useNavigate()
  const onChange = e => {
    setData({...data, [e.target.name]: e.target.value})
  }
  const submitForm = async(e) => {
    e.preventDefault()
    await handleLogin(data)
    navigate('/home')
  }

  return (
    <div className="login-page">
      <div className="login-form">
         <form onSubmit={submitForm} className="form" method="post">
          <h2 className="login-title">Anon Chat</h2> 
          <h3 className="login-type">Login</h3>
            <input 
              name="username" //need this or crash
              className="user-input" 
              placeholder="Username"
              onChange={onChange}
              minLength="3"
              maxLength="20"
              required>
            </input> <br />
            <input
              name="password" 
              className="password-input" 
              placeholder="Password"
              onChange={onChange}
              minLength="8"
              type="password"
              required>
            </input>
            <div className="submit-wrapper">
              <button className="submit" type="submit">Login </button>
            </div>
          <p>
            "Don't have an account?" <Link to="/register">Register Here!</Link>
          </p>
        </form>
      </div>
    </div>
  )
}