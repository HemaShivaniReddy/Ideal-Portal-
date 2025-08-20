import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function IdeasPage({ apiBase }){
  const [ideas, setIdeas] = useState([])
  const token = localStorage.getItem('ideal_token')

  useEffect(()=>{
    const load = async ()=>{
      const res = await axios.get(`https://ideal-portal-backend.onrender.com/api/ideas`, { headers: { Authorization: `Bearer ${token}` } })
      setIdeas(res.data)
    }
    load().catch(console.error)
  }, [])

  return (
    <div className="container">
      <h1 className="h1">All Submitted Ideas</h1>
      <p className="muted">Browse the latest ideas.</p>
      <div className="grid mt-24" style={{gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))'}}>
        {ideas.map((it)=>(
          <div key={it._id} className="item">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <b>{it.title}</b>
              <small className="muted">{new Date(it.createdAt).toLocaleDateString()}</small>
            </div>
            <div className="mt-12"><b>Problem:</b> {it.problem}</div>
            <div className="mt-12"><b>Existing:</b> {it.existingSolution}</div>
            <div className="mt-12"><b>Proposed:</b> {it.proposedSolution}</div>
            <div className="mt-12"><b>Impact:</b> {it.impact}</div>
            {it.createdBy?.name && <div className="mt-12 muted">by {it.createdBy.name}</div>}
          </div>
        ))}
        {ideas.length===0 && <div className="muted">No ideas yet.</div>}
      </div>
    </div>
  )
}
