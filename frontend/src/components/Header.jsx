import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Icon = ({name}) => {
  const icons = {
    home: (<svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z"/></svg>),
    login: (<svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M10 17l5-5-5-5v3H3v4h7v3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>),
    idea: (<svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21h6v-1H9v1zm3-19C7.48 2 4 5.48 4 10c0 2.38 1.19 4.74 3 6 0 1 0 2 1 2h8c1 0 1-1 1-2 1.81-1.26 3-3.62 3-6 0-4.52-3.48-8-8-8z"/></svg>),
    list: (<svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/></svg>),
    forum: (<svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M2 4h20v12H6l-4 4V4z"/></svg>),
    user: (<svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z"/></svg>),
    logout: (<svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3 7H11v-2h8V6h-8V4h8c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2z"/></svg>),
  }
  return icons[name] || null
}

export default function Header({ user, onLogout }){
  const { pathname } = useLocation()
  const active = (p) => (pathname===p ? {outline:'2px solid rgba(147,197,253,.4)'} : null)
  return (
    <header className="header">
      <div className="header-inner">
        <Link to={user?'/welcome':'/'} className="brand">
          <div className="logo">💡</div>
          <span>Ideal Portal</span>
        </Link>
        <div className="nav-actions">
          {user ? (
            <>
              <Link style={active('/welcome')} className="icon-btn" to="/welcome"><Icon name="home"/> Home</Link>
              <Link style={active('/submit')} className="icon-btn" to="/submit"><Icon name="idea"/> Submit</Link>
              <Link style={active('/ideas')} className="icon-btn" to="/ideas"><Icon name="list"/> Ideas</Link>
              <Link style={active('/forum')} className="icon-btn" to="/forum"><Icon name="forum"/> Forum</Link>
              <div className="icon-btn"><Icon name="user"/> {user.name}</div>
              <button className="icon-btn" onClick={onLogout}><Icon name="logout"/> Logout</button>
            </>
          ) : (
            <Link style={active('/') } className="icon-btn" to="/"><Icon name="login"/> Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}
