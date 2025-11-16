import React, { useState, useRef, useEffect } from 'react'

export default function KundaliForm(){
  const [name,setName] = useState('')
  const [dob,setDob] = useState('')
  const [tob,setTob] = useState('')
  const [place,setPlace] = useState('')
  const [coords, setCoords] = useState(null)
  const placeInputRef = useRef(null)

  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    if (!key) return

    let script = document.querySelector(`script[data-google-maps]`)
    if (!script) {
      script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
      script.async = true
      script.defer = true
      script.setAttribute('data-google-maps', 'loaded')
      document.head.appendChild(script)
    }

    function initAutocomplete() {
      if (!window.google || !window.google.maps || !placeInputRef.current) return
      try {
        const autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current, { types: ['(cities)'] })
        autocomplete.setFields(['formatted_address','geometry','name'])
        autocomplete.addListener('place_changed', () => {
          const placeObj = autocomplete.getPlace()
          const label = placeObj.formatted_address || placeObj.name || placeInputRef.current.value
          setPlace(label)
          if (placeObj.geometry && placeObj.geometry.location) {
            setCoords({ lat: placeObj.geometry.location.lat(), lng: placeObj.geometry.location.lng() })
          }
        })
      } catch (err) {
        // ignore init errors
        console.warn('Places init error', err)
      }
    }

    if (window.google && window.google.maps && window.google.maps.places) {
      initAutocomplete()
    } else {
      script.addEventListener('load', initAutocomplete)
    }

    return () => {
      if (script && script.parentNode) {
        // keep script for other pages/components; don't remove in cleanup to avoid flicker
      }
    }
  }, [])

  function handleSubmit(e){
    e.preventDefault()
    // For now this is a placeholder; later wire to generation logic / backend
    const info = `${name} — ${dob} ${tob} — ${place}` + (coords ? ` (lat: ${coords.lat.toFixed(5)}, lng: ${coords.lng.toFixed(5)})` : '')
    alert(`Generate Kundali for: ${info}`)
    console.log({ name, dob, tob, place, coords })
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
        <input
          ref={placeInputRef}
          value={place}
          onChange={e=>setPlace(e.target.value)}
          placeholder="City, Country"
        />
        {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
          <p style={{fontSize: '0.85rem', marginTop: '0.35rem', color: '#666'}}>
            (Autocomplete disabled. Inconvenience regretted)
          </p>
        )}
        {coords && (
          <p style={{fontSize: '0.85rem', marginTop: '0.35rem', color: '#666'}}>Lat: {coords.lat.toFixed(5)}, Lng: {coords.lng.toFixed(5)}</p>
        )}
      </div>
      <button type="submit">Generate Kundali</button>
    </form>
  )
}
