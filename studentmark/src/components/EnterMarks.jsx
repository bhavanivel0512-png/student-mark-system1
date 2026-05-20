import { useState, useEffect } from 'react'

function EnterMarks() {
  const [students, setStudents] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [marks, setMarks] = useState({
    tamil: '',
    english: '',
    maths: '',
    science: '',
    social: ''
  })

  useEffect(() => {
    fetch('https://student-mark-backend.onrender.com/api/students')
      .then(res => res.json())
      .then(data => setStudents(data))
  }, [])
const handleChange = (e) => {
  setMarks({ ...marks, [e.target.name]: Number(e.target.value) })
}

  const handleSubmit = async () => {
    try {
      fetch(`https://student-mark-backend.onrender.com/api/students/${selectedId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mark: marks })
      })
      const data = await res.json()
      alert('Marks updated! ✅')
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div>
      <h2>Enter Marks</h2>
      <select onChange={(e) => setSelectedId(e.target.value)}>
        <option>Select Student</option>
        {students.map(s => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>
      <br/><br/>
      <input placeholder="Tamil" name="tamil" value={marks.tamil} onChange={handleChange}/><br/><br/>
      <input placeholder="English" name="english" value={marks.english} onChange={handleChange}/><br/><br/>
      <input placeholder="Maths" name="maths" value={marks.maths} onChange={handleChange}/><br/><br/>
      <input placeholder="Science" name="science" value={marks.science} onChange={handleChange}/><br/><br/>
      <input placeholder="Social" name="social" value={marks.social} onChange={handleChange}/><br/><br/>
      <button onClick={handleSubmit}>Save Marks</button>
    </div>
  )
}

export default EnterMarks;