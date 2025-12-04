import { useState } from "react"
import { Link } from "react-router-dom"
import { handleSettings } from "../actions/settings"

export default function SettingsPage() {
  const [data, setData] = useState({
    text_background: "",
    text_color: ""
  })
  const onChange = e => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const submitForm = async(e) => {
    e.preventDefault()
    await handleSettings(data)
  }

  return (
    <div className="login-page">
      <div className="login-form">
         <form onSubmit={submitForm} className="form" method="put">
          <h2 className="login-title">Settings</h2> 
            <input 
              name="text_background" //need this or crash
              className="topic-input" 
              placeholder="Text Background"
              type="color"
              onChange={onChange}>
            </input> <br />
            <input
              name="text_color" 
              className="topic-input" 
              placeholder="Text Color"
              type="color"
              onChange={onChange}>
            </input>
            <div className="submit-wrapper">
              <button className="submit" type="submit">Update Settings</button>
            </div>
            <p> Go To Main <Link to="/home"> Here! </Link></p>
        </form>
      </div>
    </div>
  )
}