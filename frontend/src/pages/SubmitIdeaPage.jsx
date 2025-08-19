import React, { useState } from 'react'
import axios from 'axios'

export default function SubmitIdeaPage({ apiBase }){
  const [form, setForm] = useState({
    title:'', problem:'', existingSolution:'', proposedSolution:'', impact:''
  })
  const [msg, setMsg] = useState('')
  const token = localStorage.getItem('ideal_token')

  const onChange = (e)=> setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e)=>{
    e.preventDefault()
    setMsg('')
    try{
      await axios.post(`${apiBase}/api/ideas`, form, { headers: { Authorization: `Bearer ${token}` } })
      setMsg('Idea saved successfully!')
      setForm({ title:'', problem:'', existingSolution:'', proposedSolution:'', impact:'' })
    }catch(err){
      setMsg(err?.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="center">
      <form className="card" onSubmit={submit} style={{width:'100%',maxWidth:720}}>
        <h1 className="h1" style={{textAlign:'center'}}>Submit a New Idea</h1>
        <div className="grid mt-16">
          <div>
            <label>Title</label>
            <input className="input" name="title" value={form.title} onChange={onChange} placeholder="e.g., Smart Energy Saver" required/>
          </div>
          <div>
            <label>Problem Statement</label>
            <textarea className="input" name="problem" rows="4" value={form.problem} onChange={onChange} placeholder="What problem are you solving?" required/>
          </div>
          <div>
            <label>Existing Solution</label>
            <textarea className="input" name="existingSolution" rows="4" value={form.existingSolution} onChange={onChange} placeholder="What exists today?" required/>
          </div>
          <div>
            <label>Proposed Solution</label>
            <textarea className="input" name="proposedSolution" rows="4" value={form.proposedSolution} onChange={onChange} placeholder="Your idea / approach" required/>
          </div>
          <div>
            <label>Expected Impact</label>
            <textarea className="input" name="impact" rows="3" value={form.impact} onChange={onChange} placeholder="What impact will it have?" required/>
          </div>
          {msg && <div className="item">{msg}</div>}
          <button className="btn mt-16" type="submit">Save Idea</button>
        </div>
      </form>
    </div>
  )
}
