import React, { useState } from 'react'
import axios from 'axios'

export default function LoginPage({ apiBase, onAuth }){
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onChange = (e)=> setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e)=>{
    e.preventDefault()
    setError(''); setSuccess('')
    try{
      if(mode==='signup'){
        await axios.post(`${apiBase}/api/auth/signup`, { name: form.name, email: form.email, password: form.password })
        setSuccess('Signup successful. Please login.')
        setMode('login')
        return
      }
      const res = await axios.post(`${apiBase}/api/auth/login`, { email: form.email, password: form.password })
      onAuth(res.data)
    }catch(err){
      const msg = err?.response?.data?.message || 'Something went wrong'
      setError(msg)
    }
  }

  return (
    <div className="center">
      <form className="card" onSubmit={submit} style={{width:'100%',maxWidth:420}}>
        <h1 className="h1">{mode==='login' ? 'Login' : 'Sign Up'}</h1>
        <p className="muted">{mode==='login'? 'Welcome back! Please login to continue.' : 'Create an account to get started.'}</p>
        <div className="grid mt-16">
          {mode==='signup' && (
            <div>
              <label>Name</label>
              <input className="input" placeholder="Your name" name="name" value={form.name} onChange={onChange} required />
            </div>
          )}
          <div>
            <label>Email</label>
            <input className="input" placeholder="you@example.com" name="email" type="email" value={form.email} onChange={onChange} required />
          </div>
          <div>
            <label>Password</label>
            <input className="input" placeholder="••••••••" name="password" type="password" value={form.password} onChange={onChange} required />
          </div>
          {error && <div className="item" style={{borderColor:'rgba(239,68,68,.45)', color:'#fecaca'}}>{error}</div>}
          {success && <div className="item" style={{borderColor:'rgba(34,197,94,.45)', color:'#bbf7d0'}}> {success}</div>}
          <button className="btn mt-16" type="submit">{mode==='login' ? 'Login' : 'Create account'}</button>
          <div className="mt-16">
            {mode==='login' ? (
              <span>Don&apos;t have an account? <a href="#" onClick={(e)=>{e.preventDefault(); setMode('signup'); setError(''); setSuccess('')}}>Sign up</a></span>
            ) : (
              <span>Already have an account? <a href="#" onClick={(e)=>{e.preventDefault(); setMode('login'); setError(''); setSuccess('')}}>Login</a></span>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
