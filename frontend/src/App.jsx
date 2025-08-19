import React, { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage'
import SubmitIdeaPage from './pages/SubmitIdeaPage'
import IdeasPage from './pages/IdeasPage'
import ForumPage from './pages/ForumPage'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function App(){
  const [user, setUser] = useState(()=>{
    const raw = localStorage.getItem('ideal_user')
    return raw ? JSON.parse(raw) : null
  })
  const navigate = useNavigate()

  const handleAuth = (payload)=>{
    localStorage.setItem('ideal_user', JSON.stringify(payload.user))
    localStorage.setItem('ideal_token', payload.token)
    setUser(payload.user)
    navigate('/welcome')
  }

  const handleLogout = ()=>{
    localStorage.removeItem('ideal_user')
    localStorage.removeItem('ideal_token')
    setUser(null)
    navigate('/')
  }

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={ user ? <Navigate to="/welcome" /> : <LoginPage apiBase={apiBase} onAuth={handleAuth} /> } />
        <Route path="/welcome" element={ user ? <WelcomePage user={user} /> : <Navigate to="/" /> } />
        <Route path="/submit" element={ user ? <SubmitIdeaPage apiBase={apiBase} /> : <Navigate to="/" /> } />
        <Route path="/ideas" element={ user ? <IdeasPage apiBase={apiBase} /> : <Navigate to="/" /> } />
        <Route path="/forum" element={ user ? <ForumPage /> : <Navigate to="/" /> } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <div className="footer">© {new Date().getFullYear()} Ideal Portal</div>
    </div>
  )
}
