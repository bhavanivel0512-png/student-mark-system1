import { useEffect, useState } from 'react'

function EnterMarks() {

  const [students, setStudents] = useState([])
  const [id, setId] = useState('')
  const [marks, setMarks] = useState({ tamil: '', english: '', maths: '', science: '', social: '' })

  useEffect(() => {
    fetch('https://student-mark-backend.onrender.com/api/students')
      .then(res => res.json())
      .then(data => setStudents(Array.isArray(data) ? data : []))
  }, [])

  const handleChange = (e) => {
    setMarks({ ...marks, [e.target.name]: Number(e.target.value) })
  }

  const handleSubmit = async () => {

    await fetch(
      `https://student-mark-backend.onrender.com/api/students/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mark: marks })
      }
    )

    alert("Marks Updated")
  }

  return (
    <div>

      <h2>Enter Marks</h2>

      <select onChange={(e) => setId(e.target.value)}>
        <option>Select Student</option>
        {students.map(s => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>

      <br /><br />

      <input name="tamil" placeholder="Tamil" onChange={handleChange} /><br /><br />
      <input name="english" placeholder="English" onChange={handleChange} /><br /><br />
      <input name="maths" placeholder="Maths" onChange={handleChange} /><br /><br />
      <input name="science" placeholder="Science" onChange={handleChange} /><br /><br />
      <input name="social" placeholder="Social" onChange={handleChange} /><br /><br />

      <button onClick={handleSubmit}>Save</button>

    </div>
  )
}

export default EnterMarks