import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function WelcomePage({ user }){
  const navigate = useNavigate()
  return (
    <div className="container">
      <h1 className="h1">Welcome to the Ideal Portal, {user?.name || 'User'}!</h1>
      <p className="muted">Share your innovative ideas and collaborate with others.</p>
      <div className="row mt-24">
        <button className="btn" onClick={()=>navigate('/submit')}>Submit an Idea</button>
        <button className="btn" onClick={()=>navigate('/ideas')}>View Ideas</button>
        <button className="btn" onClick={()=>navigate('/forum')}>Join Forum</button>
      </div>
      <div className="list mt-32">
        <div className="item">💡 <b>Submit Idea</b> — Propose your innovation.</div>
        <div className="item">📋 <b>Ideas</b> — See what others have submitted.</div>
        <div className="item">👥 <b>Forum</b> — Discuss and collaborate.</div>
      </div>
    </div>
  )
}
