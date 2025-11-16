import React, { useState } from 'react'

export default function KundaliForm(){
  const [name,setName] = useState('')
  const [dob,setDob] = useState('')
  const [tob,setTob] = useState('')
  const [place,setPlace] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    // placeholder: later we'll call generation logic / API
    alert(`Generate Kundali for ${name} (${dob} ${tob}) at ${place}`)
  }

  return (
    <form className="kundali-form" onSubmit={handleSubmit}>
      <div>
        <label>Full Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
      </div>
      <div>
        <label>Date of Birth</label>
        <input type="date" value={dob} onChange={e=>setDob(e.target.value)} />
      </div>
      <div>
        <label>Time of Birth</label>
        <input type="time" value={tob} onChange={e=>setTob(e.target.value)} />
      </div>
      <div>
        <label>Place of Birth</label>
        <input value={place} onChange={e=>setPlace(e.target.value)} placeholder="City, Country" />
      </div>
      <button type="submit">Generate Kundali</button>
    </form>
  )
}
