import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from "./components/Login"
import RegisterPage from "./components/Register"
import MainPage from "./components/Main"
import SettingsPage from './components/Settings'
function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/home" element={<MainPage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
